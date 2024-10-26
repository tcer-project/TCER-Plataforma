// Array para almacenar las órdenes
const ordenes = [];

// Función para abrir el formulario y seleccionar el combo
function abrirFormulario(combo) {
  console.log("Combo seleccionado:", combo); // Verificar el combo seleccionado

  const comboSeleccionado = document.getElementById('comboSeleccionado');
  const comboNombre = document.getElementById('comboNombre').querySelector('strong');
  
  comboSeleccionado.value = combo; // Establecer el combo seleccionado
  comboNombre.textContent = combo; // Mostrar el combo en el formulario

  // Mostrar el modal
  const modal = document.getElementById('modal');
  modal.style.display = "block"; // Mostrar el modal

  console.log("Formulario visible:", modal.style.display); // Verificar estado del formulario
}

// Función para cerrar el formulario
function cerrarFormulario() {
  const modal = document.getElementById('modal');
  modal.style.display = "none"; // Ocultar el modal
}

async function enviarOrden(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const orden = {
      nombre: formData.get('nombre'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      cantidad: formData.get('cantidad'),
      combo: formData.get('combo')
  };

  console.log("Orden a enviar:", orden);

  try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbymIZZYJpz7T_XfJP8L_8EsXMniNGskOleZ0Yc7V4IgdZIUUPI3pFsDW0zcvg2QAkqu/exec', {
          method: 'POST',
          body: new URLSearchParams(orden)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      // Aquí agregamos la orden a la lista directamente después de enviarla
      agregarOrden(orden); // Agregar la orden a la lista en el lado del admin

      event.target.reset();
      cerrarFormulario();
  } catch (error) {
      console.error('Error al enviar la orden:', error);
  }
}

// Función para agregar la orden a la lista
function agregarOrden(orden) {
  const listaOrdenes = document.getElementById('lista-ordenes');
  const li = document.createElement('li');
  li.textContent = `Nombre: ${orden.nombre}, Dirección: ${orden.direccion}, Teléfono: ${orden.telefono}, Cantidad: ${orden.cantidad}, Combo: ${orden.combo}`;
  listaOrdenes.appendChild(li);
}

// Función para cargar órdenes desde Google Apps Script
async function cargarOrdenes() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbymIZZYJpz7T_XfJP8L_8EsXMniNGskOleZ0Yc7V4IgdZIUUPI3pFsDW0zcvg2QAkqu/exec?alt=json'); // Cambia aquí tu URL si es necesario
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const ordenes = await response.json();
        ordenes.forEach(orden => {
            agregarOrden(orden); // Llama a la función para agregar la orden a la lista
        });
    } catch (error) {
        console.error('Error al cargar órdenes:', error);
    }
}

// Llamar a cargarOrdenes al cargar la página
window.onload = function() {
    cargarOrdenes(); // Cargar órdenes al iniciar la página
};
