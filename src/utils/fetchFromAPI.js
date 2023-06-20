import axios from 'axios';

var options = {
  method: 'GET',
  url: process.env.REACT_APP_RAPID_API_URL,
  headers: {
    'x-rapidapi-host': process.env.REACT_APP_RAPID_API_HOST,
    'x-rapidapi-key': process.env.REACT_APP_RAPID_API_KEY,
  },
};

export const fetchFromAPI = async (params) => {
  options.params = { ...params };
  const response = await axios.request(options);

  if (response.status === 200) return response.data;
};
