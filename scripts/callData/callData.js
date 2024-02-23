async function getPhotographers() {
    const response = await fetch("../../data/photographers.json");
    if (!response.ok) {
      throw new Error(
        "Erreur lors de la récupération des données des photographes"
      );
    }
    const data = await response.json();
    const photographers = data.photographers;
    const media = data.media ;
    return { photographers , media };
  }