import data from './data/lol/lol.js';
import { championsFuction, sortChampionsAlphabetically, calculateCategoryPercentages } from './data.js';
import { filterChampionsByName } from './data.js';




// Função de exibir os cards dos campeões 
function createChampionCards(champions) {
  const containerCard = document.querySelector('.container-card');
  containerCard.innerHTML = ''; // Limpa o contêiner antes de adicionar os novos cards

  for (const championKey in champions.data) {
    const champion = champions.data[championKey];

    // Cria um card para o campeão
    const card = document.createElement('div');
    card.classList.add('champion-card');

    // Parte frontal do card
    const cardFront = document.createElement('div');
    cardFront.classList.add('card-front');

    // Cria uma imagem para a parte frontal do card
    const img = document.createElement('img');
    img.src = champion.img; // Usando o link da imagem fornecido no objeto 'champion'
    img.alt = champion.name;

    // Cria um elemento de nome para a parte frontal do card
    const name = document.createElement('h3');
    name.textContent = champion.name;

    // Anexa a imagem e o nome à parte frontal do card
    cardFront.appendChild(img);
    cardFront.appendChild(name);

    // Parte de trás do card 
    const cardBack = document.createElement('div');
    cardBack.classList.add('card-back');

    // Cria elementos para as informações de defesa, magia, dificuldade e ataque
    const defense = document.createElement('p');
    defense.textContent = `Defesa: ${champion.info.defense}`;

    const magic = document.createElement('p');
    magic.textContent = `Magia: ${champion.info.magic}`;

    const difficulty = document.createElement('p');
    difficulty.textContent = `Dificuldade: ${champion.info.difficulty}`;

    const attack = document.createElement('p');
    attack.textContent = `Ataque: ${champion.info.attack}`;

    // Cálculo do percentual da categoria (você pode ajustar o índice [0] conforme necessário)
    const categoryPercentageElement = document.createElement('p');
    // categoryPercentageElement.textContent = `Percentual: ${categoryPercentage.toFixed(2)}%`;

    // Anexa as informações à parte de trás do card
    cardBack.appendChild(defense);
    cardBack.appendChild(magic);
    cardBack.appendChild(difficulty);
    cardBack.appendChild(attack);
    cardBack.appendChild(categoryPercentageElement); // Inclui o percentual da categoria

    //flipper do card - rotação
    card.addEventListener('click', () => {
      card.classList.toggle('flipped'); // Alternar a classe 'flipped' no card
    });

    // Anexa as partes frontal e traseira do card ao card do campeão
    card.appendChild(cardFront);
    card.appendChild(cardBack);

    // Anexa o card do campeão ao container de cards
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

// Obtém a referência para a barra de pesquisa
const searchInput = document.querySelector('#search-input');

// Atualiza a função para filtrar os campeões com base no nome
function filterChampionsByNameInput(searchText) {
  const filteredChampions = filterChampionsByName(data.data, searchText);
  clearContainer();
  createChampionCards({ data: filteredChampions });
}

// Adiciona um ouvinte de evento à barra de pesquisa
searchInput.addEventListener('input', event => {
  const searchText = event.target.value;
  filterChampionsByNameInput(searchText);
});

// Criação inicial dos cards de campeões
createChampionCards(data);
// Seleciona os elementos do HTML

// Atualiza a função para filtrar os campeões com base na categoria
function filterChampionCategory(category) {
  // Filtra os campeões usando a função funcaoDosCampeoes e a categoria fornecida
  const filteredChampions = championsFuction(data.data, category);
  // Limpa o contêiner de cards antes de adicionar os novos cards filtrados
  clearContainer();
  // Cria os cards para os campeões filtrados e adiciona ao contêiner
  createChampionCards({ data: filteredChampions });
}


// Obtém a referência para a seta
const scrollToTopButton = document.querySelector('.scroll-to-top');

// Define uma função para mostrar ou ocultar a seta
function toggleScrollToTopButton(show) {
  scrollToTopButton.style.display = show ? 'block' : 'none';
}

// Adiciona um ouvinte de evento ao fazer a rolagem da página
window.addEventListener('scroll', () => {
  const thirdRowOffset = window.innerHeight * 2; // Altura da terceira fileira

  if (window.scrollY >= thirdRowOffset) {
    toggleScrollToTopButton(true); // Mostra a seta quando rolar até a terceira fileira
  } else {
    toggleScrollToTopButton(false); // Oculta a seta caso contrário
  }
});

// Adiciona um ouvinte de evento para clicar na seta
scrollToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' }); // Role suavemente de volta ao topo
});

// Adiciona ouvintes de evento aos links de categoria
const categoryLinks = document.querySelectorAll('.category-button');
categoryLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const selectCategory = this.getAttribute('data-category');

    // Filtra e exibe os campeões correspondentes à categoria selecionada
    filterChampionCategory(selectCategory);

    // Calcula o percentual da categoria selecionada
    const categoryPercentages = calculateCategoryPercentages(data.data);
    const categoryPercentage = categoryPercentages[selectCategory];

    // Atualiza o elemento HTML para exibir o percentual
    const categoryPercentageElement = document.querySelector('.percentualCategories h2');
    categoryPercentageElement.textContent = `Percentual da categoria ${selectCategory}: ${categoryPercentage.toFixed(2)}%`;
  });
});

// Adiciona ouvintes de evento aos links de ordenação de A-Z/Z-A
const orderLinks = document.querySelectorAll('.order-button');
orderLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const sortOrder = this.getAttribute('data-order');

    // Chama a função de ordenação importada e passa o objeto data e a ordem
    const sortedChampions = sortChampionsAlphabetically(data.data, sortOrder);

    // Limpa o contêiner de cards antes de adicionar os novos cards ordenados
    clearContainer();
    // Cria os cards para os campeões ordenados e adiciona ao contêiner
    createChampionCards({ data: sortedChampions });
  });
});


// Adiciona ouvintes de evento aos links de filtragem alfabética das acategorias
const alphabeticalFilterLinks = document.querySelectorAll('.alphabetical-filter');
alphabeticalFilterLinks.forEach(link => {
  link.addEventListener('click', function (event) {
    event.preventDefault();
    const selectedCategory = this.getAttribute('data-category');
    const sortOrder = this.getAttribute('data-order');

    // Filtra os campeões com base na categoria selecionada
    const filteredChampions = championsFuction(data.data, selectedCategory);

    // Ordena os campeões filtrados alfabeticamente
    const sortedChampions = sortChampionsAlphabetically(filteredChampions, sortOrder);

    // Limpa o contêiner de cards antes de adicionar os novos cards
    clearContainer();

    // Cria os cards para os campeões filtrados e ordenados e adiciona ao contêiner
    createChampionCards({ data: sortedChampions });
  });
});


// Selecione o elemento do botão "Campeões"
const campeoesButton = document.querySelector('.nav-menu a');

// Adicione um ouvinte de evento para o clique no botão "Campeões"
campeoesButton.addEventListener('click', () => {
  // Recarregue a página
  location.reload();
});

// Criação inicial dos cards de campeões
createChampionCards(data);
