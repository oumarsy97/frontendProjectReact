import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import {
  Container,
  Grid,
  Typography,
  Paper,
  Rating,
  Button,
  Box,
  Chip,
  Divider,
  Skeleton,
} from '@mui/material';
import {
  Bookmark,
  Share,
  Download,
  Comment,
} from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2';

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simuler le chargement des données
    setTimeout(() => {
      setBook({
        id,
        title: "Le titre du livre",
        author: "Nom de l'auteur",
        description: "Description détaillée du livre...",
        coverUrl: "https://via.placeholder.com/400x600",
        rating: 4.5,
        ratingCount: 128,
        category: "Roman",
        publishDate: "2024",
        pages: 320,
        language: "Français",
      });
      setLoading(false);
    }, 1000);
  }, [id]);

  if (loading) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4 }}>
        <Grid2 container spacing={4}>
          <Grid2 item xs={12} md={4}>
            <Skeleton variant="rectangular" height={600} />
          </Grid2>
          <Grid2 item xs={12} md={8}>
            <Skeleton variant="text" height={60} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="text" height={30} />
            <Skeleton variant="rectangular" height={200} />
          </Grid2>
        </Grid2>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <img
              src={book.coverUrl}
              alt={book.title}
              style={{ width: '100%', height: 'auto' }}
            />
            <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
              <Button variant="contained" startIcon={<Bookmark />} fullWidth>
                Ajouter
              </Button>
              <Button variant="outlined" startIcon={<Share />}>
                Partager
              </Button>
            </Box>
          </Paper>
        </Grid2>

        <Grid2 xs={12} md={8}>
          <Typography variant="h4" gutterBottom>
            {book.title}
          </Typography>
          <Typography variant="h6" color="text.secondary" gutterBottom>
            {book.author}
          </Typography>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 2 }}>
            <Rating value={book.rating} precision={0.5} readOnly />
            <Typography variant="body2" color="text.secondary">
              ({book.ratingCount} avis)
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Chip label={book.category} sx={{ mr: 1 }} />
            <Chip label={`${book.pages} pages`} sx={{ mr: 1 }} />
            <Chip label={book.language} />
          </Box>

          <Divider sx={{ my: 3 }} />

          <Typography variant="h6" gutterBottom>
            Description
          </Typography>
          <Typography variant="body1" paragraph>
            {book.description}
          </Typography>

          <Box sx={{ mt: 4 }}>
            <Button
              variant="contained"
              startIcon={<Download />}
              sx={{ mr: 2 }}
            >
              Télécharger
            </Button>
            <Button
              variant="outlined"
              startIcon={<Comment />}
            >
              Commenter
            </Button>
          </Box>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default BookDetailsPage; 