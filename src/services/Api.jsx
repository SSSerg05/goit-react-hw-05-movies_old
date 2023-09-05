import axios from "axios";
import PropTypes from 'prop-types';

// Класс + ключ
const API_KEY = '347a4b587b74ee2a22d09434547acda6';
const URL = 'https://api.themoviedb.org/3';

const params = {
  api_key: API_KEY,
  page: 1,
  query: '',
}

export const fetchData = async (strQuery, page) => { 
  const query = `${URL}`;
  const responce = await axios.get(query, {params});

  return responce.data;
}

fetchData.propTypes = {
  strQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};