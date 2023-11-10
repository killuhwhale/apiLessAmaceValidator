import asyncio
import json
import sys
import jwt
import os
import subprocess
import threading
import time
import websockets
import psutil
from dotenv import load_dotenv

load_dotenv()
exit_signal = threading.Event()
process_event = threading.Event()
current_websocket = None  # Global variable to hold the current WebSocket
USER = os.environ.get("USER")
DEVICE_NAME = os.environ.get('DNAME')
account = os.environ.get("TASTACCOUNT")
# devices = ["192.168.1.125"]


def make_device_args(ips):
    return ["-d", ips]

def req_env_var(value, name, env_var):
    if value is None:
        print(f"Env var: {name} not found, must enter env var: {env_var}")
        sys.exit(1)


req_env_var(DEVICE_NAME, "Device Name", 'DEVICE_NAME')
req_env_var(account, "Tast Account", 'account')


Red     = "\033[31m"
Black   = "\033[30m"
Green   = "\033[32m"
Yellow  = "\033[33m"
Blue    = "\033[34m"
Purple  = "\033[35m"
Cyan    = "\033[36m"
White   = "\033[37m"
RESET   = "\033[0m"

line_start = f"{Blue}>{Red}>{Yellow}>{Green}>{Blue}{RESET} "

cwd = f"/home/{USER}/chromiumos/src/scripts/wssTriggerEnv/wssTrigger"

def read_secret():
    secret = ""
    with open(f"{cwd}/nextAuthSecret.txt", 'r') as f:
        secret = f.readline()
    return secret.strip("\n")

def encode_jwt(payload, secret, algorithm='HS512'):
    """
    Encode a payload into a JWT token.

    Parameters:
    - payload: The data you want to encode into the JWT.
    - secret: The secret key to sign the JWT.
    - algorithm: The algorithm to use for signing. Default is 'HS512'.

    Returns:
    - Encoded JWT token as a string.
    """
    encoded_jwt = jwt.encode(payload, secret, algorithm=algorithm)
    return encoded_jwt


def cmd(devices, dsrcpath, dsrctype):
    return [
        "python3",
        f"/home/{USER}/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/amace.py",
        "-a", account,
        "-p", f"/home/{USER}/chromiumos/src/platform/tast-tests/src/go.chromium.org/tast-tests/cros/local/bundles/cros/arc/data/AMACE_secret.txt",
        "-u", "http://192.168.1.229:3000/api/amaceResult",
        "-l", "t",
        "--dsrcpath", f"AppLists/{dsrcpath}",
        "--dsrctype", dsrctype,
    ] + make_device_args(devices)

def get_d_src_type(playstore: bool):
    return "playstore" if playstore else "pythonstore"

def ping(msg, data, wssToken):
    return str(json.dumps({"msg": msg, "data": {**data, "wssToken": wssToken}}))

def pj(s: str):
    # parse json
    return json.loads(s)

def kill():
    exit_signal.set()

def kill_proc_tree(pid, including_parent=True):
    print(line_start, "kill proc tree")
    parent = psutil.Process(pid)
    children = parent.children(recursive=True)
    for child in children:
        print(line_start, "Terminating child: ", child)
        child.terminate()
    gone, still_alive = psutil.wait_procs(children, timeout=5)
    if including_parent:
        parent.terminate()
        parent.wait(5)

def run_process(cmd, wssToken):
    global process_event
    global current_websocket
    global exit_signal

    process_event.set()
    # Use Popen to start the process without blocking

    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    while process.poll() is None:  # While the process is still running
        if exit_signal.is_set():  # Check if exit signal is set
            print(line_start, "TERMINATING PROCESS")
            kill_proc_tree(process.pid)
            break
        output = ""
        try:
            # output = process.stdout.readline().decode("utf-8").strip("\n")
            output = process.stdout.readline()
            print(line_start, "Progress: ", output)
        except Exception as err:
            print("Error decoding message and sending progress: ", err)
            output = process.stdout.readline()

        if current_websocket:
            asyncio.run(current_websocket.send(ping(f"progress:{line_start}{output}", {}, wssToken)))

        time.sleep(.1)  # Sleep for a short duration before checking again

    process_event.clear()
    exit_signal.clear()

    # Send a message over the websocket after the process completes
    if current_websocket:
        print(line_start, "Process completed!")
        asyncio.run(current_websocket.send(ping("Process completed!", {}, wssToken)))



