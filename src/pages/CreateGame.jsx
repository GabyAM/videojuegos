import { useForm } from 'react-hook-form';
import { useAuth } from '../hooks/useAuth';
import { ImageInput } from '../components/ImageInput';
import { useNavigate } from 'react-router-dom';
import { HttpError } from '../utilities/error';
import style from '../assets/styles/creategame.module.css';

function addGame(token, data) {
  const formData = new FormData();
  Object.keys(data).forEach((key) => {
    formData.append(key, data[key]);
  });
  return fetch('http://localhost/juego', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${token}`
      //   'Content-Type': 'multipart/form-data'
    },
    body: formData
  }).then((res) => {
    if (!res.ok) {
      if (res.status === 401) {
        throw new HttpError('No autorizado', 401);
      }
      throw new Error('Error al añadir juego');
    }
    return;
  });
}

export function CreateGame() {
  const { isAuthenticated, token, user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError,
    control
  } = useForm();

  if (!isAuthenticated || !user.es_admin) return;

  function handleFormSubmit(formData) {
    if (isSubmitting) return;

    return addGame(token, formData)
      .then((res) => {
        if (res.status !== 200 && res.errors) {
          Object.keys(res.errors).forEach((key) => {
            setError(key, {
              type: 'server',
              message: res.errors[key]
            });
          });
          return;
        }
        navigate('/');
      })
      .catch((e) => {
        setError('root.serverError', {
          message: 'Hubo un error'
        });
      });
  }

  return (
    <div className={style.container}>
      <h1>Nuevo juego</h1>
      <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={style['input-container']}>
          <label htmlFor="nombre">Nombre</label>
          <input
            className={style.input}
            type="text"
            {...register('nombre', {
              required: 'El nombre es requerido',
              maxLength: {
                value: 45,
                message: 'El nombre debe tener menos de 45 carácteres'
              }
            })}
          ></input>
          {errors && errors['nombre'] && (
            <span className={style['error-message']}>
              {errors['nombre'].message}
            </span>
          )}
        </div>
        <div className={style['input-container']}>
          <label htmlFor="descripcion">Descripcion</label>
          <input
            className={style.input}
            type="text"
            {...register('descripcion', {
              required: 'La descripcion es requerida'
            })}
          ></input>
          {errors && errors['descripcion'] && (
            <span className={style['error-message']}>
              {errors['descripcion'].message}
            </span>
          )}
        </div>
        <ImageInput
          name="imagen"
          control={control}
          error={errors['imagen']}
        ></ImageInput>
        <div className={style['input-container']}>
          <label htmlFor="clasificacion_edad">Clasificacion de edad</label>
          <select
            {...register('clasificacion_edad', {
              required: 'La clasificacion es requerida'
            })}
          >
            <option selected hidden disabled>
              Clasificacion de edad
            </option>
            <option value="ATP">ATP</option>
            <option value="+13">+13</option>
            <option value="+18">+18</option>
          </select>
          {errors && errors['clasificacion_edad'] && (
            <span className={style['error-message']}>
              {errors['clasificacion_edad'].message}
            </span>
          )}
        </div>
        <div className={style['input-container']}>
          <h3>Plataformas</h3>
          {['PC', 'PS', 'XBOX', 'Android', 'Otros'].map((platform) => (
            <div key={platform}>
              <label htmlFor={platform}>{platform}</label>
              <input
                type="checkbox"
                id={platform}
                value={platform}
                {...register('plataformas')}
              ></input>
            </div>
          ))}
          {errors && errors['plataformas'] && (
            <span className={style['error-message']}>
              {errors['plataformas'].message}
            </span>
          )}
        </div>
        <button>Añadir</button>
      </form>
    </div>
  );
}
