/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  Card, 
  CardContent, 
  Grid, 
  Button, 
  TextField, 
  IconButton, 
  Chip, 
  Dialog, 
  DialogTitle, 
  DialogContent, 
  DialogActions,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Tooltip,
  Avatar,
  Divider,
  Paper,
  InputAdornment,
  CircularProgress,
  Alert,
  Snackbar,
  Badge,
  Pagination
} from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
import { 
  Add as AddIcon, 
  Edit as EditIcon, 
  Delete as DeleteIcon, 
  Search as SearchIcon,
  FilterList as FilterIcon,
  Visibility as VisibilityIcon,
  CloudUpload as UploadIcon,
  QrCode as QrCodeIcon,
  Star as StarIcon,
  StarBorder as StarBorderIcon,
  MenuBook as BookIcon,
  Language as LanguageIcon,
  Category as CategoryIcon,
  Sort as SortIcon,
  Refresh as RefreshIcon
} from '@mui/icons-material';
import { useCrudAxios } from '../../hooks/useCrudAxios';
import BookList from './BookList';
import BookForm from './BookForm';

// Composants stylisés
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.3s, box-shadow 0.3s',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[10],
  },
  borderRadius: 12,
  overflow: 'hidden',
}));

const BookCover = styled('div')(({ theme }) => ({
  height: 200,
  overflow: 'hidden',
  position: 'relative',
  '&::after': {
    content: '""',
    position: 'absolute',
    bottom: 0,
    left: 0,
    width: '100%',
    height: '30%',
    background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0) 100%)',
  },
}));

const BookImage = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
});

const SearchBar = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 20,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
  },
}));

const ActionButton = styled(Button)(({ theme }) => ({
  borderRadius: 20,
  textTransform: 'none',
  boxShadow: 'none',
  '&:hover': {
    boxShadow: theme.shadows[2],
  },
}));

const PageHeader = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  marginBottom: theme.spacing(3),
}));

const AddButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1, 2.5),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: theme.shadows[3],
}));

const BookManagement = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all');
  const [sortBy, setSortBy] = useState('datePublication');
  const [openDialog, setOpenDialog] = useState(false);
  const [currentBook, setCurrentBook] = useState(null);
  const [page, setPage] = useState(1);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');
  const [openForm, setOpenForm] = useState(false);
  
  const { 
    data: books, 
    loading, 
    error, 
    create: createBook, 
    update: updateBook, 
    remove: deleteBook, 
    fetch: fetchBooks 
  } = useCrudAxios('/books/uadb');

  useEffect(() => {
    fetchBooks();
  }, []);

  const handleSearch = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleSortChange = (event) => {
    setSortBy(event.target.value);
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

 

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setCurrentBook(null);
  };

  const handleSaveBook = async (formData) => {
    try {
      if (currentBook) {
        await updateBook(currentBook.id, formData);
        showSnackbar('Livre mis à jour avec succès', 'success');
      } else {
        await createBook(formData);
        showSnackbar('Livre ajouté avec succès', 'success');
      }
      handleCloseDialog();
      fetchBooks();
    } catch (error) {
      showSnackbar('Erreur lors de l\'enregistrement du livre', 'error');
    }
  };

  const handleDeleteBook = async (id) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer ce livre ?')) {
      try {
        await deleteBook(id);
        showSnackbar('Livre supprimé avec succès', 'success');
        fetchBooks();
      } catch (error) {
        showSnackbar('Erreur lors de la suppression du livre', 'error');
      }
    }
  };

  const showSnackbar = (message, severity) => {
    setSnackbarMessage(message);
    setSnackbarSeverity(severity);
    setOpenSnackbar(true);
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  // Filtrer et trier les livres
  const filteredBooks = books?.filter(book => {
    const matchesSearch = book.titre.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         book.auteur.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         book.isbn.toLowerCase().includes(searchTerm.toLowerCase());
    
    if (filter === 'all') return matchesSearch;
    if (filter === 'available') return matchesSearch && book.disponible;
    if (filter === 'roman') return matchesSearch && book.categorie.libelle === 'Roman';
    
    return matchesSearch;
  }).sort((a, b) => {
    if (sortBy === 'titre') return a.titre.localeCompare(b.titre);
    if (sortBy === 'auteur') return a.auteur.localeCompare(b.auteur);
    if (sortBy === 'datePublication') return new Date(b.datePublication) - new Date(a.datePublication);
    if (sortBy === 'vues') return b.vues - a.vues;
    
    return 0;
  });

  // Pagination
  const booksPerPage = 9;
  const paginatedBooks = filteredBooks?.slice((page - 1) * booksPerPage, page * booksPerPage);
  const pageCount = Math.ceil((filteredBooks?.length || 0) / booksPerPage);

  const handleAddBook = () => {
    setCurrentBook(null);
    setOpenForm(true);
  };

  const handleEditBook = (book) => {
    setCurrentBook(book);
    setOpenForm(true);
  };

  const handleFormClose = (refresh) => {
    setOpenForm(false);
    setCurrentBook(null);
  };

  return (
    <Box>
      <PageHeader>
        <Typography variant="h4" fontWeight="bold" color="primary">
          Gestion des livres
        </Typography>
        <AddButton
          variant="contained"
          color="primary"
          startIcon={<AddIcon />}
          onClick={handleAddBook}
        >
          Ajouter un livre
        </AddButton>
      </PageHeader>

      <BookList onEditBook={handleEditBook} />

      <BookForm
        open={openForm}
        onClose={handleFormClose}
        book={currentBook}
      />

      <Snackbar 
        open={openSnackbar} 
        autoHideDuration={6000} 
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      >
        <Alert onClose={handleCloseSnackbar} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default BookManagement; 