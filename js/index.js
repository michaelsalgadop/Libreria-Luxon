const botonMenu = document.querySelector(".boton-menu");

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll(".contenido-web .seccion"); // Selecciona los encabezados con IDs
  const enlacesMenu = document.querySelectorAll(".columna-guia a"); // Los enlaces del menú

  // Callback del IntersectionObserver
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const { id } = entry.target;
      const enlaceRelacionado = document.querySelector(
        `.columna-guia a[href="#${id}"]`
      );

      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        // Si la sección está visible, activa su enlace
        enlacesMenu.forEach((enlace) =>
          enlace.classList.remove("color-secundario")
        );
        if (enlaceRelacionado)
          enlaceRelacionado.classList.add("color-secundario");
      }
    });
  };

  // Configuración del IntersectionObserver
  const observer = new IntersectionObserver(observerCallback, {
    root: null, // Usa la ventana como contenedor
    rootMargin: "0px 0px -99% 0px", // Activa solo cuando la parte superior está cerca del viewport
    threshold: 0, // Se activa cuando la sección es visible
  });

  // Observa cada sección
  secciones.forEach((seccion) => observer.observe(seccion));
  enlacesMenu.forEach((enlace, i, enlacesMenu) =>
    enlace.addEventListener("click", () => {
      for (const enlace of enlacesMenu) {
        if (enlace.classList.contains("color-secundario")) {
          enlace.classList.remove("color-secundario");
        }
      }
      enlace.classList.add("color-secundario");
      esconderMostrarColumnaGuia();
    })
  );
});

botonMenu.addEventListener("click", (event) => {
  event.preventDefault();
  esconderMostrarColumnaGuia();
});

const esconderMostrarColumnaGuia = () => {
  const columnaGuia = document.querySelector(".columna-guia");
  const { body } = document;
  columnaGuia.classList.toggle("visible");
  botonMenu.classList.toggle("active");
  if (window.innerWidth < 1020) {
    body.style.overflow = columnaGuia.classList.contains("visible")
      ? "hidden"
      : "auto";
  }
};

const botonesCopy = document
  .querySelectorAll(".copy")
  .forEach((botonCopy) =>
    botonCopy.addEventListener("click", (e) => copiarTexto(e.target))
  );
const copiarTexto = (elemento) => {
  if (!document.hasFocus()) return;
  const identificadorABuscar = elemento.id.slice(elemento.id.indexOf("_") + 1);
  const texto = document
    .querySelector(`#${identificadorABuscar}`)
    .textContent.replace(/\\x3C/g, "<")
    .replace(/\\x3E/g, ">");
  const check = document.querySelector(`#check_${identificadorABuscar}`);
  navigator.clipboard
    .writeText(texto)
    .then(() => {
      elemento.style.display = "none";
      check.classList.add("visible");
      setTimeout(() => {
        check.classList.remove("visible");
        elemento.style.display = "block";
      }, 2000);
    })
    .catch((err) => {
      throw new Error(`No se pudo copiar el texto: ${err}`);
    });
};
