import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Box,
  IconButton,
  Rating,
  Chip,
  CardActionArea,
  Grid
} from '@mui/material';
import { Favorite, FavoriteBorder, BookmarkAdd } from '@mui/icons-material';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const BookCard = ({ book }) => {
  const navigate = useNavigate();
  const [isFavorite, setIsFavorite] = useState(false);

  return (
    <Card 
      sx={{ 
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        transition: 'transform 0.2s',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: (theme) => theme.shadows[4],
        }
      }}
    >
      <CardActionArea onClick={() => navigate(`/book/${book.id}`)}>
        <CardMedia
          component="img"
          height="200"
          image={book.coverUrl}
          alt={book.title}
          sx={{ objectFit: 'cover' }}
        />
        <CardContent sx={{ flexGrow: 1 }}>
          <Typography gutterBottom variant="h6" component="div" noWrap>
            {book.title}
          </Typography>
          <Typography variant="body2" color="text.secondary" noWrap>
            {book.author}
          </Typography>
          <Box sx={{ mt: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
            <Rating value={book.rating} readOnly size="small" />
            <Typography variant="body2" color="text.secondary">
              ({book.ratingCount})
            </Typography>
          </Box>
          <Box sx={{ mt: 1 }}>
            <Chip 
              label={book.category} 
              size="small" 
              sx={{ mr: 1 }} 
            />
          </Box>
        </CardContent>
      </CardActionArea>
      <Box 
        sx={{ 
          position: 'absolute',
          top: 8,
          right: 8,
          display: 'flex',
          gap: 1,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          borderRadius: '12px',
          padding: '4px',
        }}
      >
        <IconButton 
          size="small"
          onClick={() => setIsFavorite(!isFavorite)}
        >
          {isFavorite ? <Favorite color="error" /> : <FavoriteBorder />}
        </IconButton>
        <IconButton size="small">
          <BookmarkAdd />
        </IconButton>
      </Box>
    </Card>
  );
};

export default BookCard; 