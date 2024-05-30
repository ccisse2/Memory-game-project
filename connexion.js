document.getElementById('connexion').addEventListener('click', function(event){
    event.preventDefault()
    let utilisateur = document.getElementById('conexuserName');
    let motdepasse = document.getElementById('conexMdp');
    let erreurUsername = document.getElementById('invalideUtilisateur')
    let erreurMotdepasse = document.getElementById('invalideMotdepasse')
    //récuréparation des utilisateurs 
    const utilisateurs = JSON.parse(localStorage.getItem('utilisateurs')) || [];
    
    // Recherche de l'utilisateur par nom d'utilisateur
    const chercheUtilisateur = utilisateurs.find(user => user.username === utilisateur.value);
    const chercheMotdepasse = utilisateurs.find(user => user.password === motdepasse.value);

    if (chercheUtilisateur && chercheMotdepasse){
        erreurMotdepasse.innerText = ""
        erreurUsername.innerText = ""
        window.location.href ='profile.html'
    }else if (!chercheMotdepasse && !chercheUtilisateur ){
        erreurUsername.innerText = "Nom d'utilisateur incorrect";
        erreurMotdepasse.innerText = "mot de passe invalide";
    }else if(chercheMotdepasse && !chercheUtilisateur ){ 
                erreurUsername.innerText = "Nom d'utilisateur incorrect";
                erreurMotdepasse.innerText = "";
    }else if(!chercheMotdepasse && chercheUtilisateur) {
                erreurMotdepasse.innerText = "mot de passe invalide";
                erreurUsername.innerText = "";
            }
    
})
