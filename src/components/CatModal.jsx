import {
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import { Kitten } from "./Kitten";

export const CatModal = ({ cat, actions, onClose }) => (
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
      <ModalBody>{cat && <Kitten cat={cat} actions={actions} />}</ModalBody>
    </ModalContent>
  </Modal>
);
