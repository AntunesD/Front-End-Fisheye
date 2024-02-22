async function getPhotographers() {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données des photographes"
      );
    }
    const data = await response.json();
    const photographers = data.photographers;
    return { photographers };
  }
  
  async function displayData(photographers) {
    const photographersSection = document.querySelector(".photograph-header");
  
    photographers.forEach((photographer) => {
      const photographerModel = photographerTemplate(photographer, 'photographer' );
      const userCardDOM = photographerModel.getUserCardDOM();
      photographersSection.appendChild(userCardDOM);
    });
  }
  
  async function init() {
    // Récupère l'ID stocké dans le local storage
    const photographerId = localStorage.getItem('selectedPhotographerId');
  
    // Vérifie si l'ID existe
    if (!photographerId) {
      console.error("ID du photographe non trouvé dans le stockage local.");
      return;
    }
  
    // Récupère les datas des photographes
    const { photographers } = await getPhotographers();
  
    // Filtrer les photographes pour n'afficher que celui correspondant à l'ID
    const filteredPhotographers = photographers.filter(photographer => photographer.id === parseInt(photographerId));
  
    // Afficher les données filtrées
    displayData(filteredPhotographers);
  }
  
  init();
  