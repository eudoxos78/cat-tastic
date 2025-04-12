import { useState } from "react";
import {
  Box,
  Card,
  CardHeader,
  CardBody,
  Heading,
  SimpleGrid,
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../api";
import { Cats } from "./Cats";

export const Breeds = () => {
  const [selectedBreed, setSelectedBreed] = useState(null);

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["breeds"],
    queryFn: getBreeds,
  });

  const onClose = () => {
    setSelectedBreed(null);
  };

  if (isPending) {
    return (
      <Box mt={10} fontSize="2xl" fontStyle="italic" textAlign="center">
        "Breeeeeds..."
      </Box>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <Drawer isOpen={Boolean(selectedBreed)} onClose={onClose} size="sm">
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{selectedBreed?.name}</DrawerHeader>
          <DrawerBody>
            {selectedBreed && (
              <Stack spacing={3}>
                <Text fontSize="sm">{selectedBreed.description}</Text>

                <Cats columns={1} breedId={selectedBreed.id} />
              </Stack>
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>

      <Stack m={10} alignItems="center" gap={10}>
        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
          {data.map((breed) => (
            <Card
              key={breed.id}
              variant="outline"
              cursor="pointer"
              onClick={() => {
                setSelectedBreed(breed);
              }}
            >
              <CardHeader>
                <Heading size="md">{breed.name}</Heading>
              </CardHeader>

              <CardBody>
                <Stack spacing={3}>
                  <Text fontSize="sm">Temperament: {breed.temperament}</Text>
                  <Text fontSize="sm">Origin: {breed.origin}</Text>
                </Stack>
              </CardBody>
            </Card>
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
