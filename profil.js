let choixImg = document.getElementById('exempleChoix').querySelector('img')
let choixMemory = document.getElementById('choixMemory')

//Changer l'image sellon le choix Memory

choixMemory.addEventListener('change', function(){
    if(choixMemory.value == 'animaux'){
        choixImg.src = './asset/animaux/memory_detail_animaux.png'
    }else if(choixMemory.value == 'animauxAnimes'){
        choixImg.src = './asset/animauxAnimes/memory_detail_animaux_animes.png'
    }else if(choixMemory.value == 'Chiens'){
        choixImg.src = './asset/chiens/memory_details_chiens.png'
    }else if(choixMemory.value == 'dinosaures'){
        choixImg.src = './asset/dinosaures/memory_detail_dinosaures.png'
    }else if(choixMemory.value == 'memoryLegume'){
        choixImg.src = './asset/memory-legume/memory_detail.png'
    }else if(choixMemory.value == 'alphabetScrable'){
        choixImg.src = './asset/alphabet-scrabble/memory_detail_scrabble.png'
    }
})