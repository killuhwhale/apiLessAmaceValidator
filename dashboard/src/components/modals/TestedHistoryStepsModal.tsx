import { useState } from "react";
import AmaceResultTable from "../tables/AmaceResultTable";

interface ActionCancelProps {
  isOpen: boolean;
  onClose(): void;
  brokenAppResult: BrokenAppDBResult | null;
}
const TestedHistoryStepsModal: React.FC<ActionCancelProps> = ({
  isOpen,
  onClose,
  brokenAppResult,
}) => {
  const testedHistory = brokenAppResult
    ? (JSON.parse(
        brokenAppResult.testedHistory
      ) as unknown as TestedHistoryStep[])
    : ([] as TestedHistoryStep[]);

  console.log("brokenAppResult::: ", testedHistory);

  const rebuiltAmaceResults = testedHistory?.map(
    (histStep: TestedHistoryStep) => {
      return {
        appName: brokenAppResult?.appName,
        pkgName: brokenAppResult?.pkgName,
        appType: brokenAppResult?.appType,
        appTS: histStep.appTS,
        buildInfo: histStep.buildInfo,
        deviceInfo: histStep.deviceInfo,
        runID: histStep.runID,
        runTS: histStep.runTS,
        status: histStep.status,
        brokenStatus: histStep.brokenStatus,
        appVersion: histStep.appVersion,
        history: histStep.history,
        logs: histStep.logs,
        loginResults: histStep.loginResults,
        dSrcPath: "",
      } as AmaceDBResult;
    }
  );

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center text-black">
          <div
            className="fixed inset-0 bg-gray-900 opacity-70"
            onClick={onClose}
          ></div>
          <div className="z-50 ml-8 mr-8 flex h-[80vh] w-full flex-col justify-between rounded-md bg-slate-500 p-4">
            <h2 className="mb-2 justify-center text-center  text-lg font-bold text-white">
              Tested History
            </h2>
            {brokenAppResult ? (
              <AmaceResultTable
                height={400}
                key={`key__${brokenAppResult?.pkgName}`}
                parentKey={`parentkey__${brokenAppResult?.pkgName}`}
                amaceResults={rebuiltAmaceResults}
                startDate={new Date().getTime()}
                endDate={new Date().getTime()}
                selectedDocID={""}
                page="amace"
                hideHeader
              />
            ) : (
              <></>
            )}

            <div className="mt-4 flex w-full content-center justify-center align-middle">
              <button
                onClick={onClose}
                className="w-1/3 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TestedHistoryStepsModal;
