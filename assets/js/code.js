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
  event.preventDefault(); // Prevenir el envío del formulario

  // Crear un objeto orden a partir de los datos del formulario
  const formData = new FormData(event.target);
  const orden = {
      nombre: formData.get('nombre'),
      direccion: formData.get('direccion'),
      telefono: formData.get('telefono'),
      cantidad: formData.get('cantidad'),
      combo: formData.get('combo')
  };

  console.log("Orden a enviar:", orden); // Verificar la orden que se va a enviar

  // Enviar la orden al Google Apps Script
  try {
      const response = await fetch('https://script.google.com/macros/s/AKfycbzQuSa7isR9RBh8hSkJCglioxtkO1DIRe6-A5md7dV91QmcnLUDCFg3QAMwqGFV7NMa/exec', {
          method: 'POST',
          body: new URLSearchParams(orden)
      });

      if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      agregarOrden(data.orden); // Agregar la orden a la lista
      event.target.reset(); // Reiniciar el formulario
      cerrarFormulario(); // Cerrar el modal después de enviar
  } catch (error) {
      console.error('Error al enviar la orden:', error);
  }
}

// Función para agregar la orden a la lista
function agregarOrden(orden) {
    const listaOrdenes = document.getElementById('lista-ordenes');
    const li = document.createElement('li');
    li.textContent = `ID: ${orden.id}, Combo: ${orden.combo}, Cliente: ${orden.nombre}, Cantidad: ${orden.cantidad}`;
    listaOrdenes.appendChild(li);
}
