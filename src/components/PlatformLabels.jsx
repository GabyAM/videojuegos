import style from '../assets/styles/platformlabels.module.css';

export function PlatformLabels({ platforms }) {
  return (
    <div className={style.container}>
      {platforms?.split(', ').map((platform) => {
        return (
          <span
            key={platform}
            className={style.label + ' ' + style[platform.toLowerCase()]}
          >
            {platform}
          </span>
        );
      })}
    </div>
  );
}
