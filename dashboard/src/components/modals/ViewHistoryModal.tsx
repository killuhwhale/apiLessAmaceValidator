"use-client";
import { useEffect, useState } from "react";
import { ref, getDownloadURL } from "firebase/storage";
import { frontStorage } from "~/utils/frontFirestore";

interface ViewHistoryModalProps {
  isOpen: boolean;
  onClose(): void;
  history: string;
  appName: string;
}

type HistoryStep = {
  msg: string;
  url: string;
};

const getUrl = async (gsPath: string) => {
  try {
    console.log("Getting path: ", gsPath);
    const gsRef = ref(frontStorage, gsPath);
    const url = await getDownloadURL(gsRef);
    // console.log("Got url: ", url);
    return url;
  } catch (err: any) {
    console.log("Error getting url for path: ", gsPath);
  }
  return "";
};

interface ViewHistoryStepProps {
  step: HistoryStep;
  appName: string;
}

const ViewHistoryStep: React.FC<ViewHistoryStepProps> = ({ appName, step }) => {
  const [url, setUrl] = useState("images/placeholder.png");

  useEffect(() => {
    const _ = async () => {
      const step_url = await getUrl(step.url);
      console.log("Got url", step_url);
      setUrl(step_url);
      window.addEventListener("load", () => {
        const image = document.querySelector(".fade-in");
        if (!image) return;
        image.classList.add("loaded");
      });
    };

    _().catch((err) => console.log("Failed to get images", err));
  }, [step]);

  return (
    <div key={`${appName}_${step.msg}`} className="mb-4 flex flex-row">
      <div className="w-1/3">
        <img src={url} className="transition delay-150 ease-in-out" />
      </div>
      <div className="ml-12 flex w-2/3 items-center justify-start">
        <p>{step.msg}</p>
      </div>
    </div>
  );
};

const ViewHistoryModal: React.FC<ViewHistoryModalProps> = ({
  isOpen,
  onClose,
  history,
  appName,
}) => {
  // console.log("History modal: ", history);

  const hist = history
    ? (JSON.parse(history.replaceAll("'", '"')) as HistoryStep[])
    : ([] as HistoryStep[]);

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center ">
          <div
            className="fixed inset-0 bg-gray-900 opacity-70 "
            onClick={onClose}
          ></div>
          <div className="z-50 flex h-[80vh] w-full flex-col justify-between rounded-md bg-slate-700  p-4 text-white">
            <h2 className="mb-2 justify-center text-center  text-lg font-bold ">
              {appName} History
            </h2>
            <div className="mb-8 mt-8 h-[75vh] overflow-y-auto">
              {hist.map((step: HistoryStep) => {
                return (
                  <ViewHistoryStep
                    key={`${step.msg}_${appName}`}
                    appName={appName}
                    step={step}
                  />
                );
              })}
            </div>

            <div className="flex w-full justify-around">
              <button
                onClick={onClose}
                className="w-1/2 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ViewHistoryModal;
