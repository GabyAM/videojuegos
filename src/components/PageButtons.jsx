import style from '../assets/styles/pagebuttons.module.css';
import { CaretIcon } from './Icons';

function calculatePageRange(currentPage, totalPages, rangeLength) {
  let start = currentPage - (Math.ceil(rangeLength / 2) - 1);
  let end = currentPage + Math.floor(rangeLength / 2);

  if (start < 1) {
    start = 1;
    end = Math.min(rangeLength, totalPages);
  }
  if (end > totalPages) {
    end = totalPages;
    start = Math.max(1, totalPages - (rangeLength - 1));
  }

  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

export function PageButtons({
  currentPage,
  totalPages,
  onPageChange,
  rangeLength = 5
}) {
  const range = calculatePageRange(currentPage, totalPages, rangeLength);
  return (
    <div className={style.container}>
      <button
        className={style.button}
        onClick={() => {
          if (currentPage !== 1) onPageChange(currentPage - 1);
        }}
      >
        <CaretIcon></CaretIcon>
      </button>
      {range.map((number) => (
        <button
          className={`${style.button} ${currentPage === number ? style.current : ''}`}
          key={number}
          onClick={() => {
            if (currentPage !== number) onPageChange(number);
          }}
        >
          {number}
        </button>
      ))}
      <button
        className={style.button}
        onClick={() => {
          if (currentPage !== totalPages) onPageChange(currentPage + 1);
        }}
      >
        <CaretIcon direction="right"></CaretIcon>
      </button>
    </div>
  );
}
