import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Kitten } from "./Kitten";

const getTitle = () => {
  const titles = ["Hola!", "Ta-dah!", "Surprise!", "Meow!", "Purrr!"];

  return titles[Math.floor(Math.random() * titles.length)];
};

export const CatModal = ({ cat, actions, onClose }) => (
  <Modal
    isOpen={Boolean(cat)}
    size="xl"
    scrollBehavior="inside"
    onClose={onClose}
  >
    <ModalOverlay />
    <ModalContent>
      <ModalHeader>{getTitle()}</ModalHeader>
      <ModalCloseButton />
      <ModalBody>{cat && <Kitten cat={cat} actions={actions} />}</ModalBody>
    </ModalContent>
  </Modal>
);
