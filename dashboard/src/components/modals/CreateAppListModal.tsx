import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { storeAppListInLocalStorage } from "../localStorage";

interface CreateAppListModalProps {
  isOpen: boolean;
  currentNames: string[];
  onClose(): void;
}
const CreateAppListModal: React.FC<CreateAppListModalProps> = ({
  isOpen,
  currentNames, // toLower && spaces removed.
  onClose,
}) => {
  const [list, setList] = useState<AppListEntry>({
    listname: "",
    driveURL: "",
    playstore: false,
    apps: "",
  } as AppListEntry);

  const onChangeName = (text: string) => {
    const cList: AppListEntry = { ...list } as AppListEntry;
    cList["listname"] = text;
    setList(cList);
  };
  const onChangeApps = (text: string) => {
    const cList: AppListEntry = { ...list } as AppListEntry;
    cList["apps"] = text;
    setList(cList);
  };
  const onChangeDriveURL = (text: string) => {
    const cList: AppListEntry = { ...list } as AppListEntry;
    cList["driveURL"] = text;
    setList(cList);
  };

  const createList = () => {
    if (list.listname && list.apps) {
      // Ensure list does not already exist.
      if (
        currentNames.indexOf(
          list.listname.toLocaleLowerCase().replaceAll(" ", "")
        ) >= 0
      )
        return alert(`List with ${list.listname} already exists!`);
      try {
        console.log("Creating: ", list);

        if (storeAppListInLocalStorage(list.listname, list.apps)) {
          console.log("");
          throw new Error("Failed to create list");
        }
        console.log("Created app list!");
        onClose();
      } catch (err) {
        alert(`Failed to create app list: ${(err as string).toString()}`);
      }
    }
  };

  return (
    <>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          <div
            className="fixed inset-0 bg-gray-900 opacity-70"
            onClick={onClose}
          ></div>
          <div className="z-50 flex h-[650px] w-[600px] flex-col justify-between rounded-md bg-white p-4">
            <h2 className="mb-2 justify-center text-center  text-lg font-bold">
              App Val
            </h2>
            <h3 className="text-center font-bold">Create App List</h3>

            <div className="flex flex-col justify-center">
              <p className="pb-1 pt-4 font-light">List name</p>
              <input
                className="bg-slate-300  font-light"
                placeholder="List name"
                value={list.listname}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChangeName(event.target.value)
                }
              />
              {/**<p className="pb-1 pt-4 font-light">Drive URL</p>
              <input
                className="bg-slate-300  font-light"
                placeholder="Drive URL"
                value={list.driveURL}
                onChange={(event: ChangeEvent<HTMLInputElement>) =>
                  onChangeDriveURL(event.target.value)
                }
              />**/}
              <p className="pb-1 pt-4 font-light">Apps</p>
              <textarea
                className="bg-slate-300 pl-1  font-light"
                rows={9}
                cols={80}
                placeholder="Apps"
                value={list.apps}
                onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                  onChangeApps(event.target.value)
                }
              />
            </div>

            <div className="flex w-full justify-around">
              <button
                onClick={onClose}
                className="w-1/3 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => createList()}
                className="w-1/3 rounded  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Create
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default CreateAppListModal;
