import { useState } from "react";
import {
  Box,
  AspectRatio,
  Image,
  Stack,
  Progress,
  Text,
  Badge,
  HStack,
  Checkbox,
} from "@chakra-ui/react";
import axios from "axios";
import { getHpPokemon, getAttackPokemon } from "@/helpers/PokemonHelper";
import usePokemon from "@/hooks/usePokemon";
import { toast } from "react-toastify";

export default function PokemonData({ pokemon }) {

  const {setCatched, catched} = usePokemon();
  const [error, setError] = useState(null);

  const {height, weight, types, moves, stats} = pokemon;

  const handleCatched = async (pokemon) => {
    try {
      const response = await axios.post("/api/catched", pokemon);
      if (response?.status === 200) {
        toast.success("Pokemon atrapado", {
          position: "top-right",
        });
        setCatched((prev) => [...prev, response.data]);
        setError(null);
      }
    } catch (error) {
      toast.error(error.response?.data || "Error al atrapar el pokemon", {
        position: "top-right",
      });
      setError(error.response?.data);
    }
  };

  return (
    <Stack spacing="5" pb="5">
      <Stack spacing="5" position="relative">
        <Box position="absolute" right="0" zIndex="99">
          <Checkbox
            onChange={() => handleCatched(pokemon)}
            isChecked={catched.some((item) => item.id === pokemon.id)}
          >Catched</Checkbox>
        </Box>
        <AspectRatio w="full" ratio={1}>
          <Image
            objectFit="contain"
            src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/home/${pokemon.id}.png`}
          />
        </AspectRatio>
        <Stack direction="row" spacing="5">
          <Stack>
            <Text fontSize="sm">Weight</Text>
            <Text>{weight}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Height</Text>
            <Text>{height}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Movimientos</Text>
            <Text>{moves.length}</Text>
          </Stack>
          <Stack>
            <Text fontSize="sm">Tipos</Text>
            <HStack>
              {types.map((type) => (
                <Badge key={`${type.type.name}-${type.type.key}`}>{type.type.name}</Badge>
              ))}
            </HStack>
          </Stack>
        </Stack>
      </Stack>

      <Stack spacing="5" p="5" bg="gray.100" borderRadius="xl">
        <Stack>
          <Text fontSize="xs">hp</Text>
          <Progress bg="gray.300" borderRadius="full" value={getHpPokemon(stats)} />
        </Stack>
        <Stack>
          <Text fontSize="xs">attack</Text>
          <Progress bg="gray.300" borderRadius="full" value={getAttackPokemon(stats)} />
        </Stack>
      </Stack>
    </Stack>
  );
}
