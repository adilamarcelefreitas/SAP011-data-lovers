import { example } from './data.js';
import data from './data/lol/lol.js';
// import data from './data/pokemon/pokemon.js';
// import data from './data/rickandmorty/rickandmorty.js';
function redirectToPage() {
    const selectElement = document.querySelector(".categoria-select"); // Obtém o elemento <select>
    const selectedOption = selectElement.value; // Obtém o valor da opção selecionada
  
    if (selectedOption && selectedOption !== "categoria") {
      // Se a opção selecionada não for vazia e não for a opção "Categoria", redireciona para a página correspondente
      window.location.replace(selectedOption + "");
    }
  }
  
  
console.log(example, data);
