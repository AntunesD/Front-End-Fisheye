function displayPhotographerMedia(firstName, filteredMedia) {
    // Sélectionner la section où afficher les médias
    const photosSection = document.querySelector(".photos");
  
    // Créer et ajouter les éléments HTML pour chaque média dans la section
    filteredMedia.forEach((item) => {
      const mediaElement = document.createElement("article");
      mediaElement.classList.add("media");
  
      const link = document.createElement("a");
      const imageElement = document.createElement("img");
      imageElement.src = `../../assets/images/${firstName}/${item.image}`;
      imageElement.alt = item.title;
      link.appendChild(imageElement);
  
      const info = document.createElement("div");
      const titleElement = document.createElement("p");
      titleElement.textContent = item.title;
      const like = document.createElement("p");
      like.textContent = item.likes + ' \u2764';
  
      like.classList.add("likes")
      info.appendChild(titleElement);
      info.appendChild(like);
  
      // Ajouter les éléments à la section
      mediaElement.appendChild(link);
      mediaElement.appendChild(info);
      photosSection.appendChild(mediaElement);
    });
  }
  