# Requisitos
docker
make

# Instalación
Una vez clonado el proyecto abrir una línea de comandos en el directorio raíz y ejecutar el comando
`make start-environment-compose -e ENVIRONMENT=test` este comando ejecuta una serie de instrucciones 
específicas para iniciar diferentes contenedores con los diversos componentes de software que requiere
el proyecto.

Una vez finalice este proceso, verificar con el comando `docker ps` el ID del contenedor de backend y
ejecutar `docker exec -it <ID> bash` lo que permite acceder al bash del contenedor de forma interactiva.
Estando dentro del contenedor correr los comandos:
1. `cd backend`
2. `python3 manage.py makemigrations`
3. `python3 manage.py migrate`
4. `python3 manage.py createsuperuser`

El último comando solicitará ingresar por teclado el username y la constraseña con la que se configurará
el usuario administrador. Al finalizar este proceso se puede salir del bash del contenedor ejecutando `exit`.

