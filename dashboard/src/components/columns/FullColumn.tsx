import React from "react";

const FullColumn: React.FC<ContainerProps> = ({ children, height }) => {
  return (
    <div className={`${height ? height : ""} mb-4 flex flex-col text-white`}>
      <div
        className={`
            flex-1 items-start justify-center overflow-x-auto rounded bg-slate-900`}
      >
        {children}
      </div>
    </div>
  );
};

export default FullColumn;
