import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Books from './pages/Books';
import Book from './pages/Book';
import Layout from './components/Layout';

const App = () => {
  return (
    <>
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/books">
            <Route index element={<Books />} />
            <Route path=":id" element={<Book />} />
          </Route>
        </Route>
        <Route path="*" element={<h1>Not Found Page</h1>} />
      </Routes>
    </>
  );
};

export default App;
