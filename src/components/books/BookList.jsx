import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Grid, 
  Button, 
  TextField,
  IconButton,
  Chip,
  Card,
  CardMedia,
  CardContent,
  CardActions,
  Menu,
  MenuItem,
  Tooltip,
  Pagination,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Paper,
  Divider,
  Stack,
  FormControl,
  InputLabel,
  Select,
  Fade,
  Zoom,
  useTheme
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  QrCode as QrCodeIcon,
  Sort as SortIcon,
  MoreVert as MoreVertIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  BookmarkBorder as BookmarkIcon,
  Language as LanguageIcon,
  Category as CategoryIcon,
  CalendarToday as CalendarIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import useCrudAxios from '../../hooks/useCrudAxios';
import { useNavigate } from 'react-router-dom';
import BookForm from './BookForm';

// Composants stylisés
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  '&:hover': {
    transform: 'translateY(-8px)',
    boxShadow: '0 16px 70px -12px rgba(0,0,0,0.3)',
  },
  borderRadius: 16,
  overflow: 'hidden',
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(to bottom, #ffffff, #f9f9f9)' 
    : 'linear-gradient(to bottom, #2d2d2d, #1d1d1d)',
}));

const BookCover = styled(CardMedia)(({ theme }) => ({
  height: 240,
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '40%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  },
}));

const BookTitle = styled(Typography)(({ theme }) => ({
  fontWeight: 700,
  fontSize: '1.1rem',
  marginBottom: 4,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  WebkitLineClamp: 2,
  overflow: 'hidden',
  textOverflow: 'ellipsis',
  lineHeight: 1.2,
  height: '2.4em',
}));

const BookAuthor = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.secondary,
  marginBottom: 8,
  fontSize: '0.9rem',
  fontWeight: 500,
}));

const SearchBox = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  display: 'flex',
  alignItems: 'center',
  gap: theme.spacing(2),
  marginBottom: theme.spacing(3),
  borderRadius: 16,
  boxShadow: '0 6px 18px rgba(0,0,0,0.06)',
  background: alpha(theme.palette.background.paper, 0.8),
  backdropFilter: 'blur(10px)',
}));

const CategoryChip = styled(Chip)(({ theme }) => ({
  fontWeight: 500,
  borderRadius: 8,
  fontSize: '0.75rem',
  background: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  '&:hover': {
    background: alpha(theme.palette.primary.main, 0.2),
  },
}));

const BookPropertyChip = styled(Chip)(() => ({
  height: 28,
  fontSize: '0.7rem',
  borderRadius: 6,
}));

const StyledButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  textTransform: 'none',
  boxShadow: 'none',
  padding: theme.spacing(1, 2),
  fontWeight: 600,
  transition: 'all 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 10px rgba(0,0,0,0.1)',
  },
}));

