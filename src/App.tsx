import { ThemeProvider } from './styles/ThemeProvider';
import { Calendar } from './components/Calendar/Calendar';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { TasksProvider } from './contexts/TasksContext';

const App = () => {
  return (
    <DndProvider backend={HTML5Backend}>
      <TasksProvider>
        <ThemeProvider>
          <Calendar />
        </ThemeProvider>
      </TasksProvider>
    </DndProvider>
  );
};

export default App;
