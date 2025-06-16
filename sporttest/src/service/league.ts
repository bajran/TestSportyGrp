import { fetchWithCache } from "../utils/fetchWithCache";

export const getAllLeagues = async () => {
  const response = await fetch(
    `https://www.thesportsdb.com/api/v1/json/3/all_leagues.php`
  );
  const data = await response.json();
  return data;
};

export const getSeasonBadges = async (id: string) => {
  const result = fetchWithCache(`season-${id}`, async () => {
    const response = await fetch(
      `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`
    );
    return await response.json();
  });
  return result;

  // const response = await fetch(
  //   `https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=${id}`
  // );
  // const data = await response.json();
  // return data;
};
