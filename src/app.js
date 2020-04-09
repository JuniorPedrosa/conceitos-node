const express = require("express");
const cors = require("cors");

 const { uuid, isUuid } = require("uuidv4");

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

function validadeRepositoryId (request, response, next){
  const { id } = request.params;

  if(!isUuid(id)){
    return reponse.status(400).json({error: 'Id Repository not found'});

  }
  return next();
};



app.get("/repositories", (request, response) => {
  // TODO

  const {title} = request.query;

  const results = title ? repositories.filter(list =>
    list.title.includes(title)) : repositories;

  return response.json(results);
});

app.post("/repositories", (request, response) => {
  // TODO
  const { title, url, techs} = request.body;

  const repository = { id: uuid(), title, url, techs, likes:0};

  repositories.push(repository);

  return response.json(repository);
});

app.put("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;
  const {title, url, techs} = request.body;

  const repositoryIndex = repositories.findIndex(list =>
    list.id === id);

  if(repositoryIndex < 0){
    return response.status(400).json({error: 'Id not found'})
  };

  const likes = repositories[repositoryIndex].likes;

  const list = {
    id,
    title,
    url,
    techs,
    likes,
  };

  repositories[repositoryIndex] = list;

  return response.json(list);
});

app.delete("/repositories/:id", (request, response) => {
  // TODO
  const {id} = request.params;

  const listIndex = repositories.findIndex(list =>
    list.id === id);

  if(listIndex < 0){
      return response.status(400).json({error: 'Id not found'})
  };

  repositories.splice(listIndex, 1);

  return response.status(204).send();

});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex(repository => 
    repository.id === id
  );
  
  if(repositoryIndex < 0) {
    return response.status(400).json({error: 'Id not found this route'});
  };

  const likes = repositories[repositoryIndex].likes + 1;
  const repository = {...repositories[repositoryIndex], likes}

  repositories[repositoryIndex] = repository;
  return response.json(repository);

});

module.exports = app;
