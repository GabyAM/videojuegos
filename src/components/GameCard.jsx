import style from '../assets/styles/gamecard.module.css';
import { StarIcon } from './Icons';
import { PlatformLabels } from './PlatformLabels';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useCallback } from 'react';

function fetchScore(gameId, token) {
  return fetch(`http://localhost/calificacion/${gameId}`, {
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    }
  })
    .then((res) => {
      if (!res.ok) {
        throw new Error('Error al obtener calificacion de juego');
      }
      return res.json();
    })
    .then((res) => res.data);
}

export function GameCard({
  id,
  title,
  image,
  score,
  totalScores,
  ageRating,
  platforms
}) {
  const { isAuthenticated, token } = useAuth();
  const fetchFn = useCallback(() => fetchScore(id, token), [id, token]);
  const { userScore, isLoading, error } = useFetch(fetchFn);
  return (
    <div className={style.card}>
      <div className={style['thumbnail-section']}>
        <div className={style['thumbnail-info']}>
          <PlatformLabels platforms={platforms}></PlatformLabels>
          <h3 className={style.title}>{title}</h3>
        </div>
        <img
          className={style.image}
          src={image}
          alt={`${title}'s cover art`}
        ></img>
      </div>
      <div className={style['info-section']}>
        <div className={style['upper-section']}>
          <div className={style.score}>
            <StarIcon size="1.2em"></StarIcon>
            <span>
              {score
                ? `${score} en ${totalScores} puntuaciones`
                : 'No hay reseñas disponibles'}
            </span>
          </div>
          <span>{ageRating}</span>
        </div>
        {isAuthenticated && (
          <div className={style['lower-section']}>
            {isLoading ? 'cargando calificacion' : userScore || 'no score'}
          </div>
        )}
      </div>
    </div>
  );
}
