import { Fragment, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  Heading,
  Image,
  SimpleGrid,
  SlideFade,
  Spinner,
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
  loadingText,
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

  const { mutate: markFavourite, isPending: isMarkPending } = useMutation({
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
      key="add-to-favorites"
      colorScheme="green"
      order={3}
      isLoading={isMarkPending}
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
        {loadingText || <Spinner />}
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
                <Button key="cancel" mr="auto" order={1} onClick={onClose}>
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
            <Heading as="h1" size="lg">
              {header}
            </Heading>
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
            colorScheme="blue"
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
