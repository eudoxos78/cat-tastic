import { useParams } from "react-router";
import { Flex, Image, Spinner } from "@chakra-ui/react";
import { useQuery } from "@tanstack/react-query";
import { getCat } from "../api";

export const Cat = () => {
  const { catId } = useParams();

  const { data, error, isPending, isError } = useQuery({
    queryKey: ["cat", catId],
    queryFn: () => getCat(catId),
  });

  return (
    <Flex m={10} justifyContent="center">
      {isPending && <Spinner />}

      {isError && <span>Error: {error.message}</span>}

      {!isPending && !isError && <Image src={data.url} borderRadius="md" />}
    </Flex>
  );
};
