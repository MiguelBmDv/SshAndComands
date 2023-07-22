const express = require ('express');
const app = express();
const port = process.env.port || 3031;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const tasks= [ 
    {id:1, titulo:"Codificar", descripcion : "describir", completada:true},
    {id:2, titulo:"Base de datos", descripcion : "describir", completada:false},
    {id:3, titulo:"Exposición", descripcion : "describir", completada:true},
];

app.get ("/", (req,res) => {
    res.send("API para tareas a elaborar")
});

app.get ("/tasks",(req,res) => {
    res.send (tasks);
});
 
app.get ("/tasks/:id",(req,res)=> {
    const taski = tasks.find((e) => e.id === parseInt(req.params.id));
    if (!taski)
        return res.send("Tarea no encontrada").status (404);
    else res.send(taski);
});

app.post ("/tasks", (req,res) => {
    const task = {
        id: tasks.length +1,
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completada: req.body.completada === true,
    }
    tasks.push(task);
    res.send(tasks);
});

app.put("/tasks/:id", (req, res) => {
    const taskIndex = tasks.findIndex((task) => task.id === parseInt(req.params.id));
  
    if (taskIndex !== -1) {
      const updatedTask = {
        id: parseInt(req.params.id),
        titulo: req.body.titulo,
        descripcion: req.body.descripcion,
        completada: req.body.completada === true,
      };
  
      tasks[taskIndex] = updatedTask;
  
      res.send(updatedTask);
    } else {
      res.status(404).send("Tarea no encontrada");
    }
  });

app.delete ("/tasks/:id",(req,res) => {
    const task = tasks.find ((d) => d.id === parseInt(req.params.id));

    if (!task)
        return res.send("No se encontro la tarea a eliminar").status(404)
    else res.send(task);
    const indice = tasks.indexOF(task);
    tasks.splice(indice,1);
    res.send(task);
});

app.listen (port, ()=> console.log (`Escuchando el puerto ${port}...`));










