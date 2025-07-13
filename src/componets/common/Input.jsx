import React, { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      type,
      className = "",
      width,
      label,
      noPadding,
      startIcon,
      endIcon,
      ...props
    },
    ref
  ) => (
    <>
      {label && <label className="block font-medium mb-1">{label}</label>}
      <div className="flex relative w-full align-center justify-center">
        {startIcon && (
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {startIcon}
          </div>
        )}
        <input
          type={type}
          ref={ref}
          className={`${className} ${width ? width : "w-full"} ${
            noPadding ? "p-0" : startIcon ? "pl-10 pr-2 py-2" : "p-2"
          } border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`.trim()}
          {...props}
        />
        {endIcon && (
          <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
            {endIcon}
          </div>
        )}
      </div>
    </>
  )
);

export default Input;
