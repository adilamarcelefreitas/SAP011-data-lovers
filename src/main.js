import data from './data/lol/lol.js';
import { funcaoDosCampeoes } from './data.js';

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

// Atualize a função para filtrar os campeões com base na categoria
function filtrarCampeoesPorCategoria(categoria) {
  // Filtra os campeões usando a função funcaoDosCampeoes e a categoria fornecida
  const campeoesFiltrados = funcaoDosCampeoes(data.data, categoria);
  // Limpa o contêiner de cards antes de adicionar os novos cards filtrados
  clearContainer();
  // Cria os cards para os campeões filtrados e adiciona ao contêiner
  createChampionCards({ data: campeoesFiltrados });
}

// Adicione ouvintes de evento aos links de categoria
const linksDeCategoria = document.querySelectorAll('.categoria-botao');
linksDeCategoria.forEach(link => {
  // Adiciona um ouvinte de clique para cada link de categoria
  link.addEventListener('click', function (event) {
    event.preventDefault(); // Evita o comportamento padrão de redirecionamento
    // Obtém a categoria selecionada a partir do atributo 'data-categoria' do link
    const categoriaSelecionada = this.getAttribute('data-categoria');
    // Filtra e exibe os campeões correspondentes à categoria selecionada
    filtrarCampeoesPorCategoria(categoriaSelecionada);
  });
});
createChampionCards(data);

// Selecione o elemento do botão "Campeões"
const campeoesButton = document.querySelector('.nav-menu a');

// Adicione um ouvinte de evento para o clique no botão "Campeões"
campeoesButton.addEventListener('click', () => {
  // Recarregue a página
  location.reload();
});
// Criação inicial dos cards de campeões
createChampionCards(data);
