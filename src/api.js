const performCatApiRequest = (endpoint, options) => {
  const url = `${import.meta.env.VITE_CAT_API_BASE_URL}/${endpoint}`;
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

// The way that the nextPage is calculated is not correct because the number of the items in the
// last page might actually be equal to limit!. In reality though if a next page exists is usually
// determined by data provided by the API. In this case this info is not provided. The reason that we
// need to determine if a next page exists is to disable the "load more" button. If this is not done
// then when the last page is reached the button will still be enabled and pressing it will not
// return an empty array as expected but the last actual fetched page! This happens because of the
// caching that React Query does. If in real life an API would not provide this info then there are ways
// around it but they would be "suboptimal". In the context of this exercise it's ok to have this edge case bug
export const getCats = ({ page = 0, limit = 10, breedId = "" }) => {
  const endpoint = `images/search?limit=${limit}&page=${page}&include_breeds=0&include_categories=0&breed_ids=${breedId}`;

  return performCatApiRequest(endpoint).then((data) => ({
    data,
    nextPage: data.length === limit ? page + 1 : null,
  }));
};

export const getCat = (catId) => performCatApiRequest(`images/${catId}`);

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
