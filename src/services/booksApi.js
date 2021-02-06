import axios from 'axios';

class BooksService {
  _baseURL = 'https://www.anapioficeandfire.com/api/';

  get = (url = '') => {
    return axios.get(`${this._baseURL}${url}`).then(res => res.data);
  };

  getBooks = () => {
    return this.get('books');
  };

  getMovieDetails = id => {
    return this.get(`books/${id}`);
  };

  getCharacters = url => {
    return axios.get(url).then(res => res.data);
  };
}

const bookService = new BooksService();

export default bookService;
