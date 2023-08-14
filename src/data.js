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


