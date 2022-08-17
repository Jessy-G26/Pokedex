/* eslint-disable jsx-a11y/alt-text */
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { CircularProgress, Typography } from "@mui/material";
import { toFirstCharUppercase } from "../utils/constant";
import axios from "axios";
import ProgressBar from "react-bootstrap/ProgressBar";
import "bootstrap/dist/css/bootstrap.min.css";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Card from "react-bootstrap/Card";

const Pokemon = () => {
  const { pokemonId } = useParams();
  const [pokemon, setPokemon] = useState(undefined);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/pokemon/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      });
  }, [pokemonId]);

  useEffect(() => {
    axios
      .get(`https://pokeapi.co/api/v2/${pokemonId}/`)
      .then(function (response) {
        const { data } = response;
        setPokemon(data);
      });
  }, [pokemonId]);

  const generatePokemonJSX = () => {
    const { name, id, types, abilities, stats } = pokemon;
    const imageURL = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`;

    return (
      <>
        <Container style={{ marginTop: 100 }}>
          <Row>
            <Col xs={12} md={4}>
              <Card
                style={{
                  width: "300px",
                  backgroundImage:
                    "linear-gradient(to right, #4880EC, #019CAD)",
                }}
              >
                <img
                  style={{ width: "300px", height: "300px" }}
                  src={imageURL}
                />
              </Card>
            </Col>
            <Col xs={12} md={8}>
              <h2>Name: {`${toFirstCharUppercase(name)}`}</h2>

              <Typography variant="h5">Types:</Typography>
              {types.map((typeInfo) => {
                const { type } = typeInfo;
                const { name } = type;
                return <Typography key={name}>{`${name}`}</Typography>;
              })}
              <Typography variant="h5">Abilities: </Typography>
              {abilities.map((abilityInfo) => {
                const { ability } = abilityInfo;
                const { name } = ability;
                return <Typography key={name}>{`${name}`}</Typography>;
              })}
            </Col>

            <Col xs={12} md={6}>
              <Typography variant="h6" style={{ marginTop: 50 }}>
                Stats
              </Typography>
              {stats.map((stat, key) => (
                <Typography key={key}>
                  {stat.stat.name}
                  <ProgressBar
                    animated
                    now={stat.base_stat}
                    label={`${stat.base_stat}%`}
                  />
                </Typography>
              ))}
            </Col>
          </Row>
        </Container>
      </>
    );
  };
  return (
    <>
      {pokemon === undefined && <CircularProgress />}
      {pokemon !== undefined && pokemon && generatePokemonJSX()}
    </>
  );
};

export default Pokemon;
