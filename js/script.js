const botones = document.querySelectorAll('.acordeon-btn');
const imagenes = document.querySelectorAll(".expandible");
const modal = document.getElementById("modalImagen");
const modalImg = document.getElementById("imagenAmpliada");
const cerrar = document.getElementById("cerrar");

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const icono = boton.querySelector('.icono');
    const contenido = boton.nextElementSibling;

    // Alternar la clase 'active' en el botón
    boton.classList.toggle('active');

    // Verificar si el botón pertenece al acordeón principal
    const acordeonPrincipal = boton.closest('.acordeon-principal');
    if (acordeonPrincipal) {
      if (boton.classList.contains('active')) {
        acordeonPrincipal.classList.add('fondo-transparente'); // Hace el fondo transparente
      } else {
        acordeonPrincipal.classList.remove('fondo-transparente'); // Restaura el fondo original
      }
    }

    // Cambiar el icono de dirección
    if (boton.classList.contains('active')) {
      icono.classList.remove('fa-angle-down');
      icono.classList.add('fa-angle-up');

      // Abrir el contenido y ajustar su altura
      contenido.style.maxHeight = contenido.scrollHeight + 'px';
    } else {
      icono.classList.remove('fa-angle-up');
      icono.classList.add('fa-angle-down');

      // Cerrar el contenido
      contenido.style.maxHeight = '0';
    }

    // Ajustar las alturas de todos los acordeones padres
    ajustarAlturaPadresRecursivamente(boton);
  });

  // Escuchar cambios de transición para recalcular dinámicamente las alturas
  const contenido = boton.nextElementSibling;
  contenido.addEventListener('transitionend', () => {
    ajustarAlturaPadresRecursivamente(boton);
  });
});

// Función recursiva para ajustar las alturas de los acordeones padres
function ajustarAlturaPadresRecursivamente(elemento) {
  let contenedor = elemento.closest('.acordeon-contenido');

  while (contenedor) {
    let nuevaAltura = 0;
    const hijosVisibles = Array.from(contenedor.children).filter(child => {
      const contenidoHijo = child.querySelector('.acordeon-contenido');
      return contenidoHijo && contenidoHijo.style.maxHeight && parseFloat(contenidoHijo.style.maxHeight) > 0;
    });

    hijosVisibles.forEach(hijo => {
      nuevaAltura += hijo.scrollHeight;
    });

    nuevaAltura += contenedor.scrollHeight;
    contenedor.style.maxHeight = nuevaAltura + 'px';
    contenedor = contenedor.parentElement.closest('.acordeon-contenido');
  }
}

botones.forEach(boton => {
  boton.addEventListener('click', () => {
    const acordeon = boton.parentElement; // Selecciona el acordeón correspondiente
    const contenido = boton.nextElementSibling;
    const icono = boton.querySelector('.icono');

    // Alternar clase 'abierto' para gestionar el fondo dinámico
    acordeon.classList.toggle('abierto');

    // Cambiar el icono y abrir/cerrar el contenido
    if (acordeon.classList.contains('abierto')) {
      icono.classList.remove('fa-angle-down');
      icono.classList.add('fa-angle-up');
      contenido.style.maxHeight = contenido.scrollHeight + 'px';
    } else {
      icono.classList.remove('fa-angle-up');
      icono.classList.add('fa-angle-down');
      contenido.style.maxHeight = '0';
    }
  });
});

imagenes.forEach(img => {
  img.addEventListener("click", () => {
      modal.style.display = "block";
      modalImg.src = img.src; // Mostrar la imagen en el modal
  });
});

// Cerrar el modal al hacer clic en "X"
cerrar.addEventListener("click", () => {
  modal.style.display = "none";
});

// Cerrar el modal si se hace clic fuera de la imagen
modal.addEventListener("click", (e) => {
  if (e.target === modal) {
      modal.style.display = "none";
  }
});
