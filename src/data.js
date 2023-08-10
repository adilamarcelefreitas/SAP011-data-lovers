// Função para filtrar os campeões com base na categoria
export const championsFuction = (dados, tipo) => {
  const campeoesArray = Object.values(dados); // Transforma o objeto de campeões em um array
  return campeoesArray.filter(campeao => campeao.tags.includes(tipo));

};