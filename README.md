# Maintenances
Api para registro de carros y mantenimientos.

Instalacion 
1. Instalar docker 
  linux : sudo snap install docker
2. clonar el proyecto
  una vez instalado docker dirijase a la carpeta raiz del proyecto 
3. Ejecute el comando docker compose up --build o sudo docker compose --build
en este paso podria pedir el archivo .env
por lo que sera necesario crearlo en la carpeta backend
con las siuientes variables de entorno

DATABASE_USER=admin
DATABASE_PASSWORD=123456
DATABASE_HOST=database

La app esta dividida en 2 partes 
  backend: ruby on rails corriendo en localhost:3000
  frontend: react corriendo en localhost:3001

4. dirijase a su navegador web y en la barra de direccion ingerese localhost:3001 y accedera a las vistas de la app

