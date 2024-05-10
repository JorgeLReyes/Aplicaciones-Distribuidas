# Aplicaciones-Distribuidas

## Ejercicio API Rest Ful

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: El cliente realizó con tecnologías básicas: HTML, CSS Y JS
3. Base de datos: La base de datos esta alojada en el servicio de Supabase

### URL

**EndPoints API**

| Petición HTTP | URL | Headers | Valores requeridos
| ----------- | ----------- | ----------- | ----------- |
| GET | [Obtener todos los usuarios](https://apirestful-users.onrender.com/users) | |
| POST | [Añadir un nuevo usuario](https://apirestful-users.onrender.com/user) | Token : 1324 | nombre
| PUT | [Editar un usuario](https://apirestful-users.onrender.com/user) | Token : 1324 | id y nombre
| DELETE | [Eliminar un usuario](https://apirestful-users.onrender.com/user) | Token : 1324 | id

```
Formato para mandar el objeto de la petición
{
  "data":{
    "id":[valor],
    "nombre":[valor],
  }  
}
```
**Sitio web Cliente**
[Cliente]()

En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/API.png)
