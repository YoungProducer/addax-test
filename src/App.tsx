import { ThemeProvider } from './styles/ThemeProvider';
import { Calendar } from './components/Calendar/Calendar';

const App = () => {
  return (
    <ThemeProvider>
      <Calendar />
    </ThemeProvider>
  );
};

export default App;
