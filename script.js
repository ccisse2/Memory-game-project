document.addEventListener('DOMContentLoaded', function () {
  const pageConnexion = document.getElementById('pageConnexion');
  if (pageConnexion) {
    document
      .getElementById('connexion')
      .addEventListener('click', function (event) {
        event.preventDefault();
        let utilisateur = document.getElementById('conexuserName');
        let motdepasse = document.getElementById('conexMdp');
        let erreurUsername = document.getElementById('invalideUtilisateur');
        let erreurMotdepasse = document.getElementById('invalideMotdepasse');
        //récuréparation des utilisateurs
        const utilisateurs =
          JSON.parse(localStorage.getItem('utilisateurs')) || [];

        // Recherche de l'utilisateur par nom d'utilisateur
        const chercheUtilisateur = utilisateurs.find(
          (user) => user.username === utilisateur.value
        );
        const chercheMotdepasse = utilisateurs.find(
          (user) => user.password === motdepasse.value
        );

        if (chercheUtilisateur && chercheMotdepasse) {
          localStorage.setItem(
            'utilisateurConnecte',
            JSON.stringify(chercheUtilisateur)
          );
          erreurMotdepasse.innerText = '';
          erreurUsername.innerText = '';
          window.location.href = 'profile.html';
        } else if (!chercheMotdepasse && !chercheUtilisateur) {
          erreurUsername.innerText = "Nom d'utilisateur incorrect";
          erreurMotdepasse.innerText = 'mot de passe invalide';
        } else if (chercheMotdepasse && !chercheUtilisateur) {
          erreurUsername.innerText = "Nom d'utilisateur incorrect";
          erreurMotdepasse.innerText = '';
        } else if (!chercheMotdepasse && chercheUtilisateur) {
          erreurMotdepasse.innerText = 'mot de passe invalide';
          erreurUsername.innerText = '';
        }
      });
  }

  //----PAGE DE PROFIL------------------------------------------------------------------------------------------
  const ProfileUtilisateur = document.getElementById('ProfileUtilisateur');
  if (ProfileUtilisateur) {
    const utilisateurConnecte = JSON.parse(
      localStorage.getItem('utilisateurConnecte')
    );
    if (utilisateurConnecte) {
      document.getElementById('affichageProfilUtilisateur').innerText =
        utilisateurConnecte.username;
      document.getElementById('affichageEmailUtilisateur').innerText =
        utilisateurConnecte.email;
      let choixImg = document
        .getElementById('exempleChoix')
        .querySelector('img');
      let choixMemory = document.getElementById('choixMemory');

      //Changer l'image sellon le choix Memory---------------------------------------------------------------

      choixMemory.addEventListener('change', function () {
        if (choixMemory.value == 'animaux') {
          choixImg.src = './asset/animaux/memory_detail_animaux.png';
        } else if (choixMemory.value == 'animauxAnimes') {
          choixImg.src =
            './asset/animauxAnimes/memory_detail_animaux_animes.png';
        } else if (choixMemory.value == 'chiens') {
          choixImg.src = './asset/chiens/memory_details_chiens.png';
        } else if (choixMemory.value == 'dinosaures') {
          choixImg.src = './asset/dinosaures/memory_detail_dinosaures.png';
        }
      });
    }
    document
      .getElementById('enregistrerOption')
      .querySelector('button')
      .addEventListener('click', function () {
        utilisateurConnecte.choixMemory = choixMemory.value;
        localStorage.setItem(
          'utilisateurConnecte',
          JSON.stringify(utilisateurConnecte)
        );
        const utilisateurs =
          JSON.parse(localStorage.getItem('utilisateurs')) || [];
        const index = utilisateurs.findIndex(
          (user) => user.username === utilisateurConnecte.username
        );
        if (index !== -1) {
          utilisateurs[index] = utilisateurConnecte;
          localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
        }
        alert('Options enregistrées avec succès!');
        window.location.href = 'jouer.html';
      });
  } else {
    window.location.href = 'connexion.html';
  }
});
