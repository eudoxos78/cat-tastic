import {
  Stack,
  Text,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from "@chakra-ui/react";
import { Cats } from "../views/Cats";

export const CatDrawer = ({ breed, onClose }) => (
  <Drawer isOpen={Boolean(breed)} onClose={onClose} size="sm">
    <DrawerOverlay />
    <DrawerContent>
      <DrawerCloseButton />
      <DrawerHeader>{breed?.name}</DrawerHeader>
      <DrawerBody>
        {breed && (
          <Stack spacing={3}>
            <Text fontSize="sm">{breed.description}</Text>

            <Cats columns={1} showCatBehaviour="inSitu" breedId={breed.id} />
          </Stack>
        )}
      </DrawerBody>
    </DrawerContent>
  </Drawer>
);
