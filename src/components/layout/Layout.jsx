import { useState, useMemo } from 'react';
import { Box, styled, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import Navbar from './Navbar';
import Sidebar from './Sidebar';

const LayoutRoot = styled(Box)(({ theme }) => ({
  display: 'flex',
  background: theme.palette.background.default,
  minHeight: '100vh',
}));

const MainContent = styled(Box)(({ theme, isSidebarOpen }) => ({
  flexGrow: 1,
  minHeight: '100vh',
  display: 'flex',
  flexDirection: 'column',
  transition: theme.transitions.create('margin', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: isSidebarOpen ? 260 : 70, // Ajusté selon la largeur du sidebar
  [theme.breakpoints.down('md')]: {
    marginLeft: 0,
  },
}));

const PageContent = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  marginTop: 64, // Hauteur du Navbar
  background: theme.palette.background.default,
  borderRadius: theme.spacing(2),
  [theme.breakpoints.down('sm')]: {
    padding: theme.spacing(2),
  },
}));

const Layout = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [mode, setMode] = useState('light');

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode,
          ...(mode === 'light'
            ? {
                primary: {
                  main: '#1976d2',
                },
                secondary: {
                  main: '#f50057',
                },
                background: {
                  default: '#f5f5f5',
                  paper: '#ffffff',
                },
              }
            : {
                primary: {
                  main: '#90caf9',
                },
                secondary: {
                  main: '#f48fb1',
                },
                background: {
                  default: '#121212',
                  paper: '#1e1e1e',
                },
              }),
        },
        shape: {
          borderRadius: 8,
        },
      }),
    [mode],
  );

  const handleSidebarToggle = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMobileSidebarToggle = () => {
    setIsMobileSidebarOpen(!isMobileSidebarOpen);
  };

  const handleThemeToggle = () => {
    setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <LayoutRoot>
        <Navbar 
          onSidebarToggle={handleSidebarToggle}
          onMobileSidebarToggle={handleMobileSidebarToggle}
          isSidebarOpen={isSidebarOpen}
          onThemeToggle={handleThemeToggle}
          isDarkMode={mode === 'dark'}
        />
        <Sidebar 
          isOpen={isSidebarOpen}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={() => setIsMobileSidebarOpen(false)}
          onToggle={handleSidebarToggle}
          activeSection={activeSection}
          onSectionChange={setActiveSection}
        />
        <MainContent isSidebarOpen={isSidebarOpen}>
          <PageContent>
            {children}
          </PageContent>
        </MainContent>
      </LayoutRoot>
    </ThemeProvider>
  );
};

export default Layout; 