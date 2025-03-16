// src/App.jsx
import { BrowserRouter as Router } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { theme } from './theme';
import Layout from './components/layout/Layout';
import AppRoutes from './routes/AppRoutes';
import { TokenProvider } from './context/TokenContext';

function App() {
  return (
    <TokenProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Router>
          <Layout>
            <AppRoutes />
          </Layout>
        </Router>
      </ThemeProvider>
    </TokenProvider>
  );
}

export default App;
