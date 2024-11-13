import style from '../assets/styles/icons.module.css';

export function StarIcon({
  size = '1em',
  fillColor = '#3187FF',
  backgroundColor = '#D9D9D9',
  filledRatio = 1
}) {
  const gradientId = `starGradient-${fillColor.replace(
    '#',
    ''
  )}-${backgroundColor.replace('#', '')}`;
  return (
    <svg
      width={size}
      height={size}
      fill={fillColor}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 260 245"
    >
      <defs>
        <linearGradient id={gradientId} x1="0" y1="0" x2="1" y2="0">
          <stop offset={`${filledRatio * 100}%`} stopColor={fillColor} />
          <stop offset={`${filledRatio * 100}%`} stopColor={backgroundColor} />
        </linearGradient>
      </defs>
      <path fill={`url(#${gradientId})`} d="m56,237 74-228 74,228L10,96h240" />
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
