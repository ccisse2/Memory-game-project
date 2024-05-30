const images = document.querySelectorAll('img');
const start = document.getElementById('start');
let imagesRevealed = [];
let decompte = 0

// Tableau initial avec le maximum d'images
const allImagePaths = [
    './asset/animaux/1.webp', './asset/animaux/2.webp', './asset/animaux/3.webp', 
    './asset/animaux/4.webp', './asset/animaux/5.webp', './asset/animaux/6.webp', 
    './asset/animaux/7.webp', './asset/animaux/8.webp', './asset/animaux/9.webp', 
    './asset/animaux/10.webp', './asset/animaux/11.webp', './asset/animaux/12.webp'
];

// Fonction pour sélectionner aléatoirement  images du tableau initial
function getRandomImages(array, num) {
    let shuffled = array.slice(0); 
    let i = array.length; 
    let min = i - num; 
    let temp, index;
    while (i-- > min) {
        index = Math.floor((i + 1) * Math.random());
        temp = shuffled[index];
        shuffled[index] = shuffled[i];
        shuffled[i] = temp;
    }
    return shuffled.slice(min);
}

// Sélectionner 6 images aléatoirement et les dupliquer
const selectedImages = getRandomImages(allImagePaths, 6);
const gameImages = shuffle([...selectedImages, ...selectedImages]);

// Fonction de mélange
function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

// Assigner les images mélangées aux éléments <img>
images.forEach((img, index) => {
    img.dataset.src = gameImages[index]; // Stocke le chemin de l'image dans un attribut de données
});

// Fonction de gestion de l'événement mouseover
function handleMouseOver(event) {
    event.target.classList.add('hoverJeu'); // Ajoute une classe CSS pour l'effet visuel
}

// Fonction de gestion de l'événement mouseout
function handleMouseOut(event) {
    event.target.classList.remove('hoverJeu'); // Retire la classe CSS
}

// Fonction de gestion de l'événement click sur image
function manageMouseClick(event) {
    if (imagesRevealed.length < 2 && !event.target.classList.contains('afficheImage')) {
        event.target.classList.add('afficheImage'); // Ajoute une classe pour l'effet visuel
        event.target.src = event.target.dataset.src; // Change la source de l'image pour révéler l'image réelle
        imagesRevealed.push(event.target); // Ajoute l'image révélée au tableau

        // Si deux images sont révélées, vérifie si elles sont identiques
        if (imagesRevealed.length === 2) {
            setTimeout(checkImages, 1000); // Vérifie après une pause d'une seconde
        }
    }
}

// Fonction qui vérifie si deux images ont le même src
function checkImages() {
    if (imagesRevealed[0].dataset.src === imagesRevealed[1].dataset.src) {
        console.log("Vous avez 1 point"); // Les images correspondent
        imagesRevealed[0].classList.add('matched'); // Ajoute une classe pour indiquer que la paire est trouvée
        imagesRevealed[1].classList.add('matched'); // Ajoute une classe pour indiquer que la paire est trouvée
        checkWin(); // Vérifie si le joueur a gagné
    } 
    else {
        resetImages(); // Les images ne correspondent pas, les cacher à nouveau
        
    }
    imagesRevealed = []; // Réinitialise le tableau des images révélées
    let nombreDeCoup = document.getElementById('nombreDecoup')
        
        nombreDeCoup.innerText = decompte +1
        decompte++
}

// Fonction pour réinitialiser les images non correspondantes
function resetImages() {
    imagesRevealed.forEach(img => {
        img.classList.remove('afficheImage'); // Retire la classe CSS pour l'effet visuel
        img.src = './Document/Ressources_Projet/interogration.png'; // Réinitialise l'image à l'état caché
    });
}

// Ajouter des écouteurs d'événements aux images et au bouton "JOUER"
start.addEventListener('click', playJeu);

function playJeu(event) {
    event.target.classList.remove('play_the_game1');
    event.target.classList.add('play_the_game');

    images.forEach(img => {
        img.addEventListener('mouseover', handleMouseOver);
        img.addEventListener('mouseout', handleMouseOut);
        img.addEventListener('click', manageMouseClick);
    });
}

function checkWin() {
    const matchedImages = document.querySelectorAll('.matched');
    if (matchedImages.length === images.length) {
        alert("Vous avez gagné !"); // Affiche un message de victoire
    }
}

const keypress = document.getElementById("keypress")

keypress.addEventListener('keypress', (e) =>{
    if (e.key== ' '){
        initializeGame()
    }
})

function initializeGame() {
    // Sélectionner 6 images aléatoirement et les dupliquer
    const selectedImages = getRandomImages(allImagePaths, 6);
    const gameImages = shuffle([...selectedImages, ...selectedImages]); // Duplique et mélange les images

    // Réinitialiser les images et les classes
    images.forEach((img, index) => {
        img.dataset.src = gameImages[index]; // Stocke le chemin de l'image dans un attribut de données
        img.src = './Document/Ressources_Projet/interogration.png'; // Chemin de l'image cachée
        img.classList.remove('afficheImage', 'matched', 'hoverJeu'); // Réinitialiser les classes
    });

    // Réinitialiser les variables de jeu
    imagesRevealed = [];
}