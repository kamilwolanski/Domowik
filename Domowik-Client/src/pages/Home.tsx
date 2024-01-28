import { useQuery } from 'react-query';
import { getFamilies } from '../Api/api';
// import { useState } from 'react';

const Home = () => {
  //   const [newTodo, setNewTodo] = useState('');
  //   const queryClient = useQueryClient();

  const { isLoading, isError, error, data } = useQuery('families', getFamilies);
  console.log('isLoading', isLoading);
  console.log('isError', isError);
  console.log('error', error);
  console.log('data', data);
  return isLoading ? <p>loading</p> : <h1>home</h1>;
};

export default Home;
