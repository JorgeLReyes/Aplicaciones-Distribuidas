# Aplicaciones-Distribuidas

## Ejercicio API Rest Ful

Para este ejercicio se trabajó de la siguiente manera
1. Servidor: Node.JS con Express alojado en el servicio web de Render
2. Cliente: EL cliente realizó con tecnologías básicas: HTML, CSS Y JS
3. DB: La base de datos esta alojada en el servicio de Supabase

### URL

**EndPoints API**

| Petición HTTP | URL | Headers |
| ----------- | ----------- | ----------- |
| GET | [Obtener todos los usuarios](https://apirestful-users.onrender.com/users) | 
| POST | [Añadir un nuevo usuario](https://apirestful-users.onrender.com/user) | Token : 1324
| PUT | [Editar un usuario](https://apirestful-users.onrender.com/user) | Token : 1324
| DELETE | [Eliminar un usuario](https://apirestful-users.onrender.com/user) | Token : 1324

```
Formato para mandar el objeto de la petición
{
  "data":{
    "id":[valor],
    "nombre":[valor],
  }  
}
```
En la siguiente imagen podemos observar el diagrama de arquitectura
![imagen diagrama](https://github.com/JorgeLReyes/Aplicaciones-Distribuidas/blob/main/Diagramas%20arquitectura/API.png)
