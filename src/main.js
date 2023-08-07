import data from './data/lol/lol.js';

// Função para criar e exibir os cards dos campeões no DOM
function createChampionCards(champions) {
    const containerCard = document.querySelector('.container-card');
    for (const championKey in champions.data) {
        const champion = champions.data[championKey];
        
        // Crie um card para o campeão
        const card = document.createElement('div');
        card.classList.add('champion-card');

        // Parte frontal do card
        const cardFront = document.createElement('div');
        cardFront.classList.add('card-front');

        // Crie uma imagem para a parte frontal do card
        const img = document.createElement('img');
        img.src = champion.img; // Usando o link da imagem fornecido no objeto 'champion'
        img.alt = champion.name;

        // Crie um elemento de nome para a parte frontal do card
        const name = document.createElement('h3');
        name.textContent = champion.name;

        // Anexe a imagem e o nome à parte frontal do card
        cardFront.appendChild(img);
        cardFront.appendChild(name);

        // Parte de trás do card (informações)
        const cardBack = document.createElement('div');
        cardBack.classList.add('card-back');

        // Crie elementos para as informações de defesa, magia, dificuldade e ataque
        const defense = document.createElement('p');
        defense.textContent = `Defesa: ${champion.info.defense}`;
        
        const magic = document.createElement('p');
        magic.textContent = `Magia: ${champion.info.magic}`;
        
        const difficulty = document.createElement('p');
        difficulty.textContent = `Dificuldade: ${champion.info.difficulty}`;
        
        const attack = document.createElement('p');
        attack.textContent = `Ataque: ${champion.info.attack}`;
        
        // Anexe as informações à parte de trás do card
        cardBack.appendChild(defense);
        cardBack.appendChild(magic);
        cardBack.appendChild(difficulty);
        cardBack.appendChild(attack);

        // Anexe as partes frontal e traseira do card ao card do campeão
        card.appendChild(cardFront);
        card.appendChild(cardBack);

        // Anexe o card do campeão ao container de cards
        containerCard.appendChild(card);
    }
}

// Chama a função para criar e exibir os cards dos campeões no DOM
createChampionCards(data);
