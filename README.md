# Aplicaciones-Distribuidas

## Ejercicio API Rest Ful

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: HTML, CSS Y JS alojada en github pages
3. Base de datos: Alojada en el servicio de Supabase

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
[Ir al sitio web](https://jorgelreyes.github.io/Aplicaciones-Distribuidas/API%20Rest/Client/)

En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/API.png)
