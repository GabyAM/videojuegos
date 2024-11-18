import { HttpError } from '../utilities/error';

export function addScore(gameId, token, stars) {
  return fetch(`http://localhost/calificacion`, {
    method: 'POST',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      juego_id: gameId,
      estrellas: stars
    })
  })
    .then((res) => {
      if (!res.ok) {
        if (res.status === 401) {
          throw new HttpError('No autorizado', 401);
        }
        throw new Error('Error al agregar calificacion');
      }
      return res.json();
    })
    .then((json) => json.data);
}

export function updateScore(id, token, stars) {
  return fetch(`http://localhost/calificacion/${id}`, {
    method: 'PUT',
    credentials: 'include',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${token}`
    },
    body: JSON.stringify({
      estrellas: stars
    })
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new HttpError('No autorizado', 401);
      }
      throw new Error('Error al actualizar calificacion');
    }
  });
}
