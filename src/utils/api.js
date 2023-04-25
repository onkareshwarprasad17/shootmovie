import axios from 'axios';

const BASE_URL = 'https://api.themoviedb.org/3';
const TMDB_API_TOKEN =
  'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI3Njc1M2E5MmVjNTMzMWVlNTQ2ZDM4NWZiZDllYjAzMSIsInN1YiI6IjYzZTRkMzA2MGU1OTdiMDBjZDdiYWQ3YiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.ePwRTR_qKQKFdd-LY63Weiv3Pr-P5PAHyfoHGjCMn_U';

const headers = {
  Authorization: 'Bearer ' + TMDB_API_TOKEN,
};

export const fetchFromApi = async function (urlRoute, params) {
  try {
    const { data } = await axios.get(BASE_URL + urlRoute, {
      headers,
      body: params,
    });
    return data;
  } catch (error) {
    return error;
  }
};
