const botonMenu = document.querySelector(".boton-menu");

document.addEventListener("DOMContentLoaded", () => {
  const secciones = document.querySelectorAll("main h2, main h3"); // Selecciona los encabezados con IDs
  const enlacesMenu = document.querySelectorAll("aside .listado a"); // Los enlaces del menú

  // Callback del IntersectionObserver
  const observerCallback = (entries) => {
    entries.forEach((entry) => {
      const { id } = entry.target;
      const enlaceRelacionado = document.querySelector(
        `aside a[href="#${id}"]`
      );

      if (entry.isIntersecting && entry.intersectionRatio > 0) {
        // Si la sección está visible, activa su enlace
        enlacesMenu.forEach((enlace) => enlace.classList.remove("link-activo"));
        if (enlaceRelacionado) enlaceRelacionado.classList.add("link-activo");
      }
    });
  };

  // Configuración del IntersectionObserver
  const observer = new IntersectionObserver(observerCallback, {
    root: null, // Usa la ventana como contenedor
    rootMargin: "0px 0px -99% 0px", // Activa solo cuando la parte superior está cerca del viewport
    threshold: 0, // Se activa cuando el 60% de la sección es visible
  });

  // Observa cada sección
  secciones.forEach((seccion) => observer.observe(seccion));
  enlacesMenu.forEach((enlace, i, enlacesMenu) =>
    enlace.addEventListener("click", () => {
      for (const enlace of enlacesMenu) {
        if (enlace.classList.contains("link-activo")) {
          enlace.classList.remove("link-activo");
        }
      }
      enlace.classList.add("link-activo");
    })
  );
});

botonMenu.addEventListener("click", (event) => {
  event.preventDefault();
  esconderColumnaGuia();
});

document
  .querySelectorAll(".link-normal")
  .forEach((link) =>
    link.addEventListener("click", (e) => esconderColumnaGuia())
  );

const esconderColumnaGuia = () => {
  const columnaGuia = document.querySelector(".columna-guia");
  columnaGuia.classList.toggle("visible");
  botonMenu.classList.toggle("active");
};

const botonesCopy = document.querySelectorAll(".copy").forEach((botonCopy) =>
  botonCopy.addEventListener("click", (e) => {
    copiarTexto(e.target);
  })
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
