import React, { forwardRef } from "react";

const Select = forwardRef(
  (
    { className = "", value, onChange, options, children, noPadding, ...props },
    ref
  ) => (
    <select
      value={value}
      onChange={onChange}
      ref={ref}
      className={`${className} w-full ${
        noPadding ? "" : "p-2"
      } border border-gray-500 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent`.trim()}
      {...props}
    >
      {options
        ? options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))
        : children}
    </select>
  )
);

export default Select;
