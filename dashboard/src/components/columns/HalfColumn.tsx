import React from "react";

// Update with parent styling from Full Column in order to setup flex container in a similar way.
const HalfColumn: React.FC<ContainerProps> = ({ children, height }) => {
  const ac = React.Children.toArray(children);
  return (
    <div className={`${height ? height : ""} mb-4 flex flex-col text-white`}>
      <div className="flex h-full w-full flex-row space-x-2">
        <div className="w-full flex-1 items-start justify-center overflow-x-auto rounded bg-slate-900 text-white">
          {ac[0]}
        </div>
        <div className="flex-1 items-start justify-center overflow-x-auto  rounded  bg-slate-900 text-white">
          {ac[1]}
        </div>
      </div>
    </div>
  );
};

export default HalfColumn;
