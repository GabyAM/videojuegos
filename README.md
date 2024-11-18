# Aplicación de videojuegos en React

Hecha por Gabriel Miranda

## Cambios hechos en API

- Se añadió endpoint para hacer fetch a plataformas
- Se arreglaron algunos endpoint de juegos (consultas SQL, guardado de imágenes)
- Se añadió un endpoint para obtener una calificación con la id del juego y del usuario logueado
- Sistema de autenticación reemplazado por tokens JWT

## Librerias utilizadas
- react-hook-form: Esta librería nos da muchas funcionalidades convenientes para manejar formularios. Maneja los estados de los campos internamente de una manera optimizada y permite registrar los inputs con una serie de reglas para validar, entre otras cosas.
- react-router-dom: permite relacionar componentes a rutas, y tiene utilidades como el useNavigate y useParams.
- jwt-decode: Para decodificar tokens y poder acceder a su información, y así mostrarla en la aplicación
