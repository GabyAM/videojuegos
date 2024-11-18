import { useState } from 'react';
import { StarIcon } from './Icons';
import style from '../assets/styles/starset.module.css';

export function StarSet({ initialScore = 0, onStarClick, mode = 'edit' }) {
  const [currentScore, setCurrentScore] = useState(initialScore);
  const [hoveredScore, setHoveredScore] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  function handleMouseLeave() {
    if (mode === 'edit') setHoveredScore(0);
  }

  function handleHoverStar(score) {
    if (mode === 'edit') setHoveredScore(score);
  }

  function handleStarClick(score) {
    if (mode === 'edit' && !isLoading) {
      setIsLoading(true);
      onStarClick(score)
        .then(() => {
          setCurrentScore(score);
          setError(null);
        })
        .catch((e) => setError(e))
        .finally(() => setIsLoading(false));
    }
  }

  return (
    <>
      <div
        className={`${style.container} ${isLoading ? 'pending' : ''}`}
        onMouseLeave={handleMouseLeave}
      >
        {[1, 2, 3, 4, 5].map((score) => (
          <button
            className={style.button}
            key={score}
            onClick={() => handleStarClick(score)}
            onMouseEnter={() => handleHoverStar(score)}
          >
            <StarIcon
              size="2em"
              fillColor={
                hoveredScore >= score ||
                (hoveredScore === 0) & (currentScore >= score)
                  ? 'blue'
                  : 'grey'
              }
            ></StarIcon>
          </button>
        ))}
      </div>
      {error && <span>Hubo un error, intente de nuevo</span>}
    </>
  );
}
