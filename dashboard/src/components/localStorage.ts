const storeAppListInLocalStorage = (
  key: string,
  data: string
): string | null => {
  // Check if the key already exists in local storage
  const APP_LISTS = "APP_LISTS";
  let appListsRaw = localStorage.getItem(APP_LISTS);

  if (!appListsRaw) {
    localStorage.setItem(APP_LISTS, JSON.stringify({}));
    appListsRaw = localStorage.getItem(APP_LISTS);
  }

  const appLists = JSON.parse(appListsRaw!);
  if (appLists[key]) {
    return "Key already exists in local storage app List.";
  }

  appLists[key] = data;
  // If the key doesn't exist, store the data
  localStorage.setItem(APP_LISTS, JSON.stringify(appLists));
  return null; // No error, data stored successfully
};

const getAppListInLocalStorage = (): AppListEntry[] => {
  // Check if the key already exists in local storage
  const APP_LISTS = "APP_LISTS";
  let appListsRaw = localStorage.getItem(APP_LISTS);

  if (!appListsRaw) {
    localStorage.setItem(APP_LISTS, JSON.stringify({}));
    appListsRaw = localStorage.getItem(APP_LISTS);
  }
  const appLists = JSON.parse(appListsRaw!);
  return Object.keys(appLists).map((appListName) => {
    return {
      listname: appListName,
      apps: appLists[appListName],
      playstore: true,
      driveURL: "",
    } as AppListEntry;
  }) as AppListEntry[];
};

const updateAppListInLocalStorage = (
  key: string,
  data: string
): string | null => {
  // Check if the key already exists in local storage
  const APP_LISTS = "APP_LISTS";
  let appListsRaw = localStorage.getItem(APP_LISTS);

  if (!appListsRaw) {
    localStorage.setItem(APP_LISTS, JSON.stringify({}));
    appListsRaw = localStorage.getItem(APP_LISTS);
  }

  const appLists = JSON.parse(appListsRaw!);

  appLists[key] = data;
  // If the key doesn't exist, store the data
  localStorage.setItem(APP_LISTS, JSON.stringify(appLists));
  return null; // No error, data stored successfully
};

export {
  storeAppListInLocalStorage,
  getAppListInLocalStorage,
  updateAppListInLocalStorage,
};
