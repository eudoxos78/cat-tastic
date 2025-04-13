import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Image,
  SimpleGrid,
  SlideFade,
  Stack,
  useToast,
} from "@chakra-ui/react";
import { useInfiniteQuery, useMutation } from "@tanstack/react-query";
import { getCats, postFavouriteCat } from "../api";
import { CatModal } from "../components/CatModal";
import { Kitten } from "../components/Kitten";

export const Cats = ({
  columns,
  header,
  showCatBehaviour = "modal",
  breedId,
}) => {
  const [selectedCat, setSelectedCat] = useState(null);

  const toast = useToast();

  const {
    data,
    error,
    hasNextPage,
    fetchNextPage,
    isPending,
    isError,
    isFetchingNextPage,
  } = useInfiniteQuery({
    queryKey: ["cats", breedId],
    queryFn: ({ pageParam }) => getCats({ page: pageParam, breedId }),
    initialPageParam: 0,
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });

  const { mutate: markFavourite } = useMutation({
    mutationFn: postFavouriteCat,
    onSuccess: () => {
      toast({
        title: "Cat added to favorites!",
        variant: "subtle",
        isClosable: true,
      });
    },
  });

  const onClose = () => {
    setSelectedCat(null);
  };

  const actions = [
    <Button
      colorScheme="green"
      onClick={() => {
        markFavourite(selectedCat?.id);
      }}
    >
      Add to favorites
    </Button>,
  ];

  if (isPending) {
    return (
      <Box mt={10} fontSize="2xl" fontStyle="italic" textAlign="center">
        "They are coming..."
      </Box>
    );
  }

  if (isError) {
    return <span>Error: {error.message}</span>;
  }

  return (
    <>
      {showCatBehaviour === "modal" && (
        <CatModal cat={selectedCat} actions={actions} onClose={onClose} />
      )}

      {showCatBehaviour === "inSitu" && (
        <SlideFade
          in={Boolean(selectedCat)}
          offsetY="20px"
          transition={{ exit: { duration: 0 } }}
        >
          {Boolean(selectedCat) && (
            <Kitten
              cat={selectedCat}
              actions={[
                <Button mr="auto" onClick={onClose}>
                  Cancel
                </Button>,
                ...actions,
              ]}
            />
          )}
        </SlideFade>
      )}

      <Collapse
        in={
          showCatBehaviour === "modal" ||
          (showCatBehaviour === "inSitu" && !selectedCat)
        }
        transition={{
          exit: { duration: 0 },
          enter: { duration: 0 },
        }}
      >
        <Stack m={10} alignItems="center" gap={10}>
          {header && (
            <Box fontSize="3xl" fontWeight="bold" textAlign="center">
              {header}
            </Box>
          )}

          <SimpleGrid
            columns={columns || { base: 1, sm: 2, md: 3, lg: 4 }}
            spacing={10}
          >
            {data.pages.map((page, i) => (
              <Fragment key={i}>
                {page.data.map((cat) => (
                  <Image
                    key={cat.id}
                    src={cat.url}
                    boxSize="300px"
                    objectFit="cover"
                    borderRadius="md"
                    cursor="pointer"
                    onClick={() => {
                      setSelectedCat(cat);
                    }}
                  />
                ))}
              </Fragment>
            ))}
          </SimpleGrid>

          <Button
            colorScheme="orange"
            size="md"
            isLoading={isFetchingNextPage}
            isDisabled={!hasNextPage}
            onClick={fetchNextPage}
          >
            Load more
          </Button>
        </Stack>
      </Collapse>
    </>
  );
};
