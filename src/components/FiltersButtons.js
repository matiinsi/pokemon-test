import React from 'react'
import {
    Container,
    Button,
    Flex,
  } from "@chakra-ui/react";

export default function FiltersButtons({handleFilterPokemon}) {
  return (
    <Container maxW="container.lg" mt={10}>
        <Flex alignItems="center" flexWrap={"wrap"} justifyContent="center" gap={3}>
            <Button
                color={"white"}
                bgColor={"red.500"}
                _hover={{ bg: "red.600" }}
                onClick={() => handleFilterPokemon("all")}
            >All</Button>

            <Button
                color={"white"}
                bgColor={"red.500"}
                _hover={{ bg: "red.600" }}
                onClick={() => handleFilterPokemon("fire")}
            >Fire</Button>

            <Button
                color={"white"}
                bgColor={"blue.500"}
                _hover={{ bg: "blue.600" }}
                onClick={() => handleFilterPokemon("water")}
            >Water</Button>

            <Button
                color={"white"}
                bgColor={"green.500"}
                _hover={{ bg: "green.600" }}
                onClick={() => handleFilterPokemon("grass")}
            >Grass</Button>

            <Button
                color={"white"}
                bgColor={"green.200"}
                _hover={{ bg: "green.300" }}
                onClick={() => handleFilterPokemon("bug")}
            >Bug</Button>

            <Button
                color={"white"}
                bgColor={"blue.200"}
                _hover={{ bg: "bluee.300" }}
                onClick={() => handleFilterPokemon("normal")}
            >Normal</Button>

            <Button
                color={"white"}
                bgColor={"red.700"}
                _hover={{ bg: "red.800" }}
                onClick={() => handleFilterPokemon("fighting")}
            >Fighting</Button>
        </Flex>
    </Container>
  )
}
