/* eslint-disable no-unused-vars */
import { Box, Typography, Container } from '@mui/material';

const HomePage = () => {
  return (
    <Container maxWidth="xl">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          Bibliothèque Numérique
        </Typography>
        <Typography variant="body1">
          Bienvenue dans votre bibliothèque numérique.
        </Typography>
      </Box>
    </Container>
  );
};

export default HomePage; 