import {
  championsFuction,
  sortChampionsAlphabetically,
  filterChampionsByName,
  calculateCategoryPercentages
} from '../src/data.js';

import championsData from '../src/data/lol/lol.js';

// Descrevendo um bloco de testes para as funcionalidades relacionadas aos campeões do League of Legends
describe('League of Legends Champions', () => {

  // Obtendo os dados dos campeões em um array
  const testChampions = Object.values(championsData.data);

  // Bloco de testes para verificar se o array de campeões é um objeto
  describe("testChampions", () => {
    it("deve ser um objeto", () => {
      expect(typeof testChampions).toBe("object");
    });
  });

  // Bloco de testes para a função championsFuction
  describe('championsFuction', () => {
    // Teste para verificar se championsFuction é uma função
    it('deve ser uma função', () => {
      expect(typeof championsFuction).toBe("function");
    });

    // Teste para verificar se championsFuction filtra corretamente por tipo "Fighter"
    it('deve filtrar por tipo Fighter', () => {
      const result = championsFuction(testChampions, "Fighter");
      expect(result.length).toBe(66); 
    });
  });

  // Bloco de testes para a função sortChampionsAlphabetically
  describe('sortChampionsAlphabetically', () => {
    // Teste para verificar se sortChampionsAlphabetically é uma função
    it('deve ser uma função', () => {
      expect(typeof sortChampionsAlphabetically).toBe("function");
    });

    // Teste para verificar se sortChampionsAlphabetically ordena de A-Z corretamente
    it('deve ordenar de A-Z', () => {
      const result = sortChampionsAlphabetically(testChampions, "A/Z");
      expect(result[0].name).toBe("Aatrox");
    });

    // Teste para verificar se sortChampionsAlphabetically ordena de Z-A corretamente
    it('deve ordenar de Z-A', () => {
      const result = sortChampionsAlphabetically(testChampions, "Z/A");
      expect(result[0].name).toBe("Zyra");
    });
  });

  // Bloco de testes para a função filterChampionsByName
  describe('filterChampionsByName', () => {
    // Teste para verificar se filterChampionsByName é uma função
    it('deve ser uma função', () => {
      expect(typeof filterChampionsByName).toBe("function");
    });

    // Teste para verificar se filterChampionsByName filtra corretamente pelo nome "Aatrox"
    it('deve filtrar por nome "Aatrox"', () => {
      const result = filterChampionsByName(testChampions, "Aatrox");
      expect(result.length).toBe(1);
      expect(result[0].name).toBe("Aatrox");
    });
  });

  // Bloco de testes para a função calculateCategoryPercentages
  describe('calculateCategoryPercentages', () => {
    // Teste para verificar se calculateCategoryPercentages é uma função
    it('deve ser uma função', () => {
      expect(typeof calculateCategoryPercentages).toBe("function");
    });

    // Teste para verificar o cálculo de percentuais de categorias
    it('deve calcular percentual das categorias corretamente', () => {
      const champions = {
        "1": { name: "Champion A", tags: ["Fighter"] },
        "2": { name: "Champion B", tags: ["Mage", "Assassin"] },
        "3": { name: "Champion C", tags: ["Tank", "Fighter"] }
      };

      const result = calculateCategoryPercentages(champions);

      expect(result.Fighter).toBeCloseTo(66.67); // 2/3 * 100
      expect(result.Mage).toBeCloseTo(33.33); // 1/3 * 100
      expect(result.Assassin).toBeCloseTo(33.33); // 1/3 * 100
      expect(result.Tank).toBeCloseTo(33.33); // 1/3 * 100
    });
  });
});
