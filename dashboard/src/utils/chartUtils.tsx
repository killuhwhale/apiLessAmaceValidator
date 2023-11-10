type TooltipPayload = {
  value?: number;
};

type CustomTooltipProps = {
  active?: boolean;
  payload?: TooltipPayload[];
  label?: string;
};

const CustomTooltip = ({ active, payload, label }: CustomTooltipProps) => {
  if (
    active &&
    payload &&
    payload.length &&
    payload[0] &&
    payload[0].value &&
    label
  ) {
    return (
      <div className="custom-tooltip">
        <p className="label">{`${label} : ${payload[0].value}`}</p>
      </div>
    );
  }

  return null;
};

// Helps tally up app count to display in graph
const getAmaceReasonStatObj = () => {
  return {
    Fail: 0,
    LaunchFail: 0,
    Crashed: 0,
    Needspurchase: 0,
    Appisold: 0,
    Failedtoinstall: 0,
    TooManyAttempts: 0,
    Devicenotcompatible: 0,
    Chromebooknotcompatible: 0,
    CountryNA: 0,
    O4C: 0,
    O4CFSonly: 0,
    FSAmace: 0,
    Phoneonly: 0,
    Tabletonly: 0,
    Amace: 0,
    PWA: 0,
  };
};

// Helps tally up app count to display in graph
const getReasonStatObj = () => {
  return {
    PLAYSTORE_FAIL: 0,
    CRASH_WIN_DEATH: 0,
    CRASH_FORCE_RM_ACT_RECORD: 0,
    CRASH_ANR: 0,
    CRASH_FDEBUG_CRASH: 0,
    CRASH_FATAL_EXCEPTION: 0,
    FAILED_TO_LAUNCH: 0,
    FAILED_TO_INSTALL: 0,
    NEEDS_PRICE: 0,
    DEVICE_NONCOMPAT: 0,
    INVALID: 0,
    APP_OLD: 0,
    COUNTRY_NA: 0,
    FAIL: 0,
    PASS: 0,
    LOGGED_IN_GOOGLE: 0,
    LOGGED_IN_FB: 0,
    LOGGED_IN_EMAIL: 0,
    INIT: 0,
  } as AppStatus;
};

const rebuildLatestAmaceResultsFromBrokenResult = (
  results: BrokenAppDBResult[]
): AmaceDBResult[] => {
  return results.map((result: BrokenAppDBResult) => {
    const testedHistory = result
      ? (JSON.parse(result.testedHistory) as unknown as TestedHistoryStep[])
      : ([] as TestedHistoryStep[]);

    // TODO() Sort array to ensure we are taking the lastest entry...
    const histStep = testedHistory[testedHistory.length - 1];

    return {
      appName: result?.appName,
      pkgName: result?.pkgName,
      appType: result?.appType,
      appTS: histStep?.appTS,
      buildInfo: histStep?.buildInfo,
      deviceInfo: histStep?.deviceInfo,
      runID: histStep?.runID,
      runTS: histStep?.runTS,
      status: histStep?.status,
      brokenStatus: histStep?.brokenStatus,
      appVersion: histStep?.appVersion,
      history: histStep?.history,
      logs: histStep?.logs,
      loginResults: histStep?.loginResults,
      dSrcPath: "",
    } as AmaceDBResult;
  });
};

const processStats = (amaceResults: AmaceDBResult[]) => {
  // console.log("Selected doc appResults: ", amaceResults);

  const reasons = getAmaceReasonStatObj();

  for (let i = 0; i < amaceResults.length; i++) {
    const {
      appName,
      appTS,
      buildInfo,
      deviceInfo,
      pkgName,
      runID,
      runTS,
      status,
    } = amaceResults[i]!;

    if (status == 0) reasons.Fail++;
    if (status == 1) reasons.LaunchFail++;
    if (status == 2) reasons.Crashed++;
    if (status == 10) reasons.Needspurchase++;
    if (status == 20) reasons.Appisold++;
    if (status == 30) reasons.Failedtoinstall++;
    if (status == 31) reasons.TooManyAttempts++;
    if (status == 40) reasons.Devicenotcompatible++;
    if (status == 41) reasons.Chromebooknotcompatible++;
    if (status == 50) reasons.CountryNA++;
    if (status == 60) reasons.O4C++;
    if (status == 70) reasons.O4CFSonly++;
    if (status == 80) reasons.FSAmace++;
    if (status == 90) reasons.Phoneonly++;
    if (status == 100) reasons.Tabletonly++;
    if (status == 110) reasons.Amace++;
    if (status == 120) reasons.PWA++;
  }

  return [
    { name: "Fail", uv: reasons.Fail } as BarLineChartDataPoint,
    { name: "LaunchFail", uv: reasons.LaunchFail } as BarLineChartDataPoint,
    { name: "Crashed", uv: reasons.Crashed } as BarLineChartDataPoint,
    {
      name: "Needspurchase",
      uv: reasons.Needspurchase,
    } as BarLineChartDataPoint,
    { name: "Appisold", uv: reasons.Appisold } as BarLineChartDataPoint,
    {
      name: "Failedtoinstall",
      uv: reasons.Failedtoinstall,
    } as BarLineChartDataPoint,
    {
      name: "TooManyAttempts",
      uv: reasons.TooManyAttempts,
    } as BarLineChartDataPoint,
    {
      name: "Devicenotcompatible",
      uv: reasons.Devicenotcompatible,
    } as BarLineChartDataPoint,
    {
      name: "Chromebooknotcompatible",
      uv: reasons.Chromebooknotcompatible,
    } as BarLineChartDataPoint,
    { name: "CountryNA", uv: reasons.CountryNA } as BarLineChartDataPoint,
    { name: "O4C", uv: reasons.O4C } as BarLineChartDataPoint,
    { name: "O4CFSonly", uv: reasons.O4CFSonly } as BarLineChartDataPoint,
    { name: "FSAmace", uv: reasons.FSAmace } as BarLineChartDataPoint,
    { name: "Phoneonly", uv: reasons.Phoneonly } as BarLineChartDataPoint,
    { name: "Tabletonly", uv: reasons.Tabletonly } as BarLineChartDataPoint,
    { name: "Amace", uv: reasons.Amace } as BarLineChartDataPoint,
    { name: "PWA", uv: reasons.PWA } as BarLineChartDataPoint,
  ];
};

export {
  CustomTooltip,
  getAmaceReasonStatObj,
  getReasonStatObj,
  processStats,
  rebuildLatestAmaceResultsFromBrokenResult,
};
