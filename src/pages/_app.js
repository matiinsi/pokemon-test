import "@/styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import { PokemonProvider } from "@/context/PokemonProvider";

export default function App({ Component, pageProps }) {
  return (
    <PokemonProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </PokemonProvider>
  );
}
