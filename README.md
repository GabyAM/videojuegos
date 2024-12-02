# Aplicación de videojuegos en React

Hecha por Gabriel Miranda


## Reentrega - Cambios

En base a la devolución del trabajo, se realizaron los siguientes arreglos:
- Se arreglaron los errores de validación en los formularios de Login y registro, ahora aparece como error de campo cuando el nombre o clave es incorrecto. También ahora se muestra un mensaje general en el formulario si algo salió mal.
- Actualizar la calificación de un juego ahora hace que se actualize el promedio en la tarjeta.
- Se agregó el componente NavBar
- Se mejoró el sistema de autenticación para que usuario sea expulsado automáticamente cuando pase el tiempo del token
- Al cerrar sesión en el formulario de juego se redirige al usuario al home
- Las plataformas funcionan en el formulario de juego
- Las imagenes de los juegos ahora son visibles en la pagina de detalle
- Se modificó el funcionamiento del filtro de clasificacion de edad
- Se creó una nueva clase de excepción en la API para manejar errores de validación de forma mas fácil.
- Ahora se guarda el token y la fecha de vencimiento en la base de datos al hacer login (aunque no se usa en mi implementación de autenticación). Se modificó el tipo de dato del campo "token" en la tabla usuario para que pueda entrar un JWT

## Cambios hechos en API

- Se añadió endpoint para hacer fetch a plataformas
- Se arreglaron algunos endpoint de juegos (consultas SQL, guardado de imágenes)
- Se añadió un endpoint para obtener una calificación con la id del juego y del usuario logueado
- Sistema de autenticación reemplazado por tokens JWT

## Librerias utilizadas
- react-hook-form: Esta librería nos da muchas funcionalidades convenientes para manejar formularios. Maneja los estados de los campos internamente de una manera optimizada y permite registrar los inputs con una serie de reglas para validar, entre otras cosas.
- react-router-dom: permite relacionar componentes a rutas, y tiene utilidades como el useNavigate y useParams.
- jwt-decode: Para decodificar tokens y poder acceder a su información, y así mostrarla en la aplicación
