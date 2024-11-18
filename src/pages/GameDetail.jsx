import { useParams } from 'react-router-dom';
import { useFetch } from '../hooks/useFetch';
import { PlatformLabels } from '../components/PlatformLabels';
import { StarSet } from '../components/StarSet';
import { useCallback } from 'react';
import placeholder from '../assets/images/thumbnail_placeholder.png';
import { useAuth } from '../hooks/useAuth';
import { addScore, updateScore } from '../api/score';
import style from '../assets/styles/gamedetail.module.css';
import { HttpError } from '../utilities/error';

function fetchGame(id) {
  return fetch(`http://localhost/juegos/${id}`)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new HttpError('No autorizado', 401);
        }
        throw new Error('Error al obtener juego');
      }
      return res.json();
    })
    .then((json) => json.data);
}

export function GameDetail() {
  const { id } = useParams();
  const { isAuthenticated, user, token } = useAuth();

  const fetchFn = useCallback(() => fetchGame(id), [id]);
  const { data: game, isLoading, error } = useFetch(fetchFn);

  if (isLoading) {
    return <p>Cargando juego...</p>;
  }
  if (error) {
    return <p>Hubo un error</p>;
  }

  const userScore = isAuthenticated
    ? game.calificaciones?.find((score) => score.usuario_id === user.id)
    : null;

  return (
    <div className={style.detail}>
      <div className={style.card}>
        <img className={style.image} src={game?.imagen || placeholder}></img>
        <div className={style.info}>
          <h2>{game.nombre}</h2>
          <div className={style['lower-info']}>
            <div className={style['info-item']}>
              <span>Plataformas: </span>
              <PlatformLabels platforms={game.plataformas}></PlatformLabels>
            </div>
            <span>Clasificacion: {game.clasificacion_edad}</span>
          </div>
        </div>
      </div>
      <div className={style.scores}>
        {isAuthenticated && (
          <div className={style['score-section']}>
            <h3>Tu calificacion</h3>
            <div className={style.score}>
              <StarSet
                initialScore={userScore?.estrellas || 0}
                onStarClick={(stars) =>
                  userScore
                    ? updateScore(userScore.id, token, stars)
                    : addScore(id, token, stars)
                }
                mode="edit"
              ></StarSet>
              {!userScore && <span>Sin calificar</span>}
            </div>
          </div>
        )}
        {game.calificaciones.length - (userScore ? 1 : 0) > 0 && (
          <div className={style['score-section']}>
            <h3>Todas las calificaciones</h3>
            {game.calificaciones.map((score) => {
              if (!userScore || score.id !== userScore.id)
                return (
                  <div className={style.score} key={score.id}>
                    <StarSet
                      initialScore={score.estrellas}
                      mode="read"
                    ></StarSet>
                    <span>Por {score.nombre_usuario}</span>
                  </div>
                );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
