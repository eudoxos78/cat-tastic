import { useState } from "react";
import {
  Box,
  Button,
  Heading,
  Image,
  SimpleGrid,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getFavourites, deleteFavouriteCat } from "../api";
import { CatModal } from "../components/CatModal";

export const Favourites = () => {
  const [selectedFavourite, setSelectedFavourite] = useState(null);

  const queryClient = useQueryClient();

  const toast = useToast();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["favourites"],
    queryFn: getFavourites,
  });

  const { mutate: unmarkFavourite, isPending: isUnmarkPending } = useMutation({
    mutationFn: deleteFavouriteCat,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["favourites"] });
      setSelectedFavourite(null);
      toast({
        title: "Cat removed from favorites!",
        variant: "subtle",
        isClosable: true,
      });
    },
  });

  const onClose = () => {
    setSelectedFavourite(null);
  };

  const actions = [
    <Button
      key="delete-favorite"
      colorScheme="red"
      order={3}
      isLoading={isUnmarkPending}
      onClick={() => {
        unmarkFavourite(selectedFavourite?.id);
      }}
    >
      Delete favorite
    </Button>,
  ];

  if (isPending) {
    return (
      <Box mt={10} fontSize="2xl" fontStyle="italic" textAlign="center">
        "Mirror, mirror on the wall..."
      </Box>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      <CatModal
        cat={selectedFavourite?.image}
        actions={actions}
        onClose={onClose}
      />

      <Stack m={10} alignItems="center" gap={10}>
        <Heading as="h1" size="lg">
          Who's the fairest of them all?
        </Heading>

        <SimpleGrid columns={{ base: 1, sm: 2, md: 3, lg: 4 }} spacing={10}>
          {data.map((favourite) => (
            <Image
              key={favourite.id}
              src={favourite.image.url}
              boxSize="300px"
              objectFit="cover"
              borderRadius="md"
              cursor="pointer"
              onClick={() => {
                setSelectedFavourite(favourite);
              }}
            />
          ))}
        </SimpleGrid>
      </Stack>
    </>
  );
};
