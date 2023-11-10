import { NextApiRequest, NextApiResponse } from "next";
import {
  MONTHS,
  brokenStatusReasons,
  compareStrings,
  statusReasons,
} from "~/components/shared";
import * as fs from "fs";
import { env } from "~/env.mjs";
import { join } from "path";

const FilePath = "main.tsv"; // Replace with your desired file path

function writeObjectToTSV(filePath: string, data: AmaceResultForDisplay) {
  // Prepare the data as a TSV row
  const tsvRow =
    [
      data.appName,
      data.pkgName,
      data.runID,
      data.runTS.toString(),
      data.appTS.toString(),
      data.status.toString(),
      data.brokenStatus.toString(),
      data.buildInfo,
      data.deviceInfo,
      data.appType,
      data.appVersion,
      data.history,
      data.logs,
      data.loginResults.toString(),
    ].join("\t") + "\n";

  // Check if the file exists, if not, create it with a header row
  if (!fs.existsSync(filePath)) {
    const header =
      [
        "appName",
        "pkgName",
        "runID",
        "runTS",
        "appTS",
        "status",
        "brokenStatus",
        "buildInfo",
        "deviceInfo",
        "appType",
        "appVersion",
        "history",
        "logs",
        "loginResults",
      ].join("\t") + "\n";
    fs.writeFileSync(filePath, header);
  }

  // Append the data as a new row to the file
  fs.appendFileSync(filePath, tsvRow);

  console.log("Data written to the TSV file.");
}

function decodeLoginResults(lr: number): number[] {
  // login results = [0001] => 4 bit number where bits 1-3 represent if the app logged in via Google, Facebook or Email successfully

  if (!lr) {
    return [];
  }
  // console.log(`LR:  ${lr} - ${lr.toString(2)}`);

  const labels = lr
    .toString(2) // binary string
    .split("") // separate bits
    .reverse() // Reverse order
    .slice(0, -1) // Remove highest bit since this acts as a placeholder to capture 0's
    .map((num) => parseInt(num)); // Turn bit to int
  return labels;
}

/**
 * AmaceRuns
 *   - Main results for ea runID shown in table on the dashboard
 */
async function handleRunResults(result: AmaceResult) {
  const {
    appName,
    appTS,
    status,
    brokenStatus,
    pkgName,
    runID,
    runTS,
    buildInfo,
    deviceInfo,
    appType,
    appVersion,
    history,
    logs,
    loginResults,
  } = result;
  //  Update Run results
  // Update App results

  const loginLabels = ["Google", "Facebook", "Email"];

  const rowData = {
    appName,
    pkgName,
    runID,
    runTS: new Date(runTS).toLocaleDateString(),
    appTS: new Date(appTS).toLocaleDateString(),
    status: statusReasons.get(status.toString()),
    brokenStatus: brokenStatusReasons.get(brokenStatus.toString()),
    buildInfo,
    deviceInfo,
    appType,
    appVersion,
    history: JSON.stringify(history),
    logs,
    loginResults: decodeLoginResults(loginResults)
      .map((num, idx) => {
        return loginLabels[idx] && num > 0 ? loginLabels[idx]! : "PH";
      })
      .join(", "),
  } as AmaceResultForDisplay;

  writeObjectToTSV(FilePath, rowData);

  console.log("Adding row to main sheet: ", rowData);
  return true;
}

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  console.log(req.method);
  console.log(req.headers["content-type"]);
  if (req.method === "GET") res.status(200).json({ text: "Hello get" });
  else if (req.method !== "POST")
    return res.status(404).json({ text: "Hello 404" });
  else if (
    req.headers.authorization !==
    env.NEXT_PUBLIC_FIREBASE_HOST_POST_ENDPOINT_SECRET
  )
    return res.status(403).json({ text: "Hello unauth guy" });

  try {
    const body = req.body as AmaceResult;
    console.log("Incoming body: ", body);
    const amaceResult = JSON.parse(JSON.stringify(req.body)) as AmaceResult;

    await handleRunResults(amaceResult);

    res.status(200).json({
      data: {
        success: true,
        data: amaceResult,
      },
      error: null,
    });
  } catch (err: any) {
    console.log("Caught error: ", err);
    res.status(500).json({
      data: {
        success: false,
        data: null,
      },
      error: `Err posting: ${String(err)}`,
    });
  }
};
export default handler;
