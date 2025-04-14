import { Link, Outlet } from "react-router";
import { Button, Flex } from "@chakra-ui/react";

export const Layout = () => (
  <>
    <Flex
      p={6}
      gap={6}
      bgColor="orange.100"
      borderBottom="solid 1px"
      borderBottomColor="orange.500"
      boxShadow="lg"
    >
      <Button as={Link} to="/" colorScheme="orange">
        Cats
      </Button>
      <Button as={Link} to="/breeds" colorScheme="orange">
        Breeds
      </Button>
      <Button as={Link} to="/favorites" colorScheme="orange">
        Favorites
      </Button>
    </Flex>
    <Outlet />
  </>
);
