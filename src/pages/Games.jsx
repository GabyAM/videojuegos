import { useCallback, useRef, useState } from 'react';
import { GamesFilters } from '../components/GamesFilters';
import { GamesList } from '../components/GamesList';
import style from '../assets/styles/games.module.css';
import { useAuth } from '../hooks/useAuth';

export function Games() {
  const { isAuthenticated, user } = useAuth();

  const [filters, setFilters] = useState({
    search: '',
    platform: '',
    rating: ''
  });

  const handleFilterChange = useCallback((newFilters) => {
    setFilters((prevFilters) => {
      if (
        prevFilters.search !== newFilters.search ||
        prevFilters.platform !== newFilters.platform ||
        prevFilters.rating !== newFilters.rating
      ) {
        return newFilters;
      }
      return prevFilters;
    });
  }, []);

  return (
    <div className={style.games}>
      <div className={style['title-section']}>
        <h1>Todos los juegos</h1>
        {isAuthenticated && user.es_admin && (
          <a href="/juego/crear">Añadir juego</a>
        )}
      </div>
      <GamesFilters onChangeFilters={handleFilterChange}></GamesFilters>
      <GamesList filters={filters}></GamesList>
    </div>
  );
}
