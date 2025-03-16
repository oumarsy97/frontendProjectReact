import { useState } from 'react';
import {
  Container,
  Grid,
  Typography,
  Tabs,
  Tab,
  Box,
  Paper,
} from '@mui/material';
import BookCard from '../components/books/BookCard';
import Grid2 from '@mui/material/Unstable_Grid2';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          {children}
        </Box>
      )}
    </div>
  );
}

const MyLibraryPage = () => {
  const [value, setValue] = useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  // Données simulées
  const myBooks = [
    {
      id: 1,
      title: "Le Petit Prince",
      author: "Antoine de Saint-Exupéry",
      coverUrl: "https://via.placeholder.com/150",
      rating: 4.5,
      ratingCount: 150,
      category: "Fiction"
    },
    // Ajoutez plus de livres ici
  ];

  const favorites = [
    {
      id: 2,
      title: "1984",
      author: "George Orwell",
      coverUrl: "https://via.placeholder.com/150",
      rating: 4.8,
      ratingCount: 200,
      category: "Science-Fiction"
    },
    // Ajoutez plus de favoris ici
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Ma Bibliothèque
      </Typography>

      <Paper sx={{ width: '100%', mb: 4 }}>
        <Tabs
          value={value}
          onChange={handleChange}
          indicatorColor="primary"
          textColor="primary"
          centered
        >
          <Tab label="Mes Livres" />
          <Tab label="Favoris" />
          <Tab label="En cours de lecture" />
          <Tab label="Terminés" />
        </Tabs>
      </Paper>

      <TabPanel value={value} index={0}>
        <Grid2 container spacing={2}>
          {myBooks.map((book) => (
            <Grid2 xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard book={book} />
            </Grid2>
          ))}
        </Grid2>
      </TabPanel>

      <TabPanel value={value} index={1}>
        <Grid2 container spacing={2}>
          {favorites.map((book) => (
            <Grid2 xs={12} sm={6} md={4} lg={3} key={book.id}>
              <BookCard book={book} />
            </Grid2>
          ))}
        </Grid2>
      </TabPanel>

      <TabPanel value={value} index={2}>
        <Typography variant="body1" color="text.secondary" align="center">
          Aucun livre en cours de lecture
        </Typography>
      </TabPanel>

      <TabPanel value={value} index={3}>
        <Typography variant="body1" color="text.secondary" align="center">
          Aucun livre terminé
        </Typography>
      </TabPanel>
    </Container>
  );
};

export default MyLibraryPage; 