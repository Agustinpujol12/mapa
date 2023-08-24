document.addEventListener("DOMContentLoaded", function () {
  const provinces = document.querySelectorAll("path");
  const provinceInfo = document.getElementById("province-info");
  const sortByPopulationBtn = document.getElementById("sortByPopulationBtn");
  const sortByAreaBtn = document.getElementById("sortByAreaBtn");
  const sortedProvincesContainer = document.getElementById("sortedProvinces");
  const deleteTableBtn = document.getElementById("deleteTableBtn");
  const sortedProvinces = document.getElementById("sortedProvinces"); 
  
  

  let provincesData = JSON.parse(localStorage.getItem("provincesData"));

  if (!provincesData) {
    provincesData = [
      {
        name: "Córdoba",
        capital: "Córdoba",
        population: "3,308,876",
        area: "165,321 km²",
        description: "Córdoba es una provincia en el centro de Argentina, conocida por su rica historia, paisajes variados y cultura diversa."
      },
      {
        name: "Santa Fe",
        capital: "Santa Fe",
        population: "3,194,537",
        area: "133,007 km²",
        description: "Santa Fe es una provincia en el litoral de Argentina, conocida por su río Paraná y su importancia en la producción agrícola."
      },
      {
        name: "Buenos Aires",
        capital: "La Plata",
        population: "17,500,000",
        area: "307,571 km²",
        description: "Buenos Aires es la provincia más poblada de Argentina y alberga la capital del país, Buenos Aires."
      },
      {
        name: "Mendoza",
        capital: "Mendoza",
        population: "1,741,610",
        area: "148,827 km²",
        description: "Mendoza es conocida por su producción de vino y hermosos paisajes montañosos."
      },
      {
        name: "Tucumán",
        capital: "San Miguel de Tucumán",
        population: "1,448,188",
        area: "22,524 km²",
        description: "Tucumán es la provincia más pequeña de Argentina y se la conoce como 'El Jardín de la República'."
      },
      {
        name: "Salta",
        capital: "Salta",
        population: "1,215,207",
        area: "155,488 km²",
        description: "Salta es una provincia en el noroeste de Argentina, famosa por su rica herencia cultural y su belleza natural."
      },
      {
        name: "San Juan",
        capital: "San Juan",
        population: "681,055",
        area: "89,651 km²",
        description: "San Juan es una provincia ubicada en la región cuyana, conocida por su producción agrícola y minera."
      },
      {
        name: "Entre Ríos",
        capital: "Paraná",
        population: "1,236,400",
        area: "78,781 km²",
        description: "Entre Ríos se encuentra en la región mesopotámica, con paisajes que incluyen ríos y áreas naturales."
      },
      {
        name: "La Rioja",
        capital: "La Rioja",
        population: "333,642",
        area: "89,680 km²",
        description: "La Rioja es una provincia en el oeste de Argentina, con paisajes desérticos y una rica historia."
      },
      {
        name: "Formosa",
        capital: "Formosa",
        population: "624,469",
        area: "72,066 km²",
        description: "Formosa se encuentra en la región del Gran Chaco, con selvas y humedales que la caracterizan."
      },
      {
        name: "Neuquén",
        capital: "Neuquén",
        population: "705,837",
        area: "94,078 km²",
        description: "Neuquén es una provincia en la Patagonia argentina, conocida por sus recursos naturales y paisajes montañosos."
      },
      {
        name: "Chubut",
        capital: "Rawson",
        population: "586,917",
        area: "224,686 km²",
        description: "Chubut es una provincia costera en la Patagonia, con una economía basada en la industria y la ganadería."
      },
      {
        name: "San Luis",
        capital: "San Luis",
        population: "431,588",
        area: "76,748 km²",
        description: "San Luis es una provincia en la región cuyana, conocida por su desarrollo sustentable y paisajes naturales."
      },
      {
        name: "Catamarca",
        capital: "San Fernando del Valle de Catamarca",
        population: "415,438",
        area: "102,602 km²",
        description: "Catamarca es una provincia en el noroeste argentino, con una economía basada en la minería y la agricultura."
      },
      {
        name: "Jujuy",
        capital: "San Salvador de Jujuy",
        population: "770,881",
        area: "53,219 km²",
        description: "Jujuy es una provincia en el norte de Argentina, conocida por su rica cultura y paisajes de montaña."
      },
      {
        name: "La Pampa",
        capital: "Santa Rosa",
        population: "318,951",
        area: "143,440 km²",
        description: "La Pampa es una provincia en el centro de Argentina, con vastas llanuras y una economía basada en la agricultura y la ganadería."
      },
      {
        name: "Chaco",
        capital: "Resistencia",
        population: "1,055,259",
        area: "99,633 km²",
        description: "Chaco se encuentra en la región del Gran Chaco, con selvas y humedales, y es una provincia con gran diversidad cultural."
      },
      {
        name: "Santiago del Estero",
        capital: "Santiago del Estero",
        population: "874,006",
        area: "136,351 km²",
        description: "Santiago del Estero es una provincia en el norte de Argentina, con una rica historia y paisajes naturales."
      },
      {
        name: "Corrientes",
        capital: "Corrientes",
        population: "992,595",
        area: "88,199 km²",
        description: "Corrientes es una provincia en el litoral argentino, con ríos y humedales, y es conocida por sus carnavales y tradiciones."
      },
      {
        name: "Misiones",
        capital: "Posadas",
        population: "1,101,593",
        area: "29,801 km²",
        description: "Misiones se encuentra en el noreste de Argentina, conocida por sus selvas tropicales y las Cataratas del Iguazú."
      },
      {
        name: "Ciudad de Buenos Aires",
        capital: "Buenos Aires",
        population: "2,890,151",
        area: "203 km²",
        description: "La Ciudad de Buenos Aires es la capital de Argentina y un importante centro cultural, político y económico."
      },
      {
        name: "Tierra del Fuego",
        capital: "Ushuaia",
        population: "173,432",
        area: "21,263 km²",
        description: "Tierra del Fuego es la provincia más austral de Argentina, conocida por su belleza natural y paisajes únicos."
      },
      {
        name: "Río Negro",
        capital: "Viedma",
        population: "747,610",
        area: "203,013 km²",
        description: "Río Negro se encuentra en la Patagonia argentina, con una economía diversa y paisajes naturales impresionantes."
      },
     {
      name: "Santa Cruz",
      capital: "Río Gallegos",
      population: "374,756",
      area: "243,943 km²",
      description: "Santa Cruz es una provincia en la Patagonia argentina, con vastas extensiones de tierra y belleza natural impresionante."
    },
    // Continúa agregando más objetos para otras provincias
  ];

    localStorage.setItem("provincesData", JSON.stringify(provincesData));
  }

   // Agrega el código de los botones y la función displaySortedProvinces aquí
   sortByPopulationBtn.addEventListener("click", () => {
    const sortedByPopulation = provincesData.slice().sort((a, b) => {
      return parseInt(b.population.replace(/,/g, "")) - parseInt(a.population.replace(/,/g, ""));
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
    let sortedHTML = `<h2>Provincias Ordenadas por ${sortBy}</h2>`;
    sortedProvinces.forEach((province) => {
      sortedHTML += `
        <div class="sorted-province">
          <h3>${province.name}</h3>
          <p><strong>${sortBy}:</strong> ${sortBy === "Población" ? province.population : province.area}</p>
        </div>
      `;
    });
    sortedProvincesContainer.innerHTML = sortedHTML;
  }
  

  const flickrApiKey = "a26984b694e49602b82d26167508bd46";

  provinces.forEach((province) => {
    province.addEventListener("click", async () => {
      provinces.forEach((p) => p.classList.remove("active"));
      province.classList.add("active");

      const provinceName = province.getAttribute("id");
      const selectedProvince = getProvinceData(provinceName);

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
  
            // Mostrar la imagen en el elemento HTML deseado
            const imageElement = `<img src="${imageUrl}" alt="${selectedProvince.name}">`;
  
            // Crear un cuadro para mostrar la imagen y la información
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
                // Mostrar una notificación de SweetAlert
                Swal.fire({
                  icon: 'success',
                  title: `Has seleccionado la provincia de ${selectedProvince.name}`,
                  toast: true,
                  position: 'bottom-end',
                  showConfirmButton: false,
                  timer: 3000
                });
      } else {
        provinceInfo.textContent = "No hay información disponible.";
      }
    });
  });

  let isTableHidden = false;

// Agrega un evento de clic al botón "Eliminar tabla"
deleteTableBtn.addEventListener("click", () => {
  if (!isTableHidden) {
    sortedProvinces.style.display = "none"; // Oculta el cuadro
    deleteTableBtn.textContent = "Mostrar tabla"; // Cambia el texto del botón
    isTableHidden = true;
  } else {
    sortedProvinces.style.display = "block"; // Muestra el cuadro
    deleteTableBtn.textContent = "Eliminar tabla"; // Cambia el texto del botón
    isTableHidden = false;
  }
});

  function getProvinceData(provinceId) {
    const province = provincesData.find(p => p.name === provinceId);
    return province || null;
  }
});


