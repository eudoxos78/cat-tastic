import { useState } from "react";
import {
  Box,
  Button,
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

  const { mutate: unmarkFavourite } = useMutation({
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
        actions={[
          <Button
            colorScheme="red"
            onClick={() => {
              unmarkFavourite(selectedFavourite?.id);
            }}
          >
            Delete favorite
          </Button>,
        ]}
        onClose={onClose}
      />

      <Stack m={10} alignItems="center" gap={10}>
        <Box fontSize="3xl" fontWeight="bold" textAlign="center">
          Who’s the fairest of them all?
        </Box>

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
