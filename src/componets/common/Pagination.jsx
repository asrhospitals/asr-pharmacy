import React from 'react';

const Pagination = ({ page, totalPages, onPageChange }) => {
  if (totalPages <= 1) return null;
  return (
    <div className="flex gap-2 items-center justify-center my-4">
      <button disabled={page === 1} onClick={() => onPageChange(page - 1)}>
        Prev
      </button>
      <span>
        Page {page} of {totalPages}
      </span>
      <button disabled={page === totalPages} onClick={() => onPageChange(page + 1)}>
        Next
      </button>
    </div>
  );
};

export default Pagination; 