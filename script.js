const searchInput = document.getElementById("search-input");
const searchBtn = document.getElementById("search-button");
const pokemonName = document.getElementById("pokemon-name");
const pokemonId = document.getElementById("pokemon-id");
const weight = document.getElementById("weight");
const height = document.getElementById("height");
const types = document.getElementById("types");
const hp = document.getElementById("hp");
const attack = document.getElementById("attack");
const defense = document.getElementById("defense");
const specialAtk = document.getElementById("special-attack");
const specialDef = document.getElementById("special-defense");
const speed = document.getElementById("speed");
//const pokeImg = document.getElementById("sprite");
const spriteDiv = document.getElementById("spritediv");

const pokeApi = "https://pokeapi-proxy.freecodecamp.rocks/api/pokemon";

const displayData = (found) => {
  pokemonName.innerHTML = found.name.toUpperCase();
  pokemonId.innerHTML = "#" + found.id;
  weight.innerHTML = found.weight;
  height.innerHTML = found.height;

  types.innerHTML = '';

  for(let i = 0; i < found.types.length; i++) {
    //types.innerHTML += `${(found.types[i].type.name).toUpperCase()} `;

    //(found.types[i].type.name).toUpperCase();

    types.innerHTML += `<div class="type ${found.types[i].type.name}">${(found.types[i].type.name).toUpperCase()}</div>`;

  }

  hp.innerHTML = found.stats[0].base_stat;
  attack.innerHTML = found.stats[1].base_stat;
  defense.innerHTML = found.stats[2].base_stat;
  specialAtk.innerHTML = found.stats[3].base_stat;
  specialDef.innerHTML = found.stats[4].base_stat;
  speed.innerHTML = found.stats[5].base_stat;

  //set image

  //pokeImg.setAttribute("src", found.sprites.front_default);

  spriteDiv.innerHTML = `
  <img id="sprite" src="${found.sprites.front_default}"/>
  `
  
}

const fetchPokeData = async (found) => {
  try {
    const res = await fetch(found.url);
    const data = await res.json();
    
    //console.log(data);
    displayData(data);

  } catch (err) {
    console.log(err);
  }
};

const findPokemon = (name,data) => {

  const dataArr = data.results;

  const found = dataArr.find((element) => {
    if(element.name === name) {
      return true;
    }
    else if(element.id === Number(name)) {
      return true;
    }
    return false;
  });

  if(found) {
    //console.log(found);
    fetchPokeData(found)
  }
  else {
    alert("Pokémon not found");
  }

}

const fetchData = async (name) => {
  try {
    const res = await fetch(pokeApi);
    const data = await res.json();
    //console.log(data);
    findPokemon(name,data);
  } catch (err) {
    console.log(err);
  }
};

const handleSearchBtn = () => {
  let name = searchInput.value;

  name = name.toLowerCase();
  name = name.split(" ").join("-");

  fetchData(name);
}

searchBtn.addEventListener("click", handleSearchBtn);