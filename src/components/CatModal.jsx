import { Link as ReactRouterLink } from "react-router";
import {
  Flex,
  Image,
  Link as ChakraLink,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
} from "@chakra-ui/react";

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

export const CatModal = ({ cat, actions = [], onClose }) => (
  <Modal
    isOpen={Boolean(cat)}
    size="xl"
    scrollBehavior="inside"
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>Hola!</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        {cat && (
          <>
            <Flex justifyContent="center">
              <Image src={cat.url} borderRadius="md" />
            </Flex>

            {Boolean(cat.breeds?.length) && (
              <Stack mt={6} spacing={3}>
                <Text>{getBreedsDescription(cat.breeds)}</Text>

                <ChakraLink as={ReactRouterLink} to="/breeds" color="blue.400">
                  Learn more about breeds
                </ChakraLink>
              </Stack>
            )}

            {Boolean(actions.length) && (
              <Flex mt={6} mb={3} gap={3} justifyContent="flex-end">
                {actions}
              </Flex>
            )}
          </>
        )}
      </ModalBody>
    </ModalContent>
  </Modal>
);
