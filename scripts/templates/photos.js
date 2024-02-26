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
    link.href = "#";
    link.setAttribute(
      "aria-label",
      `Ouvrir le média ${item.title} dans une modal`
    );
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
    const titleElement = document.createElement("h2");
    titleElement.textContent = item.title;
    const like = document.createElement("span");
    like.setAttribute("aria-label", "likes");
    like.textContent = item.likes + " \u2764";

    // Ajouter l'événement de clic pour incrémenter et décrémenter les likes
    like.addEventListener("click", () => {
      const totalLikesElement = document.querySelector(".likes_total");
      let totalLikes = parseInt(totalLikesElement.textContent);

      // Vérifier si le like n'a pas déjà été donné
      if (!like.classList.contains("liked")) {
        // Incrémenter les likes
        totalLikes++;
        item.likes++;
      } else {
        // Décrémenter les likes
        totalLikes--;
        item.likes--;
      }

      // Mettre à jour le contenu HTML avec le nouveau nombre de likes
      totalLikesElement.textContent = totalLikes + " \u2764";
      like.textContent = item.likes + " \u2764";

      // Basculer la classe "liked" pour indiquer si le like a été donné ou retiré
      like.classList.toggle("liked");
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
