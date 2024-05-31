let utilisateur = document.getElementById('userName');
let motdepasse = document.getElementById('mdp');
let email = document.getElementById('email');
let confirmMdp = document.getElementById('confirmmdp');

function username() {
  let usernameValide = false;
  let username = utilisateur.value;
  if (username.length >= 3) {
    usernameValide = true;
  }
  return usernameValide;
}

function checkEmail() {
  let verifEmail = email.value;
  // Vérifier la validité de l'email
  const validEmail = /[^@ \t\r\n]+@[^@ \t\r\n]+\.[^@ \t\r\n]+/.test(verifEmail);
  return validEmail;
}

function checkMotdepasse() {
  let checkMdp = motdepasse.value;
  const validMpdp =
    /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/.test(
      checkMdp
    );
  return validMpdp;
}

function confirmMotdepasse() {
  let identical = false;
  if (confirmMdp.value === motdepasse.value) {
    identical = true;
  }
  return identical;
}

document.getElementById('valider').addEventListener('click', function (event) {
  event.preventDefault();

  const isUsernameValid = username();
  const isEmailValid = checkEmail();
  const isPasswordValid = checkMotdepasse();
  const isPasswordConfirmed = confirmMotdepasse();

  if (
    isUsernameValid &&
    isEmailValid &&
    isPasswordValid &&
    isPasswordConfirmed
  ) {
    // Création de l'objet utilisateur

    // Récupération des utilisateurs existants du local storage
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];

    // Recherche de l'utilisateur par nom d'utilisateur
    const chercheUtilisateur = utilisateurs.find(
      (check) => check.username === utilisateur.value
    );

    if (chercheUtilisateur) {
      document.getElementById('confirmation').style.color = 'red';
      document.getElementById('confirmation').innerText =
        "Le Nom d'utilisateur existe déja. Connecter vous ou changez de nom";
    } else {
      const nouvelUtilisateur = {
        username: utilisateur.value,

        email: email.value,

        password: motdepasse.value,
      };
      // Ajout du nouvel utilisateur au tableau
      utilisateurs.push(nouvelUtilisateur);

      //stockage du tableau dans le local storage
      localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));

      document.getElementById('confirmation').innerText =
        'Votre inscription est valider. Vous pouvez vous Connecter';

      // Rediriger vers la page de connexion après 2 secondes
      setTimeout(function () {
        window.location.href = 'connexion.html';
      }, 3000); // 1 secondes
    }
  } else {
    if (!isUsernameValid) alert("Le nom d'utilisateur n'est pas valide.");

    if (!isEmailValid) alert("L'email n'est pas valide.");

    if (!isPasswordValid) alert("Le mot de passe n'est pas valide.");

    if (!isPasswordConfirmed)
      alert('La confirmation du mot de passe ne correspond pas.');
  }
});

document.getElementById('mdp').addEventListener('input', function () {
  let password = this.value;
  let strength = getPasswordStrength(password);
  let strengthBar = document.getElementById('forceMotdepasse');
  strengthBar.innerHTML =
    '<div style="width: ' +
    strength +
    '%; background-color: ' +
    getStrengthColor(strength) +
    ';"></div>';
});

function getPasswordStrength(password) {
  var strength = 0;
  if (password.length >= 6) strength += 25;
  if (/[A-Z]/.test(password)) strength += 25;
  if (/[a-z]/.test(password)) strength += 25;
  if (/[0-9]/.test(password)) strength += 15;
  if (/[\W]/.test(password)) strength += 10;
  return strength;
}

function getStrengthColor(strength) {
  if (strength <= 25) return 'red';
  if (strength <= 50) return 'orange';
  if (strength <= 75) return 'yellow';
  return 'green';
}
