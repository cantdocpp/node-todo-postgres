# node-todo-postgres
A simple example of node todo app with postgres database

# Run the app
Using [Docker](https://www.docker.com/), you just have to run

```
# run the app on the background
docker-compose up -d

# run database migration
docker-compose exec web npm run migrate
```

Access the web using `localhost:3000`.
