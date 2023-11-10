const statusReasons = new Map<string, string>();
const brokenStatusReasons = new Map<string, string>();

// Display String based on status
statusReasons.set("0", "Fail");
statusReasons.set("1", "Launch Fail");
statusReasons.set("2", "Crashed");
statusReasons.set("10", "Needs purchase");
statusReasons.set("20", "App is old");
statusReasons.set("30", "Failed to install");
statusReasons.set("31", "Too many attempts");
statusReasons.set("40", "Device not compatible");
statusReasons.set("41", "Chromebook not compatible");
statusReasons.set("50", "Country NA");
statusReasons.set("60", "O4C");
statusReasons.set("70", "O4C FS only");
statusReasons.set("80", "FS -> Amace");
statusReasons.set("90", "Phone only");
statusReasons.set("100", "Tablet only");
statusReasons.set("110", "Amace");
statusReasons.set("120", "PWA");

brokenStatusReasons.set("0", "LoggedinGoogle");
brokenStatusReasons.set("10", "LoggedinFacebook");
brokenStatusReasons.set("20", "LoggedinEmail");
brokenStatusReasons.set("30", "Pass");
brokenStatusReasons.set("40", "WinDeath");
brokenStatusReasons.set("50", "ForceRemoved");
brokenStatusReasons.set("60", "FDebugCrash");
brokenStatusReasons.set("70", "FatalException");
brokenStatusReasons.set("80", "ProceDied");
brokenStatusReasons.set("90", "ANR");
brokenStatusReasons.set("100", "Failed");
brokenStatusReasons.set("101", "FailedInstall");
brokenStatusReasons.set("102", "FailedLaunch");
brokenStatusReasons.set("103", "FailedAmaceCheck");

// When updating GCP project these need new names.
const frontendFirestoreName = "frontendv2";
const backendFirestoreName = "backendv3";

const ping = (
  msg: string,
  // eslint-disable-next-line
  data: Exclude<object, any[] | Function>,
  wssToken: string
) => {
  return JSON.stringify({ msg, data: { ...data, wssToken } });
};

const pj = (s: string): Ping => {
  // parseJson
  console.log("Parse JSON: ", s);
  return JSON.parse(s) as Ping;
};

const wssURL =
  process.env.NODE_ENV === "development"
    ? "ws://localhost:3001/wss"
    : "wss://appvaldashboard.com/wss";

const MONTHS: string[] = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const displayDateWithTime = (date: Date): string => {
  return (
    date.toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    }) +
    " " +
    date.toLocaleTimeString("en-US")
  );
};

const displayDate = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

class DefaultDict<T, U> {
  private _data: Map<T, U>;
  private _defaultFactory: () => U;

  constructor(defaultFactory: () => U) {
    this._data = new Map();
    this._defaultFactory = defaultFactory;
  }

  get(key: T): U {
    if (!this._data.has(key)) {
      this._data.set(key, this._defaultFactory());
    }
    return this._data.get(key)!;
  }

  set(key: T, value: U): this {
    this._data.set(key, value);
    return this;
  }

  // Add other Map-like methods as necessary...
}

function compareStrings(s1: string, s2: string): number {
  const regex = /(\D*)(\d*)/g;

  let m1 = regex.exec(s1);
  let m2 = regex.exec(s2)!;

  while (m1 || m2) {
    // If either match is null, reset it to an empty match
    if (!m1) m1 = ["", "", ""] as unknown as RegExpExecArray;
    if (!m2) m2 = ["", "", ""] as unknown as RegExpExecArray;

    // Compare non-numeric segments first
    if (m1[1]! < m2[1]!) return 1;
    if (m1[1]! > m2[1]!) return -1;

    // Compare numeric segments
    if (+m1[2]! < +m2[2]!) return 1;
    if (+m1[2]! > +m2[2]!) return -1;

    m1 = regex.exec(s1) ?? (["", "", ""] as unknown as RegExpExecArray);
    m2 = regex.exec(s2) ?? (["", "", ""] as unknown as RegExpExecArray);
  }

  return 0;
}

export {
  statusReasons,
  brokenStatusReasons,
  wssURL,
  frontendFirestoreName,
  backendFirestoreName,
  ping,
  pj,
  DefaultDict,
  compareStrings,
  displayDateWithTime,
  displayDate,
  MONTHS,
};
