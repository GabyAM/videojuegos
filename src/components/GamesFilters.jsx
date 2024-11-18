import { useEffect, useState } from 'react';
import { useFetch } from '../hooks/useFetch';
import style from '../assets/styles/gamesfilters.module.css';
import { HttpError } from '../utilities/error';

function fetchPlatforms() {
  return fetch('http://localhost/plataformas')
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new HttpError('No autorizado', 401);
        }
        throw new Error('Error al obtener plataformas');
      }
      return res.json();
    })
    .then((json) => json.data);
}

export function GamesFilters({ onChangeFilters }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const [platform, setPlatform] = useState('');
  const [rating, setRating] = useState('');

  const {
    data: platforms,
    isLoading: isLoadingPlatforms,
    error: errorPlatforms
  } = useFetch(fetchPlatforms);

  const ratings = ['ATP', '+13', '+18'];

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(searchTerm);
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTerm, setDebouncedSearch]);

  useEffect(() => {
    onChangeFilters({
      search: debouncedSearch,
      platform,
      rating
    });
  }, [debouncedSearch, platform, rating, onChangeFilters]);

  return (
    <div className={style.container}>
      <input
        className={style.search}
        type="text"
        placeholder="Buscar"
        onChange={(e) => setSearchTerm(e.target.value)}
      ></input>
      <div className={style['left-section']}>
        <select
          disabled={isLoadingPlatforms || errorPlatforms}
          onChange={(e) => setPlatform(e.target.value)}
        >
          <option selected disabled hidden>
            Plataforma
          </option>
          <option value="">Sin especificar</option>
          {!isLoadingPlatforms &&
            !errorPlatforms &&
            platforms.map((platform) => (
              <option key={platform.id} value={platform.nombre}>
                {platform.nombre}
              </option>
            ))}
        </select>
        <select defaultValue="" onChange={(e) => setRating(e.target.value)}>
          <option value="" disabled hidden>
            Clasificacion
          </option>
          <option value="">Sin especificar</option>
          {ratings.map((rating) => (
            <option key={rating} value={rating}>
              {rating}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
}
