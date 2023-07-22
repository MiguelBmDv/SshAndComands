const express = require ('express');
const app = express();
const port = process.env.port || 3032;
const cors = require("cors");

app.use(cors());
app.use(express.json());

const library = [ 
    {id:1, titulo:"Cien años de soledad", autor:"Gabriel Garcia Marquez", genero: "Novela",año:1952 },
    {id:2, titulo:"Cien años de soledad", autor:"Gabriel Garcia Marquez", genero: "Novela",año:1952 },
    {id:3, titulo:"Cien años de soledad", autor:"Gabriel Garcia Marquez", genero: "Novela",año:1952 },
];

app.get ("/", (req,res) => {res.send("BIBLIOTECA VIRTUAL"); });
app.get ("/library", (req,res) => {res.send(library); });

app.get ("/library/:id", (req,res) => {
    const id= parseInt(req.params.id);
    const book = library.find((e) => e.id === id);
       
    if (!book)
        return res  
            .status (404)
            .send ("Libro agotado o no encontrado");
    else res.send (book);
});

app.post ("/library", (req, res) =>{
    const booki = {
        id: library.length +1,
        titulo: req.body.titulo,
        autor: req.body.autor,
        genero: req.body.genero,
        año: parseInt(req.body.año)
    }
    library.push(booki);
    res.send(booki);
});

app.put ("/library/:id", (req, res) => {
    const id= parseInt(req.params.id);
    const editBook = library.findIndex((booki) => booki.id === id);
    if (editBook !== -1) {
        const updateBook = {
            id: library.length +1,
            titulo: req.body.titulo,
            autor: req.body.autor,
            genero: req.body.genero,
            año: parseInt(req.body.año)
        }

        library[editBook] = updateBook
        res.send(updateBook);
    }
    else res.send("Libro no encontrado").status(404);
    });

app.delete ("/library/:id", (req, res) => {
    const id= parseInt(req.params.id);
    const Book = library.find((d) => d.id === id);
    if (!Book) return res.send("Libro no encontrado".status(404));
    else res.send(Book);

    const indice = library.indexOf(Book);
    library.splice(indice,1);
    res.send(Book);
})

app.listen (port, () => console.log (`escuchando el puerto ${port}....`));