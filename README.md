# Aplicaciones-Distribuidas

## Ejercicio API Rest Ful

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: EL cliente realizó con tecnologías básicas: HTML, CSS Y JS
3. DB: La base de datos esta alojada en el servicio de Supabase

### URL

**EndPoints API**
Para acceder a la API del servidor se puede hacer mediante los siguientes links
- GET [Obtener todos los usuarios](https://apirestful-users.onrender.com/users)
- POST [Añadir nuevo usuario](https://apirestful-users.onrender.com/user) 
- PUT [Modificar nuevo usuario](https://apirestful-users.onrender.com/user)
- DELETE [Eliminar nuevo usuario](https://apirestful-users.onrender.com/user)

Para las peticiones tipo POST, PUT y DELETE el objeto JSON se debe mandar de la siguiente manera
`{
  "data":{
    "id":[valor],
    "nombre":[valor],
  }  
}`
__Nota: Las propiedades id y/o valor pueden ser opcionales dependiendo de la solicitud__
