import { useEffect } from 'react';
import { useForm } from 'react-hook-form';
import style from '../assets/styles/authform.module.css';

export function AuthForm({ data, label, onSubmit, onSuccess }) {
  const {
    reset,
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    setError
  } = useForm();

  useEffect(() => {
    if (data) {
      reset(data);
    }
  }, [data, reset]);

  function handleFormSubmit(formData) {
    if (isSubmitting) return;
    return onSubmit(formData)
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
        onSuccess(res);
      })
      .catch((e) => {
        setError('root.serverError', {
          message: 'Hubo un error'
        });
      });
  }

  return (
    <div className={style['form-container']}>
      <form className={style.form} onSubmit={handleSubmit(handleFormSubmit)}>
        <div className={style['input-container']}>
          <label htmlFor="nombre_usuario">Nombre de usuario</label>
          <div
            className={`${style['input-wrapper']} ${errors && errors['nombre_usuario'] ? style.error : ''}`}
          >
            <input
              className={`${style.input}`}
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              {...register('nombre_usuario', {
                required: 'El nombre de usuario es requerido',
                minLength: {
                  value: 6,
                  message:
                    'El nombre de usuario debe tener al menos 6 caracteres'
                },
                maxLength: {
                  value: 20,
                  message:
                    'El nombre de usuario debe tener a lo sumo 20 caracteres'
                }
              })}
            ></input>
          </div>
          {errors && errors['nombre_usuario'] && (
            <span className={style['error-message']}>
              {errors['nombre_usuario'].message}
            </span>
          )}
        </div>
        <div className={style['input-container']}>
          <label htmlFor="clave">Clave</label>
          <div
            className={`${style['input-wrapper']} ${errors && errors['clave'] ? style.error : ''}`}
          >
            <input
              className={style.input}
              type="password"
              name="clave"
              id="clave"
              {...register('clave', {
                required: 'La clave es requerida',
                minLength: {
                  value: 8,
                  message: 'La clave debe tener al menos 8 caracteres'
                },
                pattern: {
                  value:
                    /^.*(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]).*$/,
                  message:
                    'La clave debe contener al menos 1 mayúscula, 1 minúscula, 1 número y 1 caracter especial'
                }
              })}
            ></input>
          </div>
          {errors && errors['clave'] && (
            <span className={style['error-message']}>
              {errors['clave'].message}
            </span>
          )}
        </div>
        <div className={style['lower-section']}>
          <button
            disabled={isSubmitting}
            className={`${style.button} ${isSubmitting ? 'pending' : ''}`}
          >
            {label}
          </button>
          {label === 'Iniciar sesión' ? (
            <span className={style['additional-message']}>
              No tenés cuenta? <a href="registro">registrate</a> ahora
            </span>
          ) : (
            <span className={style['additional-message']}>
              Ya tenes cuenta? <a href="login">iniciá sesion</a> ahora
            </span>
          )}
        </div>
        {errors && errors.root && errors.root.serverError && (
          <span className={style['error-message']}>
            Hubo un error de servidor, intenta de nuevo mas tarde
          </span>
        )}
      </form>
    </div>
  );
}
