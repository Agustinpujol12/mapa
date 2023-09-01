document.addEventListener("DOMContentLoaded", async function () {
  const provinces = document.querySelectorAll("path");
  const provinceInfo = document.getElementById("province-info");
  const sortByPopulationBtn = document.getElementById("sortByPopulationBtn");
  const sortByAreaBtn = document.getElementById("sortByAreaBtn");
  const sortedProvincesContainer = document.getElementById("sortedProvinces");
  const deleteTableBtn = document.getElementById("deleteTableBtn");
  const sortedProvinces = document.getElementById("sortedProvinces");
   // Cargar datos desde el archivo JSON
  const response = await fetch("datos.json");
  const provincesData = await response.json();

  // CREACION DE TABLA POR ORDEN DE POBLACION Y AREA

  sortByPopulationBtn.addEventListener("click", () => {
    const sortedByPopulation = provincesData.slice().sort((a, b) => {
      return (
        parseInt(b.population.replace(/,/g, "")) -
        parseInt(a.population.replace(/,/g, ""))
      );
    });
    displaySortedProvinces(sortedByPopulation, "Población");
  });

  sortByAreaBtn.addEventListener("click", () => {
    const sortedByArea = provincesData.slice().sort((a, b) => {
      const aArea = parseFloat(a.area.split(" ")[0].replace(/,/g, ""));
      const bArea = parseFloat(b.area.split(" ")[0].replace(/,/g, ""));
      return bArea - aArea;
    });
    displaySortedProvinces(sortedByArea, "Área");
  });

  function displaySortedProvinces(sortedProvinces, sortBy) {
    var sortedHTML = `<h2>Provincias Ordenadas por ${sortBy}</h2>`;
    sortedProvinces.forEach((province) => {
      sortedHTML += `
        <div class="sorted-province">
          <h3>${province.name}</h3>
          <p><strong>${sortBy}:</strong> ${
        sortBy === "Población" ? province.population : province.area
      }</p>
        </div>
      `;
    });
    sortedProvincesContainer.innerHTML = sortedHTML;
  }

  // FLICKR - API 

  const flickrApiKey = "a26984b694e49602b82d26167508bd46";

  // EVENTO QUE MANEJA CLICKS EN LAS PROVINCIAS

  provinces.forEach((province) => {
    province.addEventListener("click", async () => {
      provinces.forEach((p) => p.classList.remove("active")); // Remover la clase "active" de todas las provincias
      province.classList.add("active"); // Agregar la clase "active" a la provincia actual

      const provinceName = province.getAttribute("id");
      const selectedProvince = getProvinceData(provinceName);

   // Obtener el contenedor de turismo
   const tourismSection = document.getElementById("tourismSection");
   const tourismEntriesContainer = document.getElementById("tourismEntries");

   // Mostrar la sección de turismo
   tourismSection.style.display = "block";

   // Obtener la información de turismo de la provincia
   const tourismData = selectedProvince.tourism;

   // Mostrar las entradas de turismo
   if (tourismData && tourismData.length > 0) {
     showTourismEntries(tourismData); // Mostrar todas las entradas de turismo al seleccionar la provincia
   } else {
     tourismEntriesContainer.innerHTML = "<p>No hay información de turismo disponible.</p>";
   }

function showTourismEntries(tourismData) {
 const tourismEntriesContainer = document.getElementById("tourismEntries");
 tourismEntriesContainer.innerHTML = ""; // Limpiar el contenedor antes de agregar nuevas entradas

 tourismData.forEach((entry) => {
   const entryHTML = `
     <div class="tourism-entry">
       <div class="tourism-image">
         <img src="${entry.image}" alt="${entry.name}">
       </div>
       <div class="tourism-description">
         <h4>${entry.name}</h4>
         <p>${entry.description}</p>
       </div>
     </div>
   `;
   tourismEntriesContainer.innerHTML += entryHTML;
 });
}

      if (selectedProvince) {
        // Modificar la búsqueda para incluir el nombre de la provincia y las palabras "Argentina" y "paisaje"

        

        const searchQuery = `${selectedProvince.name} argentina paisaje`;

        const flickrApiUrl = `https://api.flickr.com/services/rest/?method=flickr.photos.search&api_key=${flickrApiKey}&text=${searchQuery}&format=json&nojsoncallback=1`;

        try {
          const response = await fetch(flickrApiUrl);
          const data = await response.json();

          if (data.photos && data.photos.photo.length > 0) {
            const photo = data.photos.photo[0];
            const imageUrl = `https://farm${photo.farm}.staticflickr.com/${photo.server}/${photo.id}_${photo.secret}.jpg`;

            // Muestra la imagen en el elemento HTML deseado
            const imageElement = `<img src="${imageUrl}" alt="${selectedProvince.name}">`;

            // Crea un cuadro para mostrar la imagen y la información
            const provinceBoxHTML = `
              <div class="province-box">
                <h2>${selectedProvince.name}</h2>
                ${imageElement}
                <p><strong>Capital:</strong> ${selectedProvince.capital}</p>
                <p><strong>Población:</strong> ${selectedProvince.population}</p>
                <p><strong>Área:</strong> ${selectedProvince.area}</p>
                <p><strong>Descripción:</strong> ${selectedProvince.description}</p>
              </div>
            `;

            provinceInfo.innerHTML = provinceBoxHTML;
          } else {
            provinceInfo.innerHTML = `<h2>${selectedProvince.name}</h2><p>No se encontraron imágenes.</p>`;
          }
        } catch (error) {
          console.error("Error al obtener imágenes de Flickr:", error);
          provinceInfo.innerHTML = `<h2>${selectedProvince.name}</h2><p>Error al cargar imágenes.</p>`;
        }
        // MOSTRAR SWEET ALERT
        Swal.fire({
          icon: "success",
          title: `Has seleccionado la provincia de ${selectedProvince.name}`,
          toast: true,
          position: "bottom-end",
          showConfirmButton: false,
          timer: 3000,
        });
              // Mostrar el contenedor del clima si hay información disponible
      climaContainer.classList.remove("d-none");
      } else {
        provinceInfo.textContent = "No hay información disponible.";
      }
    });
  });

  var isTableHidden = true; 


  // CAMBIA EL TEXTO DEL BOTON 

  toggleTableButtonText();

  // Función para alternar entre mostrar y ocultar la tabla
  deleteTableBtn.addEventListener("click", () => {
    isTableHidden = !isTableHidden; // Alternar el valor de isTableHidden
    toggleTableButtonText(); // Cambiar el texto del botón
    sortedProvinces.style.display = isTableHidden ? "none" : "block"; // Mostrar u ocultar la tabla
  });

  // Función para cambiar el texto del botón
  function toggleTableButtonText() {
    deleteTableBtn.textContent = isTableHidden ? "Mostrar tabla" : "Eliminar tabla";
  }

  function getProvinceData(provinceId) {
    const province = provincesData.find((p) => p.name === provinceId);
    return province || null;
  }
});


