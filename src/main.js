import data from './data/lol/lol.js';
import { championsFuction } from './data.js';

// Função para criar e exibir os cards dos campeões no DOM
function createChampionCards(champions) {
  const containerCard = document.querySelector('.container-card');
  containerCard.innerHTML = ''; // Limpa o contêiner antes de adicionar os novos cards

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

    //'flipper' do card
    card.addEventListener('click', () => {
      card.classList.toggle('flipped'); // Alternar a classe 'flipped' no card
    });

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

// Função para limpar o contêiner de cards
function clearContainer() {
  // Seleciona o elemento HTML com a classe 'container-card'
  const containerCard = document.querySelector('.container-card');
  // Define o conteúdo HTML do contêiner como vazio, removendo todos os elementos filhos
  containerCard.innerHTML = '';
}

// Atualiza a função para filtrar os campeões com base na categoria
function filterChampionCategory(category) {
  // Filtra os campeões usando a função funcaoDosCampeoes e a categoria fornecida
  const filteredChampions = championsFuction(data.data, category);
  // Limpa o contêiner de cards antes de adicionar os novos cards filtrados
  clearContainer();
  // Cria os cards para os campeões filtrados e adiciona ao contêiner
  createChampionCards({ data: filteredChampions });
}

// Adicione ouvintes de evento aos links de categoria
const categoryLinks = document.querySelectorAll('.category-button');
categoryLinks.forEach(link => {
  // Adiciona um ouvinte de clique para cada link de categoria
  link.addEventListener('click', function (event) {
    // Evita o comportamento padrão de redirecionamento
    event.preventDefault();
    // Obtém a categoria selecionada a partir do atributo 'data-categoria' do link
    const selectCategory = this.getAttribute('data-category');
    // Filtra e exibe os campeões correspondentes à categoria selecionada
    filterChampionCategory(selectCategory);

  });

});


// Seleciona o elemento do botão "Campeões"
const championsButton = document.querySelector('.nav-menu a');

// Adiciona um ouvinte de evento para o clique no botão "Campeões"
championsButton.addEventListener('click', () => {
  // Recarregua a página
  location.reload();
});

// Função para ordenar os campeões alfabeticamente
function sortChampionsAlphabetically(order) {
   // Obtém uma array com os valores (campeões) do objeto 'data'
  const sortedChampions = Object.values(data.data).sort((a, b) => {
    // Converte os nomes dos campeões para letras maiúsculas para uma comparação sem distinção entre maiúsculas e minúsculas
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (order === 'A/Z') {
       // Compara os nomes e retorna o resultado da comparação para a função 'sort'
      return nameA.localeCompare(nameB);// Ordena em ordem alfabética crescente
    } else if (order === 'Z/A') {
      // Compara os nomes de forma inversa e retorna o resultado da comparação para a função 'sort'
      return nameB.localeCompare(nameA);// Ordena em ordem alfabética decrescente
    }
  });

  clearContainer();
  createChampionCards({ data: sortedChampions });
}

// Adicione ouvintes de evento aos links de ordenação
const orderLinks = document.querySelectorAll('.order-button');
orderLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const sortOrder = this.getAttribute('data-order');
    sortChampionsAlphabetically(sortOrder);
  });
});

// Criação inicial dos cards de campeões
createChampionCards(data);