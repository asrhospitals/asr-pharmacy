import React, { useState, useRef, useEffect } from "react";
import { showToast } from "./Toast";

export default function SearchableSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select...",
  getOptionLabel,
  allowCreate = false,
  noPadding,
  startIcon
}) {
  const [inputValue, setInputValue] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(0);
  const inputRef = useRef(null);
  const listRef = useRef(null);

  const normalizedOptions = options.map((opt) =>
    typeof opt === "string"
      ? { label: opt, value: opt }
      : {
          label: getOptionLabel ? getOptionLabel(opt) : opt.label,
          value: opt.value,
        }
  );

  const filteredOptions = normalizedOptions.filter((opt) =>
    opt.label.toLowerCase().includes(inputValue.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target) &&
        listRef.current &&
        !listRef.current.contains(e.target)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleKeyDown = (e) => {
    if (!isOpen) return;
    if (e.key === "ArrowDown") {
      setHighlightedIndex((prev) =>
        Math.min(prev + 1, filteredOptions.length - 1)
      );
    } else if (e.key === "ArrowUp") {
      setHighlightedIndex((prev) => Math.max(prev - 1, 0));
    } else if (e.key === "Enter") {
      e.preventDefault();
      if (filteredOptions[highlightedIndex]) {
        handleSelect(filteredOptions[highlightedIndex]);
      } else if (allowCreate && inputValue) {
        handleSelect({ label: inputValue, value: inputValue, isNew: true });
      }
    } else if (e.key === "Escape") {
      setIsOpen(false);
    }
  };

  const handleSelect = (option) => {
    setIsOpen(false);
    setInputValue("");
    setHighlightedIndex(0);
    onChange && onChange(option);
  };

  useEffect(() => {
    if (!isOpen && value) {
      const selected = normalizedOptions.find((opt) => opt.value === value);
      setInputValue(selected ? selected.label : "");
    }
  }, [isOpen, value]);

  return (
    <div className="relative w-full">
      <input
        ref={inputRef}
        type="text"
        className={`w-full border border-gray-00 rounded-lg ${
            noPadding ? "p-0" : startIcon ? "pl-10 pr-2 py-2" : "p-2"
          } focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm`}
        placeholder={placeholder}
        value={
          isOpen
            ? inputValue
            : normalizedOptions.find((opt) => opt.value === value)?.label || ""
        }
        onChange={(e) => {
          setInputValue(e.target.value);
          setIsOpen(true);
          setHighlightedIndex(0);
        }}
        onFocus={() => setIsOpen(true)}
        onKeyDown={handleKeyDown}
        autoComplete="off"
      />
      {isOpen && (
        <ul
          ref={listRef}
          className="absolute z-50 mt-1 w-full bg-white border border-gray-200 rounded shadow-lg max-h-56 overflow-auto text-sm"
        >
          {filteredOptions.length === 0 && !allowCreate && (
            <li className="px-3 py-2 text-gray-400">No options</li>
          )}
          {filteredOptions.map((opt, idx) => (
            <li
              key={opt.value || idx}
              className={`px-3 py-2 cursor-pointer hover:bg-blue-50 ${
                idx === highlightedIndex ? "bg-blue-100" : ""
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(opt);
              }}
              onMouseEnter={() => setHighlightedIndex(idx)}
            >
              {opt.label}
            </li>
          ))}
          {allowCreate &&
            inputValue &&
            !filteredOptions.some((opt) => opt.label === inputValue) && (
              <li
                className="px-3 py-2 cursor-pointer text-blue-600 hover:bg-blue-50"
                onMouseDown={(e) => {
                  e.preventDefault();
                  handleSelect({
                    label: inputValue,
                    value: inputValue,
                    isNew: true,
                  });
                }}
              >
                F2 - Create New
              </li>
            )}
        </ul>
      )}
    </div>
  );
}
