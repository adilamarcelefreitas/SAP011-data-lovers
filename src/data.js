// Função para filtrar os campeões com base na categoria
export const championsFuction = (dados, tipo) => {
  const campeoesArray = Object.values(dados); // Transforma o objeto de campeões em um array
  return campeoesArray.filter(campeao => campeao.tags.includes(tipo));

};

// Função para ordenar os campeões alfabeticamente
export const sortChampionsAlphabetically = (champions, order) => {
  const sortedChampions = Object.values(champions).sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (order === 'A/Z') {
      return nameA.localeCompare(nameB);
    } else if (order === 'Z/A') {
      return nameB.localeCompare(nameA);
    }
  });

  return sortedChampions;
}

// Função que calcula o percentual de campeões por categoria
export const calculateCategoryPercentages = (champions) => {
  const categoryCounts = {}; // Objeto para contar quantos campeões em cada categoria
  const totalChampions = Object.values(champions).length; // Total de campeões

  // Loop pelos campeões para contar suas categorias
  for (const champion of Object.values(champions)) {
    // Loop pelas categorias do campeão
    for (const category of champion.tags) {
      // Incrementa a contagem da categoria ou define como 1 se for a primeira vez
      categoryCounts[category] = (categoryCounts[category] || 0) + 1;
    }
  }

  const categoryPercentages = {}; // Objeto para armazenar os percentuais

  // Calcula o percentual de campeões em cada categoria
  for (const category in categoryCounts) {
    // Calcula o percentual e armazena no objeto categoryPercentages
    categoryPercentages[category] = (categoryCounts[category] / totalChampions) * 100;
  }

  return categoryPercentages; // Retorna o objeto com os percentuais de cada categoria
};


// Função para filtrar campeões por nome
export const filterChampionsByName = (champions, searchText) => {
  searchText = searchText.trim().toLowerCase();
  return Object.values(champions).filter(campeao =>
    campeao.name.toLowerCase().includes(searchText)
  );
};
