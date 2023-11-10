export const colors: string[] = [
  "text-red-500", // red
  "text-yellow-400", // yellow
  "text-green-400", // green
  "text-blue-400", // blue
  "text-purple-700", // purple
];
export const bcolors: string[] = [
  "border-green-400", // green
  "border-blue-400", // blue
  "border-yellow-400", // yellow
  "border-red-500", // red
  "border-purple-700", // purple
];

const monthMap = new Map<string, number>([
  ["Jan", 1],
  ["Feb", 2],
  ["Mar", 3],
  ["Apr", 4],
  ["May", 5],
  ["Jun", 6],
  ["Jul", 7],
  ["Aug", 8],
  ["Sep", 9],
  ["Oct", 10],
  ["Nov", 11],
  ["Dec", 12],
]);

export const formatDateToString = (date: Date): string => {
  return date.toLocaleDateString("en-US", {
    month: "numeric",
    day: "numeric",
    year: "numeric",
  });
};

export const formatFirebaseDate = (date: Date): Date => {
  return new Date(formatDateToString(date).replace(/\//g, "-"));
};

export const formatFromDatepickerToFirebase = (date: string): Date => {
  console.log("Date picker date needs formatting: ", date);
  // 0    1   2   3      4       5        6       7        8
  // Wed May 17 2023 00:00:00 GMT-0700 (Pacific Daylight Time)

  const dateInfo = date.split(" ");
  const d = dateInfo[2];
  const m = monthMap.get(dateInfo[1] ?? "Jan");
  const y = dateInfo[3];
  const t = dateInfo[4];

  if (d === undefined) return new Date(0);
  if (m === undefined) return new Date(0);
  if (y === undefined) return new Date(0);
  if (t === undefined) return new Date(0);
  const dateRangeDay = new Date(`${m} ${d} ${y}`);
  return dateRangeDay;
};
