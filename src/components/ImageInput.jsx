import style from '../assets/styles/imageinput.module.css';
import { useController } from 'react-hook-form';
import { ImageIcon } from './Icons';
import placeholder from '../assets/images/thumbnail_placeholder.png';

export function ImageInput({ name, rules, error, control }) {
  const {
    field: { onChange, onBlur, value, ref, name: fieldName },
    fieldState: { isDirty }
  } = useController({
    name,
    control,
    rules
  });

  async function handleInputChange(e) {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      onChange(file);
    }
  }

  return (
    <>
      <div
        className={`${style['input-container']} ${isDirty ? style.uploaded : ''}`}
      >
        <label htmlFor="image-file-input" className={style['custom-input']}>
          <div className="icon-container">
            <ImageIcon size="3em"></ImageIcon>
          </div>
        </label>
        <input
          className={style['original-input']}
          name={fieldName}
          onBlur={onBlur}
          ref={ref}
          id="image-file-input"
          type="file"
          onChange={handleInputChange}
          accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
        ></input>
        <img src={value ? URL.createObjectURL(value) : placeholder}></img>
      </div>
    </>
  );
}
