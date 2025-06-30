export const resolvers = {
  Query: {
    getCharacter: async (_: any, { id }: { id: string }) => {
      const characters = await fetchCharacters();
      return characters.find((c) => c.id === id) || null;
    },
    getCharacters: async (_: any, { ids }: { ids?: string[] }) => {
      const characters = await fetchCharacters();
      return ids ? characters.filter((c) => ids.includes(c.id)) : characters;
    },
  },
  Character: {
    house: async (parent: any) => {
      const characters = await fetchCharacters();
      const sameHouse = characters.filter((c) => c.house === parent.house);
      return {
        name: parent.house,
        characters: sameHouse,
      };
    },
  },
  House: {
    characters: async (parent: any) => {
      const characters = await fetchCharacters();
      return characters.filter((c) => c.house === parent.name);
    },
  },
};


const BASE_URL = "https://hp-api.onrender.com/api/characters";

export const fetchCharacters = async () => {
  const res = await fetch(BASE_URL);
  const data = await res.json();
  return data.map((char: any, index: number) => ({
    id: index.toString(),
    name: char.name,
    alternate_names: char.alternate_names,
    species: char.species,
    gender: char.gender,
    house: char.house,
  }));
};