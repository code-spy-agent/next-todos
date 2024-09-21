import type { NextPage } from 'next';
import TodoList from '../components/todolist';

const Home: NextPage = () => {
  return (
    <div>
      <TodoList />
    </div>
  );
};

export default Home;
