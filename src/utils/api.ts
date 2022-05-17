import axios from "axios";

export const api = axios.create({
  baseURL: 'https://imdb-api.com/en/API'
})
