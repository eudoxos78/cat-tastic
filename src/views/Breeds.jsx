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
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getBreeds } from "../api";
import { CatDrawer } from "../components/CatDrawer";

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
      <CatDrawer breed={selectedBreed} onClose={onClose} />

      <Stack m={10} alignItems="center" gap={10}>
        <Heading as="h1" size="lg">
          From around the world!
        </Heading>

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
