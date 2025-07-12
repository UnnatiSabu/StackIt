import React from "react";
import "/Users/yughjuneja/Documents/stackit/StackIt/frontend/src/components/Pagination.css";

function Pagination({ totalPages, currentPage, onPageChange }) {
  if (totalPages <= 1) return null;

  const handlePrevious = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="pagination">
      <span 
        onClick={handlePrevious}
        className={currentPage === 1 ? "disabled" : ""}
      >
        &lt;
      </span>
      {[...Array(totalPages)].map((_, i) => (
        <span
          key={i}
          className={i + 1 === currentPage ? "active-page" : ""}
          onClick={() => onPageChange(i + 1)}
        >
          {i + 1}
        </span>
      ))}
      <span 
        onClick={handleNext}
        className={currentPage === totalPages ? "disabled" : ""}
      >
        &gt;
      </span>
    </div>
  );
}

export default Pagination;
