import React, {useState, useEffect} from 'react'
import Swal from 'sweetalert2'
import axios from 'axios';
import CardCatched from './CardCatched';
import usePokemon from '@/hooks/usePokemon';
import { 
    Container, 
    Flex, 
    Box, 
    Badge, 
    Modal,
    ModalOverlay,
    ModalHeader,
    ModalBody,
    ModalContent,
    ModalCloseButton, 
    useDisclosure,
} from '@chakra-ui/react'
import NextImage from "next/image";
import styles from '@/styles/Header.module.css';

export default function Header() {

    const pokemonCatchedsDataModal = useDisclosure();
    const {catched, setCatched} = usePokemon();

    const [isScrolled, setIsScrolled] = useState(false);

    const handleViewCatcheds = () => {
        pokemonCatchedsDataModal.onOpen();
    }

    const deletePokemon = async (id) => {
        try {
            const response = await axios.delete(`/api/catched/${id}`);
            if (response?.status === 200) {
                setCatched((prev) => prev.filter((item) => item.id !== id));
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleDeletePokemon = (id) => {
        Swal.fire({
            title: '¿Estas seguro?',
            text: "No podras revertir esto!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si!',
        }).then((result) => {
            if (result.isConfirmed) {
                deletePokemon(id);
                Swal.fire(
                    'Borrado!',
                    'Tu pokemon ha sido liberado.',
                    'success'
                )
            }
        })
    }

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 50) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    return (
        <>
            <Container maxW={"100%"} height={"50px"} boxShadow='lg' className={isScrolled ? styles.scrolledHeader : ''}>
                <Flex justifyContent={"center"} alignItems={"center"} height={"50px"}>
                    <Box 
                        position="relative" 
                        display="inline-block"
                        cursor={"pointer"}
                        onClick={() => handleViewCatcheds()}
                    >
                        <NextImage
                            src="/images/pokebola.png"
                            alt="My Image"
                            width={30}
                            height={30}
                        />
                        <Badge
                            position="absolute"
                            top="0"
                            right="0"
                            transform="translate(25%, -25%)"
                            bg="red.500"
                            color="white"
                            borderRadius="full"
                            display="flex"
                            alignItems="center"
                            justifyContent="center"
                        >
                            {(catched) ? catched.length : 0}
                        </Badge>
                    </Box>
                </Flex>
            </Container>

            <Modal {...pokemonCatchedsDataModal}  zIndex={1}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader textTransform="capitalize">
                        Pokemon atrapados
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody>
                        {catched.map((pokemon) => (
                            <CardCatched key={pokemon.id} pokemon={pokemon} handleDeletePokemon={handleDeletePokemon} />
                        ))}
                    </ModalBody>
                </ModalContent>
            </Modal>
        </>
    )
}
