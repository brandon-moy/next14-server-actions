// means that everything here will be run as a server action
"use server";

// one goal is to call the API and return data
export const fetchAnime = async (page: number) => {
  const response = await fetch(
    `https://shikimori.one/api/animes?page=${page}&limit=8&order=popularity`
  );

  const data = await response.json();

  return data;
};
