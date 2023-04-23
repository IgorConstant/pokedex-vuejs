<template>
  <div class="home">
    <div class="mx-auto px-8 mt-6 mb-6">
      <div class="grid grid-cols-6 gap-4">
        <div
          :class="['p-4', 'rounded', 'shadow-lg', 'cardBody']"
          :style="{ background: pokemon.typeColor }"
          v-for="pokemon in pokemons"
          :key="pokemon.id"
        >
          <img :class="['float-right']" :src="pokemon.imageUrl" :alt="pokemon.name" />
          <h2 :class="['cardheadertitle', 'uppercase']">{{ pokemon.name }}</h2>
          <p :class="['mt-4']">
            tipo: <span :class="['badge']">{{ pokemon.type }}</span>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  name: "HomeView",
  data() {
    return {
      pokemons: [],
      typeColors: {
        water: "#6390f0",
        fire: "#ee8130",
        grass: "#7ac74c",
        bug: "#a6b91a",
        electric: "#f7d02c",
        psychic: "#f95587",
        poison: "#6f35fc",
        flying: "#a98ff3",
        normal: "#a8a77a",
        ground: "#e2bf65",
        rock: "#b6a136",
        ghost: "#735797",
        dragon: "#1575ff",
        fairy: "#d685ad",
        fighting: "#c22e28",
        ice: "#96d9d6",
      },
    };
  },
  created() {
    this.getPokemons();
  },
  methods: {
    async getPokemons() {
      try {
        const response = await axios.get(
          "https://pokeapi.co/api/v2/pokemon?limit=150"
        );
        const pokemonsData = await Promise.all(
          response.data.results.map(async (pokemon) => {
            const pokemonDetail = await axios.get(pokemon.url);
            return {
              name: pokemonDetail.data.name,
              type: pokemonDetail.data.types.map((t) => t.type.name).join(", "),
              id: pokemonDetail.data.id,
              imageUrl: pokemonDetail.data.sprites.front_default,
              typeColor: this.typeColors[pokemonDetail.data.types[0].type.name],
            };
          })
        );
        this.pokemons = pokemonsData;
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>