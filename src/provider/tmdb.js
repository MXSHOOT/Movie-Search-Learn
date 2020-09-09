import axios from "axios";

const BASE_URL = "https://api.themoviedb.org/3";
const API_KEY = "f8cd18dc03233511a461510072fefb43";

const getFullURL = (endpoint, keyword, pages) => {
  return keyword && pages
    ? `${BASE_URL}${endpoint}?api_key=${API_KEY}&query=${keyword}&page=${pages}`
    : `${BASE_URL}${endpoint}?api_key=${API_KEY}`;
};

const fetchData = async (url) => {
  return axios.get(url).then((res) => res);
};
export default {
  list: async (endpoint, keyword, pages) => {
    const url = getFullURL(endpoint, keyword, pages);
    const { data } = await fetchData(url);
    return data;
  },
};
