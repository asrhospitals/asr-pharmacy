import React, { useEffect, useRef } from "react";

const Modal = ({ open, onClose, title, children, className = "max-w-lg" }) => {
  const ref = useRef();

  useEffect(() => {
    if (!open) return;
    const handleKey = (e) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open, onClose]);

  useEffect(() => {
    if (open && ref.current) ref.current.focus();
  }, [open]);

  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm" onClick={onClose}>
      <div
        className={`bg-white max-h-[90vh] overflow-y-auto no-scrollbar rounded-xl shadow-xl p-6 w-full relative ${className}`}
        tabIndex={-1}
        ref={ref}
        onClick={e => e.stopPropagation()}
      >
        {title && <h2 className="text-xl font-bold mb-4">{title}</h2>}
        {children}
        <button
          className="absolute top-2 right-2 text-blue-400 hover:text-blue-700 text-xl font-bold cursor-pointer"
          onClick={onClose}
          aria-label="Close"
        >
          ×
        </button>
      </div>
    </div>
  );
};

export default Modal; 