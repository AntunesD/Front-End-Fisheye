function displayPhotographerMedia(firstName, filteredMedia) {
  // Sélectionner la section où afficher les médias
  const photosSection = document.querySelector(".photos");

  // Effacer le contenu précédent de la section
  photosSection.innerHTML = "";
  // Créer et ajouter les éléments HTML pour chaque média dans la section
  filteredMedia.forEach((item) => {
    const mediaElement = document.createElement("article");
    mediaElement.classList.add("media");

    // Créer le lien pour afficher la modal
    const link = document.createElement("a");
    link.addEventListener("click", () => {
      displayModalPhoto(
        filteredMedia,
        firstName,
        item.image ? item.image : item.video,
        item.title
      );
    });

    const imageElement = document.createElement(item.image ? "img" : "video");
    imageElement.src = `../../assets/images/${firstName}/${
      item.image ? item.image : item.video
    }`;
    imageElement.alt = item.title;
    link.appendChild(imageElement);

    const info = document.createElement("div");
    const titleElement = document.createElement("p");
    titleElement.textContent = item.title;
    const like = document.createElement("p");
    like.textContent = item.likes + " \u2764";

    // Ajouter l'événement de clic pour incrémenter les likes
    like.addEventListener("click", () => {
      const totalLikesElement = document.querySelector(".likes_total");
      let totalLikes = parseInt(totalLikesElement.textContent);

      // Vérifier si le like n'a pas déjà été donné
      if (!like.classList.contains("liked")) {
        totalLikes++;
        totalLikesElement.textContent = totalLikes + " \u2764";
        item.likes++;
        like.textContent = item.likes + " \u2764";

        // Ajouter la classe "liked" pour indiquer que le like a été donné
        like.classList.add("liked");
      }
    });

    like.classList.add("likes");
    info.appendChild(titleElement);
    info.appendChild(like);

    // Ajouter les éléments à la section
    mediaElement.appendChild(link);
    mediaElement.appendChild(info);
    photosSection.appendChild(mediaElement);
  });
}
