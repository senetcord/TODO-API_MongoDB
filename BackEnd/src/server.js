const express = require("express");
const cors = require("cors");
const app = express();

const TodoModel = require("../src/mongo/todoModel");

app.use(cors());
app.use(express.json());

app.use(express.static("public"));

const PORT = 5000;

function server() {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}/`);
  });

  app.get("/todoList", (req, res) => {
    TodoModel.find().then((response) => res.send(response));
  });

  app.post("/todoList", (req, res) => {
    new TodoModel(req.body).save().then((response) => res.send(response));
  });

  app.delete("/todoList/:id", (req, res) => {
    TodoModel.deleteOne({ _id: req.params.id }).then((response) =>
      res.send(response)
    );
  });

  app.delete("/todoList", (req, res) => {
    TodoModel.deleteMany().then((response) => res.send(response));
  });

  app.put("/todoList/:id", async (req, res) => {
    const currentTodo = await TodoModel.find({ _id: req.params.id });
    const response = await TodoModel.updateOne(
      { _id: req.params.id },
      { checked: !currentTodo[0].checked }
    );

    res.send(response);
  });
}

module.exports = server;
