import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import { CircularProgress, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { toFirstCharUppercase } from "../utils/constant";
import axios from "axios";

const Pokedex = () => {
  const navigate = useNavigate();
  const [pokemonData, setPokemonData] = useState({});

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon?limit=12`)
      .then(function (response) {
        const { data } = response;
        const { results } = data;
        const newPokemonData = {};
        results.forEach((pokemon, index) => {
          newPokemonData[index + 1] = {
            id: index + 1,
            name: pokemon.name,
            sprite: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${
              index + 1
            }.png`,
          };
        });
        setPokemonData(newPokemonData);
      }, []);
  });

  const getPokemonCard = (pokemonId) => {
    console.log(pokemonData[`${pokemonId}`]);
    const { id, name } = pokemonData[pokemonId];
    return (
      <Grid item xs={12} sm={4}>
        <Card
          style={{
            color: "white",
            backgroundImage: "linear-gradient(to right, #4880EC, #019CAD)",
          }}
          onClick={() => navigate(`${pokemonId}`)}
        >
          <CardContent style={{ textAlign: "center" }}>
            <Typography
              style={{ fontWeight: "bold" }}
            >{`${id}. ${toFirstCharUppercase(name)}`}</Typography>
          </CardContent>
        </Card>
      </Grid>
    );
  };
  return (
    <>
      {pokemonData ? (
        <Grid
          container
          spacing={10}
          paddingTop={10}
          paddingLeft={10}
          paddingRight={10}
        >
          {Object.keys(pokemonData).map((pokemonId) =>
            getPokemonCard(pokemonId)
          )}
        </Grid>
      ) : (
        <CircularProgress />
      )}
    </>
  );
};

export default Pokedex;
