import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  TextField,
  Grid,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Box,
  Typography,
  IconButton,
  CircularProgress,
  Alert,
  Divider,
  Chip,
  useTheme,
  Slide,
  Switch,
  FormControlLabel
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  Close as CloseIcon,
  CloudUpload as UploadIcon,
  MenuBook as BookIcon,
  Language as LanguageIcon,
  CalendarToday as CalendarIcon,
  Category as CategoryIcon,
  Description as DescriptionIcon,
  Tag as TagIcon,
  Check as CheckIcon
} from '@mui/icons-material';
import useCrudAxios from '../../hooks/useCrudAxios';

const StyledDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialog-paper': {
    borderRadius: 16,
    boxShadow: '0 12px 24px rgba(0, 0, 0, 0.15)',
    overflow: 'hidden',
  },
}));

const DialogHeader = styled(DialogTitle)(({ theme }) => ({
  padding: theme.spacing(3),
  background: theme.palette.mode === 'light' 
    ? 'linear-gradient(45deg, #2E7D32, #4CAF50)' 
    : 'linear-gradient(45deg, #1B5E20, #2E7D32)',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
}));

const FormContainer = styled(Box)(({ theme }) => ({
  width: '100%',
  maxWidth: 800,
}));

const FormDivider = styled(Divider)(({ theme }) => ({
  margin: theme.spacing(2, 0),
}));

const ImagePreviewBox = styled(Box)(({ theme }) => ({
  width: '100%',
  height: 270,
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  border: `2px dashed ${theme.palette.divider}`,
  borderRadius: 12,
  padding: theme.spacing(2),
  marginBottom: theme.spacing(2),
  transition: 'all 0.3s',
  '&:hover': {
    borderColor: theme.palette.primary.main,
  },
}));

const UploadButton = styled(Button)(({ theme }) => ({
  borderRadius: 12,
  padding: theme.spacing(1.2, 2),
  textTransform: 'none',
  fontWeight: 600,
  boxShadow: 'none',
  '&:hover': {
    boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
}));

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: 12,
  },
}));

const TagsBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  gap: theme.spacing(1),
  marginTop: theme.spacing(1),
}));

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const BookForm = ({ open, onClose, book }) => {
  const theme = useTheme();
  const isEditing = Boolean(book);
  const [formData, setFormData] = useState({
    titre: '',
    auteur: '',
    isbn: '',
    description: '',
    categorieId: '',
    format: 'EPUB',
    langue: 'FR',
    nombrePages: 0,
    editeur: '',
    mots_cles: '',
    image: '',
    disponible: true,
    prix: 0,
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [tags, setTags] = useState([]);
  const [newTag, setNewTag] = useState('');

  const { 
    data: categories,
    fetch: fetchCategories
  } = useCrudAxios('/books/categories/uadb');

  const { 
    create: createBook,
    update: updateBook
  } = useCrudAxios('/books/uadb');

  useEffect(() => {
    fetchCategories();
    
    if (book) {
      setFormData({
        titre: book.titre || '',
        auteur: book.auteur || '',
        isbn: book.isbn || '',
        description: book.description || '',
        categorieId: book.categorieId || '',
        format: book.format || 'EPUB',
        langue: book.langue || 'FR',
        nombrePages: book.nombrePages || 0,
        editeur: book.editeur || '',
        mots_cles: book.mots_cles || '',
        image: book.image || '',
        disponible: book.disponible !== undefined ? book.disponible : true,
        prix: book.prix || 0,
      });
      setImagePreview(book.image || '');
      
      if (book.mots_cles) {
        setTags(book.mots_cles.split(',').map(tag => tag.trim()));
      }
    } else {
      // Réinitialiser le formulaire si on ajoute un nouveau livre
      setFormData({
        titre: '',
        auteur: '',
        isbn: '',
        description: '',
        categorieId: '',
        format: 'EPUB',
        langue: 'FR',
        nombrePages: 0,
        editeur: '',
        mots_cles: '',
        image: '',
        disponible: true,
        prix: 0,
      });
      setImagePreview('');
      setTags([]);
    }
  }, [book]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => {
      setImagePreview(reader.result);
      // Dans une application réelle, vous téléchargeriez l'image vers un serveur/cloud storage
      // et obtiendriez une URL pour l'image
      // Ici, nous utilisons juste une prévisualisation
      setFormData(prev => ({ ...prev, image: reader.result }));
    };
    reader.readAsDataURL(file);
  };

  const handleAddTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      const updatedTags = [...tags, newTag.trim()];
      setTags(updatedTags);
      setFormData(prev => ({
        ...prev,
        mots_cles: updatedTags.join(', ')
      }));
      setNewTag('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    const updatedTags = tags.filter(tag => tag !== tagToRemove);
    setTags(updatedTags);
    setFormData(prev => ({
      ...prev,
      mots_cles: updatedTags.join(', ')
    }));
  };

  const handleTagKeyPress = (e) => {
    if (e.key === 'Enter' && newTag.trim()) {
      e.preventDefault();
      handleAddTag();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!formData.titre || !formData.auteur || !formData.isbn || !formData.categorieId) {
      setError('Veuillez remplir tous les champs obligatoires.');
      return;
    }
    
    try {
      setLoading(true);
      setError('');
      
      if (isEditing) {
        await updateBook(book.id, formData);
      } else {
        await createBook(formData);
      }
      
      onClose(true); // Ferme le dialog et indique qu'il faut rafraîchir la liste
    } catch (err) {
      setError('Une erreur est survenue lors de l\'enregistrement du livre.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={() => !loading && onClose()}
      maxWidth="md"
      fullWidth
      TransitionComponent={Transition}
    >
      <DialogHeader>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BookIcon sx={{ fontSize: 28, mr: 1.5 }} />
          <Typography variant="h6">
            {isEditing ? 'Modifier le livre' : 'Ajouter un nouveau livre'}
          </Typography>
        </Box>
        <IconButton
          edge="end"
          color="inherit"
          onClick={() => onClose()}
          disabled={loading}
          aria-label="close"
        >
          <CloseIcon />
        </IconButton>
      </DialogHeader>

      <DialogContent sx={{ p: 3 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }}>
            {error}
          </Alert>
        )}

        <FormContainer>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={4}>
                <Box>
                  <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
                    Couverture du livre
                  </Typography>
                  <ImagePreviewBox>
                    {loading ? (
                      <CircularProgress />
                    ) : imagePreview ? (
                      <img
                        src={imagePreview}
                        alt="Aperçu du livre"
                        style={{
                          width: '100%',
                          height: '100%',
                          objectFit: 'contain',
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <BookIcon sx={{ fontSize: 80, color: 'text.secondary', opacity: 0.5 }} />
                    )}
                  </ImagePreviewBox>
                  <UploadButton
                    component="label"
                    variant="contained"
                    color="primary"
                    startIcon={<UploadIcon />}
                    fullWidth
                    disabled={loading}
                  >
                    Télécharger une image
                    <input
                      type="file"
                      accept="image/*"
                      hidden
                      onChange={handleImageChange}
                      disabled={loading}
                    />
                  </UploadButton>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={8}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold"
                      sx={{ mb: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <DescriptionIcon sx={{ mr: 1, fontSize: 20 }} />
                      Informations générales
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="titre"
                      label="Titre"
                      value={formData.titre}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="auteur"
                      label="Auteur"
                      value={formData.auteur}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="isbn"
                      label="ISBN"
                      value={formData.isbn}
                      onChange={handleChange}
                      fullWidth
                      required
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="editeur"
                      label="Éditeur"
                      value={formData.editeur}
                      onChange={handleChange}
                      fullWidth
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormDivider />
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      sx={{ mb: 1, mt: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <CategoryIcon sx={{ mr: 1, fontSize: 20 }} />
                      Catégorisation & Détails
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledFormControl fullWidth required>
                      <InputLabel id="category-label">Catégorie</InputLabel>
                      <Select
                        labelId="category-label"
                        name="categorieId"
                        value={formData.categorieId}
                        onChange={handleChange}
                        label="Catégorie"
                      >
                        {categories.map((category) => (
                          <MenuItem key={category.id} value={category.id}>
                            {category.libelle}
                          </MenuItem>
                        ))}
                      </Select>
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledFormControl fullWidth>
                      <InputLabel id="format-label">Format</InputLabel>
                      <Select
                        labelId="format-label"
                        name="format"
                        value={formData.format}
                        onChange={handleChange}
                        label="Format"
                      >
                        <MenuItem value="EPUB">EPUB</MenuItem>
                        <MenuItem value="PDF">PDF</MenuItem>
                        <MenuItem value="MOBI">MOBI</MenuItem>
                        <MenuItem value="PHYSIQUE">PHYSIQUE</MenuItem>
                      </Select>
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledFormControl fullWidth>
                      <InputLabel id="langue-label">Langue</InputLabel>
                      <Select
                        labelId="langue-label"
                        name="langue"
                        value={formData.langue}
                        onChange={handleChange}
                        label="Langue"
                      >
                        <MenuItem value="FR">Français</MenuItem>
                        <MenuItem value="EN">Anglais</MenuItem>
                        <MenuItem value="ES">Espagnol</MenuItem>
                        <MenuItem value="AR">Arabe</MenuItem>
                      </Select>
                    </StyledFormControl>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="nombrePages"
                      label="Nombre de pages"
                      type="number"
                      value={formData.nombrePages}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{ inputProps: { min: 0 } }}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormDivider />
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      sx={{ mb: 1, mt: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <DescriptionIcon sx={{ mr: 1, fontSize: 20 }} />
                      Description & Mots-clés
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <StyledTextField
                      name="description"
                      label="Description"
                      value={formData.description}
                      onChange={handleChange}
                      fullWidth
                      multiline
                      rows={3}
                    />
                  </Grid>
                  
                  <Grid item xs={12}>
                    <Box sx={{ display: 'flex', alignItems: 'flex-end', mb: 1 }}>
                      <StyledTextField
                        name="newTag"
                        label="Ajouter un mot-clé"
                        value={newTag}
                        onChange={(e) => setNewTag(e.target.value)}
                        onKeyPress={handleTagKeyPress}
                        fullWidth
                        InputProps={{
                          endAdornment: (
                            <IconButton 
                              onClick={handleAddTag} 
                              disabled={!newTag.trim()}
                              edge="end"
                            >
                              <CheckIcon />
                            </IconButton>
                          ),
                        }}
                      />
                    </Box>
                    <TagsBox>
                      {tags.map((tag) => (
                        <Chip
                          key={tag}
                          label={tag}
                          onDelete={() => handleRemoveTag(tag)}
                          color="primary"
                          variant="outlined"
                          size="small"
                        />
                      ))}
                    </TagsBox>
                  </Grid>
                  
                  <Grid item xs={12}>
                    <FormDivider />
                    <Typography 
                      variant="subtitle1" 
                      fontWeight="bold" 
                      sx={{ mb: 1, mt: 1, display: 'flex', alignItems: 'center' }}
                    >
                      <DescriptionIcon sx={{ mr: 1, fontSize: 20 }} />
                      Disponibilité & Prix
                    </Typography>
                  </Grid>
                  
                  <Grid item xs={12} sm={6}>
                    <StyledTextField
                      name="prix"
                      label="Prix"
                      type="number"
                      value={formData.prix}
                      onChange={handleChange}
                      fullWidth
                      InputProps={{ 
                        inputProps: { min: 0, step: "0.01" },
                        startAdornment: <Typography sx={{ mr: 1 }}>XOF</Typography>,
                      }}
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={formData.disponible}
                          onChange={handleChange}
                          name="disponible"
                          color="success"
                        />
                      }
                      label="Disponible pour emprunt"
                    />
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </form>
        </FormContainer>
      </DialogContent>

      <DialogActions sx={{ p: 3, pt: 0 }}>
        <Button 
          onClick={() => onClose()} 
          disabled={loading}
          sx={{ 
            borderRadius: 8,
            fontWeight: 600,
            textTransform: 'none',
            px: 3
          }}
        >
          Annuler
        </Button>
        <Button
          onClick={handleSubmit}
          color="primary"
          variant="contained"
          disabled={loading}
          startIcon={loading && <CircularProgress size={20} color="inherit" />}
          sx={{ 
            borderRadius: 8,
            fontWeight: 600,
            textTransform: 'none',
            px: 3
          }}
        >
          {loading 
            ? 'Enregistrement...' 
            : isEditing 
              ? 'Mettre à jour' 
              : 'Ajouter le livre'
          }
        </Button>
      </DialogActions>
    </StyledDialog>
  );
};

export default BookForm; 