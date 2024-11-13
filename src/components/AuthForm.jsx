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
              message: Object.values(res.errors[key])
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
          <div className={style['input-wrapper']}>
            <input
              className={style.input}
              type="text"
              name="nombre_usuario"
              id="nombre_usuario"
              {...register('nombre_usuario')}
            ></input>
          </div>
        </div>
        <div className={style['input-container']}>
          <label htmlFor="clave">Clave</label>
          <div className={style['input-wrapper']}>
            <input
              className={style.input}
              type="text"
              name="clave"
              id="clave"
              {...register('clave')}
            ></input>
          </div>
        </div>
        <button className={style.button}>{label}</button>
      </form>
    </div>
  );
}
