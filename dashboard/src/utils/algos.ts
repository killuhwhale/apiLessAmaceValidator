interface Matches {
  items: number[];
  marks: string[];
}

export type filterOptions = {
  case?: boolean;
  mark?: boolean;
  prefix?: string;
  suffix?: string;
  word: boolean;
  limit?: number;
};

const makePrefix = (color: string) => {
  return `<span style='color: ${color};'>`;
};

const getPrefix = (idx: number): string => {
  switch (idx % 4) {
    case 0:
      return makePrefix("#ef4444"); // red
    case 1:
      return makePrefix("#4ade80"); // green
    case 2:
      return makePrefix("#60a5fa"); // blue
    case 3:
      return makePrefix("#fef08a"); // yellow
    default:
      return makePrefix("white");
  }
};

// https://gist.github.com/vpalos/4334557
export const filter = (
  query: string,
  items: string[],
  options: filterOptions
) => {
  // option producer
  function option(name: string, value: string | number | boolean) {
    options = options || {};
    return typeof options[name as keyof filterOptions] !== "undefined"
      ? options[name as keyof filterOptions]
      : value;
  }

  // prepare options
  const ignoreCase = option("case", false);
  const enableMarking = option("mark", true);
  // const markPrefix = option("prefix", "<span style='color: green;'>");
  // const markSuffix = option("suffix", "</span>");
  const markSuffix = "</span>";
  const matchWholeWords = option("word", true);
  const limit = option("limit", 0);

  // prepare query
  query = ignoreCase ? query : query.toLowerCase();
  query = query.replace(/\s+/g, matchWholeWords ? " " : "");
  query = query.replace(/(^\s+|\s+$)/g, "");
  const queryList = query.split(matchWholeWords ? " " : "");

  const ql = queryList.length;

  // prepare results
  const matches: Matches = {
    items: [],
    marks: [],
  };

  let markNum = 0; // Tracks each mark to change style dynamically

  // search itemIndex  itemsCount
  for (
    let itemIndex = 0, itemsCount = items.length;
    itemIndex < itemsCount;
    itemIndex++
  ) {
    // prepare text

    if (
      !items ||
      !items[itemIndex] ||
      items === undefined ||
      items[itemIndex] === undefined
    )
      continue;

    const text = ignoreCase
      ? items[itemIndex]
      : items[itemIndex]!.toLowerCase();

    let mark = "";

    // traverse
    let textIndex = 0;
    let wordIndex = 0;
    let wordLength = 0;
    let queryIndex = 0;
    for (queryIndex = 0; queryIndex < ql; queryIndex++) {
      if (!queryList || !queryList[queryIndex]) continue;

      wordLength = queryList[queryIndex]!.length;
      wordIndex = text!.indexOf(queryList[queryIndex]!, textIndex);
      if (wordIndex === -1) {
        break;
      }
      if (enableMarking) {
        if (wordIndex > 0) {
          mark += items[itemIndex]!.slice(textIndex, wordIndex);
        }

        mark += `${getPrefix(markNum)}${items[itemIndex]!.slice(
          wordIndex,
          wordIndex + wordLength
        )}${markSuffix}`;

        markNum += 1;
        // console.log("Marked first char", wordIndex);
      }
      textIndex = wordIndex + wordLength;
    }

    // capture
    if (queryIndex == ql) {
      if (enableMarking) {
        mark += items[itemIndex]!.slice(textIndex);
        matches.marks.push(mark);
      }
      if (matches.items.push(itemIndex) === limit && limit) {
        break;
      }
    }
  }

  // ready
  return matches;
};

// https://www.freecodecamp.org/news/javascript-debounce-example/
// eslint-disable-next-line @typescript-eslint/ban-types
export const debounce = (func: Function, timeout = 300) => {
  let timer: NodeJS.Timeout;
  return (...args: string[]) => {
    clearTimeout(timer);
    timer = setTimeout(() => {
      func.apply(this, args);
    }, timeout);
  };
};

// export const debounce = (fn: Function, ms = 300) => {
//   let timeoutId: ReturnType<typeof setTimeout>;
//   return function (this: any, ...args: any[]) {
//     clearTimeout(timeoutId);
//     timeoutId = setTimeout(() => fn.apply(this, args), ms);
//   };
// };
