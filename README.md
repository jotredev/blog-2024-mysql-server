# INSTRUCCIONES PARA EL SERVIDOR EN LOCAL

1. Agregar el archivo .env
2. Crear o importar base de datos en local mysql
3. Crear las variables de entorno necesarias

```
    PORT = 4000

    # DATABASE
    MYSQL_DATABASE=
    MYSQL_USER=
    MYSQL_PASSWORD=
    MYSQL_HOST=

    # JWT
    JWT_SECRET=
```

4. Instalar dependencias

```
npm install
```

5. Iniciar el servidor en localhost

```
npm run dev
```
