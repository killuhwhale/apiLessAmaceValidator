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
# exit_signal = threading.Event()
process_event = threading.Event()
current_websocket = None  # Global variable to hold the current WebSocket
USER = os.environ.get("USER")
DEVICE_NAME = os.environ.get('DNAME')
devices = ["192.168.1.125"]
password = os.environ.get("SUDO_PASSWORD")

def req_env_var(value, name, env_var):
    if value is None:
        print(f"Env var: {name} not found, must enter env var: {env_var}")
        sys.exit(1)


req_env_var(DEVICE_NAME, "Device Name", "DEVICE_NAME")
req_env_var(password, "Host device password. E.g: appval002's password", 'SUDO_PASSWORD')


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


def cmd():
    return ["bash", "updateRemoteDevice.sh"]


def ping(msg, data, wssToken):
    return str(json.dumps({"msg": msg, "data": {**data, "wssToken": wssToken}}))

def pj(s: str):
    # parse json
    return json.loads(s)

# def kill():
#     exit_signal.set()

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
    # global exit_signal

    process_event.set()
    # Use Popen to start the process without blocking

    process = subprocess.Popen(cmd, stdout=subprocess.PIPE, stderr=subprocess.STDOUT)

    while process.poll() is None:  # While the process is still running
        # if exit_signal.is_set():  # Check if exit signal is set
        #     print(line_start, "TERMINATING PROCESS")
        #     kill_proc_tree(process.pid)
        #     break
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
    # exit_signal.clear()

    # Send a message over the websocket after the process completes
    if current_websocket:
        print(line_start, "Process completed!")
        asyncio.run(current_websocket.send(ping("Process completed!", {}, wssToken)))


# Called to "stop" the wssClient.service when user presses "Stop Run"
def restart_wssClient_service(pswd):
    cmd = ['sudo', '-S', 'systemctl', 'restart', 'wssClient.service']

    proc = subprocess.Popen(cmd, stdin=subprocess.PIPE, stdout=subprocess.PIPE, stderr=subprocess.PIPE, text=True)
    stdout, stderr = proc.communicate(input=pswd + '\n')

    print("restart_wssClient_service: ")
    print("stdout: ", proc.stdout)
    print("stderr: ", proc.stderr)
    print("stdout: ", stdout)
    print("stderr: ", stderr)


async def listen_to_ws():
    global cmd
    global DEVICE_NAME
    global password
    global current_websocket
    global process_event
    global devices
    secret = read_secret()
    wssToken = encode_jwt({"email": "wssUpdater@ggg.com"}, secret)

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

                    if not message.startswith("progress:"):
                        print(line_start, f"Received message: {message} ")

                    if message == f"update_{DEVICE_NAME}":
                        # Check if the process is not already running
                        if not process_event.is_set():
                            start_cmd = cmd()
                            print(line_start, "using start command: ", start_cmd)
                            thread = threading.Thread(
                                target=run_process,
                                args=(start_cmd, wssToken, )
                            )
                            thread.start()
                            print(line_start, "Update started!")
                            await websocket.send(ping(f"updating:{DEVICE_NAME}", {}, wssToken))
                        else:
                            print(line_start, "Update in progress!")
                            await websocket.send(ping(f"updating:{DEVICE_NAME}:updateinprogress", {}, wssToken))
                    elif message.startswith(f"stoprun_{DEVICE_NAME}"):
                        print(line_start, "Run stopping call restart wssClient.service....")
                        restart_wssClient_service(password)
                        await websocket.send(ping(f"runstopped:updater:{DEVICE_NAME}", {}, wssToken))

        except websockets.ConnectionClosed:
            print(line_start, "Connection with the server was closed. Retrying in 5 seconds...")
        except Exception as e:
            print(line_start, f"An error occurred: {e}. Retrying in 5 seconds...")

        await asyncio.sleep(5)  # Wait for 5 seconds before trying to rec

if __name__ == "__main__":
    # Run the program using an asyncio event loop
    print("wssUpdater.py starting...")
    loop = asyncio.get_event_loop()
    loop.run_until_complete(listen_to_ws())
    loop.run_forever()




