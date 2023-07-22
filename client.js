function TablaEstudiantes() {
  const tbody = document.getElementById("tbody-estudiantes");
  tbody.innerHTML = ""; // Limpiar el contenido del tbody antes de agregar los estudiantes

  fetch("http://localhost:3030/api/estudiantes")
    .then(response => response.json())
    .then(estudiantes => {
      estudiantes.forEach(function (estudiante) {
        const fila = tbody.insertRow();
        const celdaId = fila.insertCell();
        const celdaNombre = fila.insertCell();
        const celdaApellido = fila.insertCell();
        const celdaEdad = fila.insertCell();
        const celdaSemestre = fila.insertCell();
        const celdaEstudia = fila.insertCell();
        const celdaAcciones = fila.insertCell(); // Agregada celda para las acciones

        celdaId.textContent = estudiante.id;
        celdaNombre.textContent = estudiante.nombre;
        celdaApellido.textContent = estudiante.apellido;
        celdaEdad.textContent = estudiante.edad;
        celdaSemestre.textContent = estudiante.semestre;
        celdaEstudia.textContent = estudiante.estudia ? "Sí" : "No";

        const botonEliminar = document.createElement("button");
        botonEliminar.textContent = "Eliminar";
        botonEliminar.addEventListener("click", function () {
          eliminarEstudiante(estudiante.id)
            .then(() => {
              tbody.removeChild(fila);
            })
            .catch(error => {
              console.error("Error al eliminar estudiante:", error);
            });
        });

        celdaAcciones.appendChild(botonEliminar);

        const botonEditar = document.createElement("button");
        botonEditar.textContent = "Editar";
        botonEditar.addEventListener("click", function () {
          llenarFormularioEstudiante(estudiante);
        });

        celdaAcciones.appendChild(botonEditar);
      });
    });
}

function llenarFormularioEstudiante(estudiante) {
  const formEstudiante = document.getElementById("form-estudiante");
  const inputId = document.getElementById("input-id");
  const inputNombre = document.getElementById("input-nombre");
  const inputApellido = document.getElementById("input-apellido");
  const inputEdad = document.getElementById("input-edad");
  const inputSemestre = document.getElementById("input-semestre");
  const inputEstudia = document.getElementById("input-estudia");

  inputId.value = estudiante.id;
  inputNombre.value = estudiante.nombre;
  inputApellido.value = estudiante.apellido;
  inputEdad.value = estudiante.edad;
  inputSemestre.value = estudiante.semestre;
  inputEstudia.checked = estudiante.estudia;
}

function crearEstudiante(estudiante) {
  return fetch("http://localhost:3030/api/estudiantes", {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(estudiante)
  })
    .then(response => response.json())
    .catch(error => console.error("Error al crear estudiante:", error));
}

function actualizarEstudiante(id, estudiante) {
  return fetch(`http://localhost:3030/api/estudiantes/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(estudiante)
  })
    .then(response => response.json())
    .catch(error => console.error("Error al actualizar estudiante:", error));
}

function eliminarEstudiante(id) {
  return fetch(`http://localhost:3030/api/estudiantes/${id}`, {
    method: "DELETE"
  })
    .then(response => response.json())
    .catch(error => console.error("Error al eliminar estudiante:", error));
}

document.addEventListener("DOMContentLoaded", function () {
  const formEstudiante = document.getElementById("form-estudiante");

  formEstudiante.addEventListener("submit", function (event) {
    event.preventDefault();

    const id = document.getElementById("input-id").value;
    const nombre = document.getElementById("input-nombre").value;
    const apellido = document.getElementById("input-apellido").value;
    const edad = parseInt(document.getElementById("input-edad").value);
    const semestre = parseInt(document.getElementById("input-semestre").value);
    const estudia = document.getElementById("input-estudia").checked;

    const estudiante = {
      id: id,
      nombre: nombre,
      apellido: apellido,
      edad: edad,
      semestre: semestre,
      estudia: estudia
    };

    if (id) {
      // Si hay un ID de estudiante, realizar la actualización
      actualizarEstudiante(id, estudiante)
        .then(estudianteActualizado => {
          console.log("Estudiante actualizado:", estudianteActualizado);
          formEstudiante.reset();
          TablaEstudiantes(); // Volver a cargar la tabla con los estudiantes actualizados
        })
        .catch(error => console.error("Error al actualizar estudiante:", error));
    } else {
      // Si no hay un ID de estudiante, realizar la creación de uno nuevo
      crearEstudiante(estudiante)
        .then(estudianteCreado => {
          console.log("Estudiante creado:", estudianteCreado);
          formEstudiante.reset();
          TablaEstudiantes(); // Volver a cargar la tabla con el nuevo estudiante agregado
        })
        .catch(error => console.error("Error al crear estudiante:", error));
    }
  });

  // Resto del código...

  const toggleBtn = document.getElementById("toggle-btn");
  const miElemento = document.getElementById("div-tabla");

  function toggleElement(element) {
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }

  toggleBtn.addEventListener("click", function () {
    toggleElement(miElemento);
  });

  TablaEstudiantes();
});