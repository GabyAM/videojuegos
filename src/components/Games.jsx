import { usePagination } from '../hooks/usePagination';
import { GameCard } from './GameCard';
import style from '../assets/styles/games.module.css';
import { PageButtons } from './PageButtons';
function fetchGames(page = 1) {
  return fetch(`http://localhost/juegos?pagina=${page}`)
    .then((res) => res.json())
    .then((json) => json.data);
}

export function Games() {
  const {
    data: games,
    isLoading,
    error,
    fetchPage,
    currentPage,
    pages
  } = usePagination(fetchGames);

  if (!games) {
    return;
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
            score={game.promedio_calificaciones}
            totalScores={game.cantidad_calificaciones}
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
