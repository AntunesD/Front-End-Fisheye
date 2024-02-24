function displayModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "block";
}

function closeModal() {
  const modal = document.getElementById("contact_modal");
  modal.style.display = "none";
}

// Gestionnaire d'événement pour fermer la modal lorsque l'utilisateur clique à l'extérieur de celle-ci
window.addEventListener("click", function (event) {
  const modal = document.getElementById("contact_modal");
  if (event.target === modal) {
    closeModal();
  }
});

// Gestionnaire d'événement pour fermer la modal lorsque l'utilisateur appuie sur la touche "Escape"
window.addEventListener("keydown", function (event) {
  const modal = document.getElementById("contact_modal");
  if (event.key === "Escape") {
    closeModal();
  }
});


// Sélection du formulaire
const form = document.querySelector('#contact_modal form');

// Ajout du gestionnaire d'événements pour l'événement submit
form.addEventListener('submit', function(event) {
    event.preventDefault();

    // Récupération des valeurs des champs du formulaire
    const nom = form.nom.value;
    const prenom = form.prenom.value;
    const email = form.email.value;
    const message = form.message.value;

    // Affichage des valeurs dans la console
    console.log("Nom:", nom);
    console.log("Prénom:", prenom);
    console.log("Email:", email);
    console.log("Message:", message);
    
    closeModal()
});
