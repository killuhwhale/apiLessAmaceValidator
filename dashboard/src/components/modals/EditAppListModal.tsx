import { ChangeEvent, ChangeEventHandler, useEffect, useState } from "react";
import { api } from "~/utils/api";
import { updateAppListInLocalStorage } from "../localStorage";

interface EditAppListModalProps {
  isOpen: boolean;
  onClose(): void;
  listProp: AppListEntry | null;
}

function unEscapeAppList(escapedList: string): string {
  return escapedList.replaceAll("\\n", "\n").replaceAll("\\t", "\t");
}

const EditAppListModal: React.FC<EditAppListModalProps> = ({
  isOpen,
  onClose,
  listProp,
}) => {
  const [list, setList] = useState<AppListEntry | null>(
    listProp ? { ...listProp } : null
  );

  useEffect(() => {
    console.log("useEffect props: ", listProp);
    if (
      listProp?.listname !== list?.listname &&
      listProp !== null &&
      listProp !== undefined
    )
      setList({ ...listProp });
  }, [listProp]);

  const onChange = (text: string) => {
    const cList: AppListEntry = { ...list } as AppListEntry;
    cList["apps"] = text;
    setList(cList);
  };

  const onChangeDriveURL = (text: string) => {
    const cList: AppListEntry = { ...list } as AppListEntry;
    cList["driveURL"] = text;
    setList(cList);
  };

  const updateList = () => {
    if (list && list.listname) {
      if (!list.driveURL && !list.apps) {
        return alert("Entry must have either Folder ID or List of apps!");
      }
      try {
        console.log("Updating: ", list);
        updateAppListInLocalStorage(list.listname, list.apps);
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
          <div className="z-50 flex h-[475px] w-[600px] flex-col justify-between rounded-md bg-white p-4">
            <h2 className="mb-2 justify-center text-center  text-lg font-bold">
              App Val
            </h2>
            <h3 className="text-center font-bold">Update App List</h3>

            {list !== null && list !== undefined ? (
              <div className="flex flex-col justify-center">
                <p className="font-medium">
                  Editing: <span className="font-light">{list.listname}</span>
                </p>
                {list.playstore ? (
                  <></>
                ) : (
                  <p className="font-medium">
                    Folder:{" "}
                    <input
                      className="w-full  bg-slate-300 font-light"
                      placeholder="Drive URL"
                      value={list.driveURL}
                      onChange={(event: ChangeEvent<HTMLInputElement>) =>
                        onChangeDriveURL(event.target.value)
                      }
                    />
                  </p>
                )}

                <p className="pb-1 pt-4 font-light">Apps</p>

                <textarea
                  className="bg-slate-300 pl-1"
                  rows={9}
                  cols={80}
                  placeholder="Apps"
                  value={unEscapeAppList(list.apps)}
                  onChange={(event: ChangeEvent<HTMLTextAreaElement>) =>
                    onChange(event.target.value)
                  }
                />
              </div>
            ) : (
              <p>Select list to edit</p>
            )}

            <div className="flex w-full justify-around">
              <button
                onClick={onClose}
                className="w-1/3 rounded  bg-slate-600 px-4 py-2 font-bold text-white hover:bg-slate-700 focus:bg-slate-700 active:bg-slate-800"
              >
                Cancel
              </button>
              <button
                onClick={() => updateList()}
                className="w-1/3 rounded  bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
              >
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditAppListModal;