async def listen_to_ws():
    """TODO()

    Statuses:
        STARTED

    Create and endpoint that we can send a runID to
        - We will first start by Checking in the brand new Run via RUN ID and a status STARTED

        When done we send SUCCUSS

        If something fails


    So far we have a system where we can query for all devices running the client program.

    Then we can get the status of device (running automatuion or not), start & stop automation.

    Callback when automation is done. Reconnecting socket if server does down.

    Point of failure:

        Maybe we need a server based system with firebase to monitor the progress
            - we can send a message to firebase saying we are in progress'
            - If no progress is made within 10 mins we can check to see if device is online, check status, stop if neccessary, then restart.

            - We then would then a way to start off at a certain package.
                - We would need to pipe this through to Amace.py

        1. Server VM -Beginning of Transcaction
            - host website and Websocket server
                - If this goes down, communication stops but automation continues.

        2. Host/ Lab Device - Receives start signal and begins running automation
            - Device turns off, loses wifi
                - Only way to fail automation without automatic recovery is when the device loses power or wifi.
                    - If device turns off or loses wifi, what do we do?

            # Should be robust against programming errors....
            - WSS Program will reconnect to socket for communcation
            - TAST Python program will monitor, and finishes runs

        3. Dut
            - If device loses power or wifi
                - as long as its connected to power and previously connected to wifi it should persist and handle errors.


    """
    global cmd
    global DEVICE_NAME
    global current_websocket
    global process_event
    # global devices
    secret = read_secret()
    print("Using secret: ", secret)
    # wssToken = encode_jwt({"email": "wssClient@ggg.com"}, secret)
    wssToken = "token1337"

    uri = "ws://localhost:3001/wss/"
    uri = "wss://appvaldashboard.com/wss/"
    print(line_start, f"Device: {DEVICE_NAME} is using URI: ", uri)
    while True:
        try:
            # The connection will persist as long as the server keeps it open
            async with websockets.connect(uri) as websocket:
                current_websocket = websocket
                while True:
                    mping = pj(await websocket.recv())
                    message = mping['msg']
                    data = mping['data']
                    print(line_start, f"Received message: {message} ")
                    if message == f"startrun_{DEVICE_NAME}":
                        # Check if the process is not already running
                        if not process_event.is_set():

                            start_cmd = cmd(
                                        data['devices'],
                                        data['listname'],
                                        get_d_src_type(data['playstore']))
                            print(line_start, "using start command: ", start_cmd)
                            thread = threading.Thread(
                                target=run_process,
                                args=(start_cmd, wssToken, )
                            )
                            thread.start()
                            print(line_start, "Run started!")
                            await websocket.send(ping(f"runstarted:{DEVICE_NAME}", {}, wssToken))
                        else:
                            print(line_start, "Run in progress!")
                            await websocket.send(ping(f"runstarted:{DEVICE_NAME}:runinprogress", {}, wssToken))
                    elif message == f"querystatus_{DEVICE_NAME}":
                        status_msg =  "running" if process_event.is_set() else "stopped"
                        status = f"status:{DEVICE_NAME}:{status_msg}"
                        print(line_start, "Sending status: ", status)
                        await websocket.send(ping(status, {}, wssToken))
                    elif message == "getdevicename":
                        print(line_start, "Sending name: ", DEVICE_NAME)
                        tts = ping(f"getdevicename:{DEVICE_NAME}", {"key": "value"}, wssToken)
                        print(line_start, "Sending name: ", tts, type(tts))
                        await websocket.send(tts)

                    # Deprecated, we now restart a service to stop the current run from wssUpdater.py
                    # elif message == f"stoprun_{DEVICE_NAME}":
                    #     print(line_start, "Run stopping....")
                    #     if process_event.is_set():  # Check if process is running
                    #         kill()
                    #         print(line_start, "Run stopped!")
                    #         await websocket.send(ping(f"runstopped:{DEVICE_NAME}", {}, wssToken))
                    # elif not thread is None:
                    #     print(line_start, "We can print out the output from process here every 2s...", thread)


        except websockets.ConnectionClosed:
            print(line_start, "Connection with the server was closed. Retrying in 5 seconds...")
        except Exception as e:
            print(line_start, f"An error occurred: {e}. Retrying in 5 seconds...")

        await asyncio.sleep(5)  # Wait for 5 seconds before trying to rec

if __name__ == "__main__":
    # Run the program using an asyncio event loop
    loop = asyncio.get_event_loop()
    loop.run_until_complete(listen_to_ws())
    loop.run_forever()




