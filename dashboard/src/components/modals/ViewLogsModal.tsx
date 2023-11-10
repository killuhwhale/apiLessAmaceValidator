import { useState } from "react";

interface ViewHistoryModalProps {
  isOpen: boolean;
  onClose(): void;
  logs: string;
  appName: string;
}
const ViewLogsModal: React.FC<ViewHistoryModalProps> = ({
  isOpen,
  onClose,
  logs,
  appName,
}) => {
  // console.log("isModalOpen", isOpen);
  // console.log("logs.split ", logs.split("\n"));
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center "
          key={`Logs_modal_${appName}`}
        >
          <div
            className="fixed inset-0 bg-gray-900 opacity-70 "
            onClick={onClose}
          ></div>
          <div className="z-50 flex h-[80vh] w-full flex-col justify-between rounded-md bg-slate-700 p-4">
            <h2 className="mb-2 justify-center text-center  text-lg font-bold">
              {appName} Logs
            </h2>
            <div className="mb-8 mt-8 flex h-[75vh] flex-col items-start justify-start overflow-y-auto">
              {logs.split("\\n").map((log: string, idx: number) => {
                return (
                  <span
                    className="w-full text-start"
                    key={`${log}_${idx}_${appName}`}
                  >
                    {log}
                  </span>
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

export default ViewLogsModal;
