"use client";

import { Unsubscribe } from "firebase/auth";
import {
  DocumentData,
  QueryDocumentSnapshot,
  QuerySnapshot,
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { useRouter } from "next/router";
import React, { useEffect, useRef, useState } from "react";
import FullColumn from "~/components/columns/FullColumn";
import CreateAppListModal from "~/components/modals/CreateAppListModal";
import EditAppListModal from "~/components/modals/EditAppListModal";
import Dropdown from "~/components/select/dropdown";
import { ping, pj, wssURL } from "~/components/shared";
import { MdInfoOutline, MdEditSquare, MdNoteAdd } from "react-icons/md";
import { Tooltip } from "react-tooltip";
import TwoThirdsColumn from "~/components/columns/TwoThirdsColumn";
import { AnsiUp } from "ansi_up";
import { getAppListInLocalStorage } from "~/components/localStorage";

// eslint-disable-next-line
const ansi: AnsiUp = new AnsiUp();
ansi.use_classes = true;

export const isBrowser = typeof window !== "undefined";

const ReplaceDateTimePattern =
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d+Z \[\d{2}:\d{2}:\d{2}\.\d+\]/;

const ReplaceDateTimePatternSecond =
  /\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{6}Z/;

const isValidIP = (ip: string) => {
  const ipPieces = ip.split(".");
  console.log("ipPieces: ", ipPieces);
  let valid = true;
  if (ipPieces.length > 5) {
    // ip should only contain 4 parts
    return false;
  }

  if (ipPieces.length === 5 && ip.endsWith(".")) {
    return false;
  }

  ipPieces.forEach((piece: string) => {
    console.log("piece len", piece.length);
    if (piece.length > 3 || !/^\d*$/.test(piece)) {
      valid = false;
    }
  });

  return valid;
};

const isValidIPString = (val: string) => {
  let isvalid = true;
  val.split(" ").forEach((ip) => {
    // Build string, if string isnt empty, then some of the ips are invalid
    if (!isValidIP(ip)) {
      isvalid = false;
    }
  });
  return isvalid;
};

// stores dutIPs under hostDevice key. Create new entry is key DNE.
const updateDeviceNameDutsLocalStorage = (
  hostDevice: string,
  dutIPs: string
) => {
  const currentData = localStorage.getItem("devices");

  // Parse the data if it exists, otherwise start with an empty object
  // eslint-disable-next-line
  const data = currentData ? JSON.parse(currentData) : {};

  // Update the data with the provided hostDevice and dutIPs
  // eslint-disable-next-line
  data[hostDevice] = dutIPs;

  // Store the updated data back to localStorage
  localStorage.setItem("devices", JSON.stringify(data));
};

const getDeviceNameDutsLocalStorage = (hostDevice: string): string => {
  const currentData = localStorage.getItem("devices");

  // Parse the data if it exists, otherwise start with an empty object
  // eslint-disable-next-line
  const data = currentData ? JSON.parse(currentData) : {};

  // Update the data with the provided hostDevice and dutIPs
  // eslint-disable-next-line
  return data[hostDevice] ? data[hostDevice] : "";
};

const ManageRunPage: React.FC = () => {
  const router = useRouter();
  const { query: _query } = router;

  const [appLists, setAppLists] = useState<AppListEntry[]>([]);
  const [selectedList, setSelectedList] = useState<AppListEntry | null>(null);

  useEffect(() => {
    console.log("Gets App lists from local storage");
    const latestAppLists = getAppListInLocalStorage();
    if (appLists.length !== latestAppLists.length) {
      console.log("Updating app lists: ", latestAppLists);
      setAppLists(latestAppLists);
    }
  }, [appLists]);

  const [wsInstance, setWsInstance] = useState<WebSocket | null>(null);
  const [devices, setDevices] = useState<string[]>([]);
  const [lastMsg, setLastMsg] = useState("");
  const [lastMsgs, setLastMsgs] = useState<string[]>([]);
  const [currentDevice, setCurrentDevice] = useState("");
  const RECONNECT_DELAY = 5000; // 5 seconds
  const wssToken = "token1337";

  const MSG_LIMIT = 100;
  const connectToWebSocket = () => {
    console.log("connectToWebSocket", wsInstance);

    if (wsInstance) return;
    const ws = new WebSocket(wssURL);
    setWsInstance(ws);
  };

  useEffect(() => {
    if (isBrowser && wsInstance === null) {
      connectToWebSocket();

      return () => {
        if (
          wsInstance &&
          (wsInstance as WebSocket).readyState !== WebSocket.CLOSED
        ) {
          (wsInstance as WebSocket).close();
        }
      };
    } else if (isBrowser && wsInstance) {
      wsInstance.onopen = () => {
        // Web Socket is connected, send data using send()
        console.log("Websocket onopen");
        const thingToSend = ping("getdevicename", {}, wssToken);
        console.log("This to send!!! ", thingToSend);
        wsInstance.send(thingToSend);
        // startTimer();
      };

      wsInstance.onerror = (err) => {
        console.log("Error: ", err);
        if (
          (wsInstance && wsInstance.readyState !== WebSocket.OPEN) ||
          wsInstance.readyState !== WebSocket.CLOSING
        ) {
          wsInstance.close();
          setWsInstance(null);
          // TODO() Check if this works by reconnecting on error....
        }
      };

      wsInstance.onmessage = (evt) => {
        console.log("raw message recv'd: ", evt.data);
        let mping;
        try {
          mping = pj(evt.data as string);
        } catch (err) {
          return;
        }
        const received_msg = mping.msg;

        console.log("Message is received...", received_msg);

        if (received_msg.toString().startsWith("status:")) {
          cancelTimer();
        } else if (received_msg.toString().startsWith("getdevicename:")) {
          const dname = received_msg.toString().split(":")[1];
          console.log("Got a device name: ", dname);
          if (dname) {
            setDevices((prevDevices) => {
              if (!prevDevices.includes(dname)) {
                return [...prevDevices, dname];
              }
              return prevDevices; // Return previous state to prevent re-render
            });
          }
        }

        setLastMsgs((prevMsgs) => {
          if (prevMsgs.length > MSG_LIMIT) prevMsgs.splice(0, 1);
          const cleanedMsg = received_msg
            .replaceAll(`b'`, "")
            .replaceAll(`'`, "")
            .replaceAll(`b"`, "")
            .replaceAll(`"`, "")
            .replaceAll(`\\n`, "")
            .replaceAll("progress:", "")
            .replace(ReplaceDateTimePattern, "")
            .replace(ReplaceDateTimePatternSecond, "");
          // eslint-disable-next-line

          const html = ansi.ansi_to_html(cleanedMsg);

          setLastMsg([...prevMsgs, html].join(" ")); // Update formatted string to display
          // eslint-disable-next-line
          return [...prevMsgs, `<p>${html}</p>`];
        }); // Update array
      };

      wsInstance.onclose = (event) => {
        if (!event.wasClean) {
          console.log(
            `WebSocket connection lost. Reconnecting in ${
              RECONNECT_DELAY / 1000
            } seconds...`
          );
          setWsInstance(null);
          // setTimeout(connectToWebSocket, RECONNECT_DELAY);
        }
      };
    }
  }, [wsInstance]);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const startTimer = () => {
    // Set a timer for 5 seconds (or any desired duration)
    timerRef.current = setTimeout(() => {
      console.log("Timer expired because it was not canceled in time.");
      setLastMsg(
        "Make sure device in lab is turned on and program is listening..."
      );
    }, 5000);
    console.log("Timer started.");
  };
  const cancelTimer = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      console.log("Timer canceled.");
    }
  };

  console.log("Devices: ", devices);
  const [showListModal, setShowListModal] = useState(false);
  const [showCreateListModal, setShowCreateListModal] = useState(false);
  const TTID = "AddListTooltipID";
  const progressRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // eslint-disable-next-line
    console.log("lastMsgs: ", lastMsgs);
    progressRef.current!.innerHTML = lastMsg;
  }, [lastMsg]);

  const InfoIconTTID = "InfoTooltipID";

  useEffect(() => {
    if (currentDevice) {
      getDeviceNameDutsLocalStorage(currentDevice);
    }
  }, [currentDevice]);

  const [duts, setDuts] = useState("");

  return (
    <>
      <TwoThirdsColumn height="min-h-[535px] h-[90vh]">
        {/* left Side */}
        <>
          <div className=" flex h-[30px] justify-center">
            <Dropdown
              items={devices}
              onSelect={(item: string) => {
                console.log("Device selected: ", item);
                setCurrentDevice(item);
              }}
              currentItem={currentDevice}
            />
          </div>
          <div className="flex w-6 w-full justify-end">
            <div className="flex w-6 " data-tooltip-id={InfoIconTTID}>
              <MdInfoOutline className="cursor-pointer" size={24} />
              <Tooltip variant="dark" id={InfoIconTTID}>
                <div>
                  <strong>App Lists</strong>
                  <br />
                  <strong>Create List:</strong> Add a new list of apps to test.
                  (Copy &#38; paste from sheets, to ensure formatting.)
                  <br />
                  <strong>Select List:</strong> Click list to select. This will
                  be the list of apps tested when presing &#39;Start Run&#39;
                  <br />
                  <hr />
                  <br />
                  <strong>Start Run:</strong> Select device, then an App List
                  and press &#39;Start Run&#39; [new run wont start if a run is
                  in progress.]
                  <br />
                  <strong>Query:</strong> Gets current status (running or
                  stopped)
                  <br />
                  <strong>Stop:</strong> Press &#39;Stop Run&#39; (cancels
                  current run)
                  <br />
                  {/* <strong>Update:</strong> Press Update and then Stop. (Updates
                  Host device from Git repo) */}
                  <br />
                  <br />
                  <hr />
                  <br />
                  <strong>View Runs:</strong> View each run in Amace-E.
                  <br />
                  <strong>Top 250:</strong> View all failed apps from Top 250
                  O4C apps
                  <br />
                  <strong>Broken Apps:</strong> View all failed apps from all
                  other lists tested. (A collection of broken apps grouped
                  monthly.)
                  <br />
                  <br />
                </div>
              </Tooltip>
            </div>
          </div>
          <div className=" mt-[30px] flex flex-col items-center justify-center">
            {currentDevice.length > 0 ? (
              <>
                <p className="mt-[5px]">
                  {selectedList?.listname
                    ? selectedList?.listname
                    : "Select a list below"}
                </p>
                <div className=" flex flex-row items-center justify-center">
                  <p
                    onClick={() => {
                      if (!selectedList?.listname)
                        return alert("Select a list!");

                      // TODO() implement more sophisticated ip addr check
                      if (!duts || duts.length < "0.0.0.0".length)
                        return alert("Enter ip address for target duts!");

                      updateDeviceNameDutsLocalStorage(currentDevice, duts);

                      console.log("Starting run using list: ", selectedList);
                      wsInstance?.send(
                        ping(
                          `startrun_${currentDevice}`,
                          { ...selectedList, devices: duts },
                          wssToken
                        )
                      );
                    }}
                    className=" cursor-crosshair border border-emerald-500 pb-2 pl-4 pr-4 pt-2 hover:bg-emerald-400  focus:bg-rose-400"
                  >
                    Start Run
                  </p>

                  <p
                    onClick={() => {
                      console.log("Querying status");
                      wsInstance?.send(
                        ping(`querystatus_${currentDevice}`, {}, wssToken)
                      );
                      startTimer();
                    }}
                    className=" cursor-crosshair border border-amber-300 pb-2 pl-4 pr-4 pt-2 hover:bg-amber-500  focus:bg-blue-400"
                  >
                    Query Status
                  </p>

                  <p
                    onClick={() => {
                      console.log("Stopping run");
                      wsInstance?.send(
                        ping(`stoprun_${currentDevice}`, {}, wssToken)
                      );
                    }}
                    className=" cursor-crosshair border border-rose-500 pb-2 pl-4 pr-4 pt-2 hover:bg-rose-400  focus:bg-blue-400"
                  >
                    Stop Run
                  </p>
                  {/* <p
                    onClick={() => {
                      console.log("Updating...");
                      wsInstance?.send(
                        ping(`update_${currentDevice}`, {}, wssToken)
                      );
                    }}
                    className=" cursor-crosshair border border-rose-500 pb-2 pl-4 pr-4 pt-2 hover:bg-rose-400  focus:bg-blue-400"
                  >
                    Update
                  </p> */}
                </div>
                <div className=" mt-12 flex w-full flex-row items-center justify-center">
                  <p>DUTs IPs to test on: </p>{" "}
                  <input
                    className="ml-4 w-1/2 rounded-md bg-slate-500 p-2"
                    value={duts}
                    onChange={(ev) => {
                      const val = ev.target?.value;
                      const isvalid = isValidIPString(val);
                      if (isvalid) {
                        setDuts(ev.target?.value);
                      }
                    }}
                  />
                </div>
              </>
            ) : (
              <div className="h-[72px]"></div>
            )}
          </div>
          <div className="mb-2 mr-8 flex flex-row justify-end">
            <div
              className="w-[35px] "
              data-tooltip-id={TTID}
              data-tooltip-content="Add App List"
            >
              <Tooltip variant="dark" id={TTID} />
              <MdNoteAdd
                className="mb-1 mr-4 mt-1 w-[50px] cursor-pointer text-slate-50 hover:text-slate-700"
                size={24}
                onClick={() => setShowCreateListModal(true)}
              />
            </div>
          </div>

          <FullColumn height="h-[400px]">
            {appLists && appLists.length > 0 ? (
              <div className="m-1">
                <p className="font-light">App Lists</p>

                <div className="mt-2 max-h-[350px] overflow-y-auto  bg-slate-800">
                  {appLists.map((list: AppListEntry, i) => {
                    return (
                      <div
                        key={`${list.listname}_${i}`}
                        className={`
                        flex h-full w-full cursor-pointer flex-row content-center
                        justify-between border-b border-fuchsia-500
                        pb-4 pl-4 pt-4  align-middle  hover:bg-slate-700
                        md:text-xs lg:text-sm
                        ${
                          selectedList?.listname === list.listname
                            ? "bg-fuchsia-500 hover:bg-fuchsia-300"
                            : ""
                        }`}
                        onClick={() => {
                          setSelectedList(list);
                        }}
                      >
                        <p className={`my-auto text-center`}>
                          {list.listname}
                          {list.playstore
                            ? " [playstore]"
                            : ` - (Folder: ${list.driveURL}) [pythonstore]`}
                        </p>
                        <MdEditSquare
                          className="mb-1 mr-4 mt-1 w-[50px] "
                          size={18}
                          onClick={() => setShowListModal(true)}
                        />
                      </div>
                    );
                  })}
                </div>
              </div>
            ) : (
              <div></div>
            )}
          </FullColumn>
        </>

        {/* Right Side Side */}
        <div className="overflow-y" ref={progressRef}>
          {/* <textarea
            className=" h-full w-full border border-violet-500 bg-slate-900 pb-2 pl-4 pr-4 pt-2"
            // cols={80}
            rows={25}
            value={}
          /> */}
        </div>
      </TwoThirdsColumn>

      <EditAppListModal
        listProp={selectedList}
        key={`Editmodal_${selectedList?.listname ?? "nolist"}`}
        isOpen={showListModal}
        onClose={() => setShowListModal(false)}
      />

      <CreateAppListModal
        key={"create modal"}
        isOpen={showCreateListModal}
        onClose={() => setShowCreateListModal(false)}
        currentNames={appLists.map((list) =>
          list.listname.toLocaleLowerCase().replaceAll(" ", "")
        )}
      />
    </>
  );
};

export default ManageRunPage;
