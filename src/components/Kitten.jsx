import { Link as ReactRouterLink, useLocation } from "react-router";
import {
  Button,
  Flex,
  Image,
  Link as ChakraLink,
  Spinner,
  Stack,
  Text,
  useClipboard,
} from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCat } from "../api";

const getBreedsDescription = (breeds) => {
  if (!breeds || breeds.length === 0) {
    return "";
  }

  let descr = `Hey! My breed is ${breeds[0].name}`;

  if (breeds.length > 1) {
    descr += `. But I also have ${breeds
      .slice(1)
      .map((breed) => breed.name)
      .join(", ")} inside me!`;
  }

  return descr;
};

export const Kitten = ({ cat, actions = [] }) => {
  const location = useLocation();

  const isEnabled = location.pathname !== "/breeds";

  const { hasCopied, onCopy } = useClipboard(
    `${window.location.origin}/images/${cat.id}`
  );

  const { data, isPending, isError } = useQuery({
    queryKey: ["cat", cat.id],
    queryFn: () => getCat(cat.id),
    enabled: isEnabled,
  });

  return (
    <>
      <Flex justifyContent="center">
        <Image src={cat.url} borderRadius="md" />
      </Flex>

      {isEnabled && isPending && (
        <Stack mt={6} align="center">
          <Spinner />
        </Stack>
      )}

      {isEnabled && !isPending && !isError && Boolean(data.breeds?.length) && (
        <Stack mt={6} spacing={3}>
          <Text>{getBreedsDescription(data.breeds)}</Text>

          <ChakraLink as={ReactRouterLink} to="/breeds" color="blue.400">
            Learn more about breeds
          </ChakraLink>
        </Stack>
      )}

      <Flex mt={6} mb={3} gap={3} justifyContent="flex-end">
        {[
          <Button
            key="details"
            as={ReactRouterLink}
            to={`/images/${cat.id}`}
            colorScheme="blue"
            order={2}
          >
            Details
          </Button>,
          <Button key="copy" colorScheme="blue" order={2} onClick={onCopy}>
            {hasCopied ? "Copied!" : "Copy"}
          </Button>,
          ...actions,
        ]}
      </Flex>
    </>
  );
};
