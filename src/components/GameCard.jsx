import style from '../assets/styles/gamecard.module.css';
import { StarIcon } from './Icons';
import { PlatformLabels } from './PlatformLabels';
import { useAuth } from '../hooks/useAuth';
import { useFetch } from '../hooks/useFetch';
import { useCallback } from 'react';
import { StarSet } from './StarSet';
import placeholder from '../assets/images/thumbnail_placeholder.png';
import { useNavigate } from 'react-router-dom';
import { HttpError } from '../utilities/error';
import { addScore, updateScore } from '../api/score';

function fetchScore(gameId, token, signal) {
  return fetch(`http://localhost/juego/${gameId}/calificacion`, {
    method: 'GET',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    signal
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new HttpError('No autorizado', 401);
        }
        throw new Error('Error al obtener calificacion de juego');
      }
      return res.json();
    })
    .then((json) => json.data);
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
  const navigate = useNavigate();

  const { isAuthenticated, token } = useAuth();
  const fetchFn = useCallback(
    (signal) => fetchScore(id, token, signal),
    [id, token]
  );
  const {
    data: userScore,
    setData: setUserScore,
    isLoading,
    error
  } = useFetch(fetchFn, {
    shouldFetch: isAuthenticated
  });
  return (
    <div className={style.card}>
      <div className={style['thumbnail-section']}>
        <div className={style['thumbnail-info']}>
          <PlatformLabels platforms={platforms}></PlatformLabels>
          <h3 className={style.title} onClick={() => navigate(`/juegos/${id}`)}>
            {title}
          </h3>
        </div>
        <img
          className={style.image}
          src={image ? `data:image/jpeg;base64,${image}` : placeholder}
          alt={`${title}'s cover art`}
          onClick={() => navigate(`/juegos/${id}`)}
        ></img>
      </div>
      <div className={style['info-section']}>
        <div className={style['upper-section']}>
          <div className={style.score}>
            <StarIcon size="1.2em"></StarIcon>
            <span>
              {score
                ? `${parseInt(score).toFixed(1)} en ${totalScores} puntuaciones`
                : 'No hay reseñas disponibles'}
            </span>
          </div>
          <span>{ageRating}</span>
        </div>
        {isAuthenticated && (
          <div className={style['lower-section']}>
            {isLoading ? (
              'cargando calificacion'
            ) : (
              <>
                <StarSet
                  initialScore={userScore ? userScore.estrellas : 0}
                  onStarClick={(stars) => {
                    if (userScore) updateScore(userScore.id, token, stars);
                    else {
                      return addScore(id, token, stars).then((data) =>
                        setUserScore(data)
                      );
                    }
                  }}
                ></StarSet>
                <p>{userScore ? 'Tu calificacion' : 'Sin calificar'} </p>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
