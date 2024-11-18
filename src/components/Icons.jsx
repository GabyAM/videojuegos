import style from '../assets/styles/icons.module.css';

export function StarIcon({
  size = '1em',
  fillColor = 'blue',
  backgroundColor = '#D9D9D9',
  filledRatio = 1
}) {
  return (
    <svg
      width={size}
      height={size}
      fill={fillColor === 'blue' ? '#3187FF' : '#D9D9D9'}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 245"
    >
      <path d="m56,237 74-228 74,228L10,96h240" />
    </svg>
  );
}

export function CaretIcon({ size = '1em', direction = 'left' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width={size}
      height={size}
      fill="#FFFFFF"
      viewBox="0 0 256 256"
      className={direction === 'right' ? style.rotated : ''}
    >
      <path d="M165.66,202.34a8,8,0,0,1-11.32,11.32l-80-80a8,8,0,0,1,0-11.32l80-80a8,8,0,0,1,11.32,11.32L91.31,128Z"></path>
    </svg>
  );
}

export function ImageIcon({ size = '1em' }) {
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      fill="none"
      width={size}
      height={size}
      viewBox="0 0 24 24"
      strokeWidth="1.5"
      stroke="currentColor"
      className="size-6"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="m2.25 15.75 5.159-5.159a2.25 2.25 0 0 1 3.182 0l5.159 5.159m-1.5-1.5 1.409-1.409a2.25 2.25 0 0 1 3.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 0 0 1.5-1.5V6a1.5 1.5 0 0 0-1.5-1.5H3.75A1.5 1.5 0 0 0 2.25 6v12a1.5 1.5 0 0 0 1.5 1.5Zm10.5-11.25h.008v.008h-.008V8.25Zm.375 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Z"
      />
    </svg>
  );
}
