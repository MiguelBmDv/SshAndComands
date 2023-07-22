const express = require("express");
const cors = require("cors");
const app = express();
const port = process.env.PORT || 3030;

app.use(cors());
app.use(express.json()); 
  
const estudiantes = [
{id:1, nombre:"Miguel", apellido: "Bernal",edad:16,semestre:1,estudia:true},
{id:2, nombre:"Maria", apellido: "Fernanda",edad:18,semestre:10,estudia:true},
{id:3, nombre:"Kevin", apellido: "Londoño",edad:30,semestre:5,estudia:true},
];

app.get("/", (req, res)=> {
    res.send("Hola Esta es mi API");
});

app.get("/api/estudiantes", (req, res) => {
    res.send(estudiantes);
});

app.get("/api/estudiantes/:id", (req, res)=> {
    const alumno = estudiantes.find((e) => e.id === parseInt (req.params.id));
    
    if (!alumno)
        return res
            .status(404)
            .send("Estudiantes no encontrados en nuestra BD");
    else res.send(alumno);

});

app.post("/api/estudiantes", (req, res) => {
    const alum= {
        id: estudiantes.length + 1,
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        edad: parseInt(req.body.edad),
        semestre: parseInt(req.body.semestre),
        estudia: req.body.estudia === true,
    };
estudiantes.push(alum);
res.send(alum);
});

app.put("/api/estudiantes/:id", (req, res) => {
  const alumIndex = estudiantes.findIndex((alum) => alum.id === parseInt(req.params.id));

  if (alumIndex !== -1) {
    const updatedAlum = {
      id: parseInt(req.params.id), // Corregido: utilizar req.params.id en lugar de id
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      edad: parseInt(req.body.edad),
      semestre: parseInt(req.body.semestre),
      estudia: req.body.estudia === true,
    };

    estudiantes[alumIndex] = updatedAlum;

    res.send(updatedAlum);
  } else {
    res.status(404).send("Estudiante no encontrado");
  }
});

  

app.delete("/api/estudiantes/:id", (req, res) => {
    const alumno = estudiantes.find((d) => d.id === parseInt(req.params.id));
    if (!alumno) return res.status(404).send("Estudiantes no encontrado");
    else res.send(alumno);

    const index= estudiantes.indexOf(alumno);
    estudiantes.splice(index, 1);
    res.send(alumno);
});

app.listen(port, () => console.log(`Escuchando el puerto ${port}....`));