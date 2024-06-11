const getHpPokemon = (stats) => {
    return stats.find((stat) => stat.stat.name === "hp").base_stat;
};

const getAttackPokemon = (stats) => {
    return stats.find((stat) => stat.stat.name === "attack").base_stat;
};

export { getHpPokemon, getAttackPokemon };