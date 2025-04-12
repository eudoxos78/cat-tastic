const performCatApiRequest = (path, options) => {
  const catApiBaseUrl = "https://api.thecatapi.com/v1";
  const url = `${catApiBaseUrl}/${path}`;
  const headers = {
    "Content-Type": "application/json",
    "x-api-key": import.meta.env.VITE_CAT_API_KEY,
  };
  const requestOptions = {
    ...options,
    headers: {
      ...headers,
      ...options?.headers,
    },
  };

  return fetch(url, requestOptions).then((res) => res.json());
};

export const getCats = (page = 0, limit = 10) => {
  const path = `images/search?limit=${limit}&page=${page}`;

  return performCatApiRequest(path).then((data) => ({
    data,
    nextPage: page + 1,
  }));
};

export const getBreeds = () => performCatApiRequest("breeds");

export const getFavourites = () => performCatApiRequest("favourites");

export const postFavouriteCat = (catId) => {
  const options = {
    method: "POST",
    body: JSON.stringify({
      image_id: catId,
    }),
  };

  return performCatApiRequest("favourites", options);
};

export const deleteFavouriteCat = (favouriteId) => {
  const options = {
    method: "DELETE",
  };

  return performCatApiRequest(`favourites/${favouriteId}`, options);
};