const BookList = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('datePublication');
  const [page, setPage] = useState(1);
  const [openForm, setOpenForm] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedBookId, setSelectedBookId] = useState(null);
  
  const navigate = useNavigate();
  const theme = useTheme();
  const { 
    data: books, 
    loading, 
    error, 
    remove: deleteBook, 
    fetch: fetchBooks 
  } = useCrudAxios('/books/uadb');

  const ITEMS_PER_PAGE = 8;

  useEffect(() => {
    fetchBooks();
  }, [fetchBooks]);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
    setPage(1); // Revenir à la première page lors d'une recherche
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
    setPage(1);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };


  const handleEditBook = (book) => {
    setCurrentBook(book);
    setOpenForm(true);
    handleCloseMenu();
  };

  const handleDeleteBook = async (bookId) => {
    try {
      await deleteBook(bookId);
      showSnackbar('Livre supprimé avec succès', 'success');
      fetchBooks();
    } catch (error) {
      showSnackbar('Erreur lors de la suppression du livre', 'error');
    }
    handleCloseMenu();
  };

  const handleFormClose = (refreshData = false) => {
    setOpenForm(false);
    setCurrentBook(null);
    if (refreshData) {
      fetchBooks();
    }
  };

  const showSnackbar = (message, severity = 'success') => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  const handleMenuOpen = (event, bookId) => {
    setAnchorEl(event.currentTarget);
    setSelectedBookId(bookId);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
    setSelectedBookId(null);
  };

  const handleViewDetails = (bookId) => {
    navigate(`/books/${bookId}`);
    handleCloseMenu();
  };

  // Filtrage et tri
  const filteredBooks = books
    .filter((book) => {
      if (searchTerm) {
        const term = searchTerm.toLowerCase();
        return (
          book.titre.toLowerCase().includes(term) ||
          book.auteur.toLowerCase().includes(term) ||
          book.isbn.toLowerCase().includes(term) ||
          (book.description && book.description.toLowerCase().includes(term))
        );
      }
      return true;
    })
    .filter((book) => {
      if (filter === 'all') return true;
      if (filter === 'disponible') return book.disponible;
      if (filter === 'nonDisponible') return !book.disponible;
      if (filter === 'epub') return book.format === 'EPUB';
      if (filter === 'pdf') return book.format === 'PDF';
      if (filter === 'physique') return book.format === 'PHYSIQUE';
      return book.categorieId === filter;
    })
    .sort((a, b) => {
      if (sortBy === 'titre') return a.titre.localeCompare(b.titre);
      if (sortBy === 'auteur') return a.auteur.localeCompare(b.auteur);
      if (sortBy === 'datePublication') return new Date(b.datePublication) - new Date(a.datePublication);
      if (sortBy === 'notation') return b.notation_moyenne - a.notation_moyenne;
      if (sortBy === 'vues') return b.vues - a.vues;
      return 0;
    });

  // Pagination
  const totalPages = Math.ceil(filteredBooks.length / ITEMS_PER_PAGE);
  const paginatedBooks = filteredBooks.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    return new Date(dateString).toLocaleDateString('fr-FR', options);
  };

  return (
    <Box>
      

      <SearchBox elevation={0}>
        <TextField
          placeholder="Rechercher par titre, auteur, ISBN..."
          variant="outlined"
          fullWidth
          value={searchTerm}
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
          sx={{ 
            '& .MuiOutlinedInput-root': {
              borderRadius: 12,
            } 
          }}
        />

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Filtrer par</InputLabel>
          <Select
            value={filter}
            onChange={handleFilterChange}
            label="Filtrer par"
            sx={{ borderRadius: 12 }}
            size="medium"
            startAdornment={<FilterIcon color="action" sx={{ mr: 1 }} />}
          >
            <MenuItem value="all">Tous les livres</MenuItem>
            <Divider />
            <MenuItem value="disponible">Disponibles</MenuItem>
            <MenuItem value="nonDisponible">Non disponibles</MenuItem>
            <Divider />
            <MenuItem value="epub">Format EPUB</MenuItem>
            <MenuItem value="pdf">Format PDF</MenuItem>
            <MenuItem value="physique">Format Physique</MenuItem>
          </Select>
        </FormControl>

        <FormControl sx={{ minWidth: 150 }}>
          <InputLabel>Trier par</InputLabel>
          <Select
            value={sortBy}
            onChange={handleSortChange}
            label="Trier par"
            sx={{ borderRadius: 12 }}
            size="medium"
            startAdornment={<SortIcon color="action" sx={{ mr: 1 }} />}
          >
            <MenuItem value="datePublication">Date de publication</MenuItem>
            <MenuItem value="titre">Titre</MenuItem>
            <MenuItem value="auteur">Auteur</MenuItem>
            <MenuItem value="notation">Notation</MenuItem>
            <MenuItem value="vues">Popularité</MenuItem>
          </Select>
        </FormControl>
      </SearchBox>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Alert severity="error" sx={{ mb: 4 }}>
          {error}
        </Alert>
      ) : filteredBooks.length === 0 ? (
        <Paper 
          sx={{ 
            p: 4, 
            textAlign: 'center',
            borderRadius: 4,
            background: alpha(theme.palette.background.paper, 0.7),
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h6" color="text.secondary">
            Aucun livre ne correspond à votre recherche
          </Typography>
          <Button 
            startIcon={<RefreshIcon />} 
            variant="outlined" 
            sx={{ mt: 2 }}
            onClick={() => {
              setSearchTerm('');
              setFilter('all');
              setSortBy('datePublication');
            }}
          >
            Réinitialiser les filtres
          </Button>
        </Paper>
      ) : (
        <>
          <Grid container spacing={3}>
            {paginatedBooks.map((book, index) => (
              <Grid item xs={12} sm={6} md={4} lg={3} key={book.id}>
                <Zoom in={true} style={{ transitionDelay: `${index * 50}ms` }}>
                  <StyledCard>
                    <BookCover
                      component="div"
                      sx={{
                        position: 'relative',
                      }}
                    >
                      {book.image ? (
                        <img
                          src={book.image}
                          alt={book.titre}
                          style={{
                            width: '100%',
                            height: '100%',
                            objectFit: 'cover',
                          }}
                        />
                      ) : (
                        <Box
                          sx={{
                            width: '100%',
                            height: '100%',
                            bgcolor: 'rgba(0, 0, 0, 0.1)',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                          }}
                        >
                          <BookIcon sx={{ fontSize: 80, opacity: 0.3 }} />
                        </Box>
                      )}
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          left: 12,
                          zIndex: 1,
                          display: 'flex',
                          flexDirection: 'column',
                          gap: 0.5,
                        }}
                      >
                        <CategoryChip
                          label={book.categorie?.libelle || 'Non catégorisé'}
                          icon={<CategoryIcon fontSize="small" />}
                          size="small"
                        />
                        <BookPropertyChip
                          label={book.format}
                          size="small"
                          variant="filled"
                          color={book.format === 'PHYSIQUE' ? 'secondary' : 'primary'}
                        />
                      </Box>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          top: 12,
                          right: 12,
                          zIndex: 1,
                        }}
                      >
                        <IconButton
                          size="small"
                          sx={{ 
                            bgcolor: 'rgba(255, 255, 255, 0.1)', 
                            backdropFilter: 'blur(4px)',
                            '&:hover': {
                              bgcolor: 'rgba(255, 255, 255, 0.2)',
                            }
                          }}
                          onClick={(e) => handleMenuOpen(e, book.id)}
                        >
                          <MoreVertIcon fontSize="small" sx={{ color: 'white' }} />
                        </IconButton>
                      </Box>
                      
                      <Box
                        sx={{
                          position: 'absolute',
                          bottom: 10,
                          right: 12,
                          zIndex: 1,
                        }}
                      >
                        <Chip
                          label={book.disponible ? 'Disponible' : 'Indisponible'}
                          size="small"
                          color={book.disponible ? 'success' : 'error'}
                          sx={{ 
                            fontWeight: 'bold',
                            backdropFilter: 'blur(4px)',
                          }}
                        />
                      </Box>
                    </BookCover>
                    
                    <CardContent sx={{ flexGrow: 1, pb: 1 }}>
                      <BookTitle variant="h6">
                        {book.titre}
                      </BookTitle>
                      <BookAuthor variant="body2">
                        par {book.auteur}
                      </BookAuthor>
                      
                      <Stack direction="row" alignItems="center" spacing={1} mb={1}>
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          {book.notation_moyenne > 0 ? (
                            <>
                              <StarIcon color="warning" fontSize="small" />
                              <Typography variant="body2" ml={0.5}>
                                {book.notation_moyenne.toFixed(1)}
                              </Typography>
                            </>
                          ) : (
                            <>
                              <StarBorderIcon color="action" fontSize="small" />
                              <Typography variant="body2" color="text.secondary" ml={0.5}>
                                N/A
                              </Typography>
                            </>
                          )}
                        </Box>
                        
                        <Divider orientation="vertical" flexItem />
                        
                        <Box sx={{ display: 'flex', alignItems: 'center' }}>
                          <LanguageIcon color="action" fontSize="small" />
                          <Typography variant="body2" color="text.secondary" ml={0.5}>
                            {book.langue}
                          </Typography>
                        </Box>
                      </Stack>
                      
                      <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center' }}>
                        <CalendarIcon fontSize="inherit" sx={{ mr: 0.5 }} />
                        Publié le {formatDate(book.datePublication)}
                      </Typography>
                    </CardContent>
                    
                    <CardActions sx={{ px: 2, pb: 2 }}>
                      <Tooltip title="Voir détails">
                        <Button 
                          variant="outlined" 
                          size="small" 
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewDetails(book.id)}
                          sx={{ 
                            borderRadius: 8,
                            flexGrow: 1,
                            textTransform: 'none',
                          }}
                        >
                          Détails
                        </Button>
                      </Tooltip>
                      
                      <Tooltip title="Modifier">
                        <IconButton 
                          size="small" 
                          color="primary"
                          onClick={() => handleEditBook(book)}
                          sx={{ 
                            ml: 1,
                            borderRadius: 2,
                            border: '1px solid',
                            borderColor: 'divider',
                          }}
                        >
                          <EditIcon fontSize="small" />
                        </IconButton>
                      </Tooltip>
                    </CardActions>
                  </StyledCard>
                </Zoom>
              </Grid>
            ))}
          </Grid>

          {totalPages > 1 && (
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
              <Pagination
                count={totalPages}
                page={page}
                onChange={handlePageChange}
                color="primary"
                size="large"
                showFirstButton
                showLastButton
                shape="rounded"
                sx={{
                  '& .MuiPaginationItem-root': {
                    borderRadius: 2,
                  },
                }}
              />
            </Box>
          )}
        </>
      )}

      {/* Menu contextuel */}
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleCloseMenu}
        PaperProps={{
          sx: { 
            width: 200,
            borderRadius: 2,
            boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
            border: '1px solid',
            borderColor: 'divider',
            py: 0.5
          },
        }}
      >
        <MenuItem onClick={() => handleViewDetails(selectedBookId)} dense>
          <VisibilityIcon fontSize="small" sx={{ mr: 1.5 }} />
          Voir détails
        </MenuItem>
        <MenuItem 
          onClick={() => handleEditBook(books.find(book => book.id === selectedBookId))}
          dense
        >
          <EditIcon fontSize="small" sx={{ mr: 1.5 }} />
          Modifier
        </MenuItem>
        <MenuItem onClick={() => handleDeleteBook(selectedBookId)} dense sx={{ color: 'error.main' }}>
          <DeleteIcon fontSize="small" sx={{ mr: 1.5 }} />
          Supprimer
        </MenuItem>
      </Menu>

      {/* Formulaire d'ajout/modification */}
      <BookForm
        open={openForm}
        onClose={handleFormClose}
        book={currentBook}
      />

      {/* Snackbar pour les notifications */}
      <Snackbar
        open={openSnackbar}
        autoHideDuration={4000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} elevation={6} variant="filled">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookList; 