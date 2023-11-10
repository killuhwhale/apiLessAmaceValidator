import React, {
  FunctionComponent,
  useCallback,
  useEffect,
  useRef,
  useState,
} from "react";

const Dropdown: FunctionComponent<{
  items: string[];
  onSelect(item: string): void;
  currentItem: string;
}> = ({ items, currentItem, onSelect }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  return (
    <div ref={dropdownRef} className="absolute inline-block text-left">
      <div>
        <button
          ref={buttonRef}
          type="button"
          className="w-56 rounded-md bg-emerald-300 px-4 py-2"
          onClick={() => setIsOpen(!isOpen)}
        >
          {currentItem.length > 0
            ? `selected: ${currentItem}`
            : "Select device"}
        </button>
      </div>
      {isOpen && (
        <div className="absolute right-0 z-50 mt-2 w-56 origin-top-right rounded-md bg-slate-700 text-slate-300 shadow-lg ring-1 ring-black ring-opacity-5">
          <div className="py-1" role="menu" aria-orientation="vertical">
            {items.length > 0 ? (
              <>
                {items.map((item) => {
                  return (
                    <p
                      key={`dditem_${item}`}
                      onClick={() => {
                        onSelect(item);
                        setIsOpen(false);
                      }}
                      className=" block border-b border-violet-200 bg-violet-600 px-4 py-2 pb-2 pl-4  pr-4 pt-2 hover:bg-violet-700 "
                    >
                      {item}
                    </p>
                  );
                })}
              </>
            ) : (
              <p className=" border border-fuchsia-400 pb-2 pl-4 pr-4 pt-2">
                No devices, make sure devices in lab are on...
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dropdown;
