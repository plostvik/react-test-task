import { Redirect } from 'react-router-dom';
import booksPage from './pages/booksPage';
import booksDetailsPages from './pages/bookDetailsPage';

const routesPath = {
  HOME: '/',
  BOOKS: '/books',
  BOOK_DETAILS: '/books/:bookId',
  BOOK_CHARACTERS: '/books/:bookId/characters',
};

const routes = [
  {
    path: routesPath.HOME,
    exact: true,
    component: () => <Redirect to={routesPath.BOOKS} />,
  },
  {
    path: routesPath.BOOKS,
    exact: true,
    component: booksPage,
  },
  {
    path: routesPath.BOOK_DETAILS,
    exact: false,
    component: booksDetailsPages,
  },
];

export default routes;
