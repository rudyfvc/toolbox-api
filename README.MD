# API REST Toolbox

Este proyecto esta desarrollado en Node14 y Express
- Los siguientes endpoints están disponibles
    - http://localhost:3000/
    - http://localhost:3000/files/data
    - http://localhost:3000/files/data?fileName={fileName}
    - http://localhost:3000/files/list
- Los test están en el directorio /test

# Para ejecutar el proyecto

- Primero instalar dependencias utilizando `npm install`
- Luego para iniciar la API ejecutar `npm start`
- Para ejecución de los test utilizar `npm test`

## Dependencias

- [expressjs](https://github.com/expressjs/express) - Utilizada para manejar las peticiones HTTP
- [axios](https://www.npmjs.com/package/axios) - Utilizada para consumo API externas
- [chai](https://www.chaijs.com/) - Utilizada para construcción de test
- [mocha](https://mochajs.org/) - Utilizada para construcción de test