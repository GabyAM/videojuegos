import { usePagination } from '../hooks/usePagination';
import { GameCard } from './GameCard';
import style from '../assets/styles/gameslist.module.css';
import { PageButtons } from './PageButtons';
import { useCallback } from 'react';
import { HttpError } from '../utilities/error';

function fetchGames(page = 1, search, platform, rating) {
  let url = `http://localhost/juegos?pagina=${page}`;
  if (search) url += `&texto=${search}`;
  if (platform) url += `&plataforma=${platform}`;
  if (rating) url += `&clasificacion=${encodeURIComponent(rating)}`; //el simbolo '+' tiene que ser codificado
  return fetch(url)
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new HttpError('No autorizado', 401);
        }
        throw new Error('Error al obtener juegos');
      }
      return res.json();
    })
    .then((json) => json.data);
}

export function GamesList({ filters }) {
  const fetchFn = useCallback(
    (page) =>
      fetchGames(page, filters.search, filters.platform, filters.rating),
    [filters]
  );

  const {
    data: games,
    isLoading,
    error,
    fetchPage,
    currentPage,
    pages
  } = usePagination(fetchFn);

  if (isLoading) {
    return <p>Cargando juegos...</p>;
  }
  if (error) {
    return <p>Hubo un error</p>;
  }

  return (
    <>
      <div className={style.games}>
        {games.map((game) => (
          <GameCard
            key={game.id}
            id={game.id}
            title={game.nombre}
            image={game.imagen}
            initialScore={game.promedio_calificaciones}
            initialTotalScores={game.cantidad_calificaciones}
            ageRating={game.clasificacion_edad}
            platforms={game.plataformas}
          ></GameCard>
        ))}
      </div>

      <PageButtons
        currentPage={currentPage}
        totalPages={pages}
        onPageChange={fetchPage}
      ></PageButtons>
    </>
  );
}
