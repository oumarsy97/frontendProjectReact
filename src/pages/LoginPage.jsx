import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Paper,
  TextField,
  Button,
  Typography,
  Box,
  Alert,
  InputAdornment,
  IconButton,
  CircularProgress,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Visibility,
  VisibilityOff,
  Email,
  School,
} from '@mui/icons-material';
import { styled } from '@mui/material/styles';
import { useToken } from '../context/TokenContext';
import { useCrud } from '../hooks/useCrud';

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  boxShadow: '0 8px 32px rgba(0, 0, 0, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  '& .MuiOutlinedInput-root': {
    borderRadius: '12px',
    transition: 'all 0.3s ease',
    '&:hover': {
      transform: 'translateY(-2px)',
    },
  },
}));

const LoginPage = () => {
  const navigate = useNavigate();
  const { setNewToken, setNewUser } = useToken();
  const { login, loading, error: apiError } = useCrud();
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    universite: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Réinitialiser l'erreur

    try {
      console.log('Tentative de connexion avec:', formData); // Pour le débogage
      const result = await login(formData);
      console.log('Résultat de la connexion:', result); // Pour le débogage

      if (result?.data?.access_token) {
        setNewToken(result.data.access_token);
        setNewUser(result.data.user);
        navigate('/');
      } else {
        setError('Réponse invalide du serveur');
      }
    } catch (err) {
      console.error('Erreur de connexion détaillée:', err);
      setError(err.message || 'Erreur de connexion');
    }
  };

  // Afficher soit l'erreur API soit l'erreur locale
  const displayError = error || apiError;

  return (
    <Box
      sx={{
        minHeight: '90vh',
        display: 'flex',
        alignItems: 'center',
        background: 'linear-gradient(135deg, #6B73FF 0%, #000DFF 100%)',
        py: 4,
      }}
    >
      <Container maxWidth="sm">
        <StyledPaper elevation={6}>
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: 3,
            }}
          >
            <Typography
              component="h1"
              variant="h4"
              sx={{
                fontWeight: 700,
                background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                mb: 2,
              }}
            >
              Connexion
            </Typography>

            {displayError && (
              <Alert 
                severity="error" 
                sx={{ 
                  width: '100%',
                  borderRadius: '12px',
                  animation: 'slideIn 0.5s ease-out',
                }}
              >
                {displayError}
              </Alert>
            )}

            <form onSubmit={handleSubmit} style={{ width: '100%' }}>
              <StyledTextField
                margin="normal"
                required
                fullWidth
                id="email"
                label="Adresse email"
                name="email"
                autoComplete="email"
                autoFocus
                value={formData.email}
                onChange={handleChange}
                InputProps={{
                  startAdornment: (
                    <InputAdornment position="start">
                      <Email color="primary" />
                    </InputAdornment>
                  ),
                }}
              />

              <StyledTextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Mot de passe"
                type={showPassword ? 'text' : 'password'}
                id="password"
                autoComplete="current-password"
                value={formData.password}
                onChange={handleChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        edge="end"
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <FormControl fullWidth margin="normal">
                <InputLabel id="universite-label">Université</InputLabel>
                <Select
                  labelId="universite-label"
                  id="universite"
                  name="universite"
                  value={formData.universite}
                  onChange={handleChange}
                  required
                  startAdornment={
                    <InputAdornment position="start">
                      <School color="primary" />
                    </InputAdornment>
                  }
                  sx={{ borderRadius: '12px' }}
                >
                  <MenuItem value="uadb">UADB</MenuItem>
                  <MenuItem value="ucad">UCAD</MenuItem>
                  <MenuItem value="ut">UT</MenuItem>
                </Select>
              </FormControl>

              <Button
                type="submit"
                fullWidth
                variant="contained"
                disabled={loading}
                sx={{
                  mt: 3,
                  mb: 2,
                  borderRadius: '12px',
                  padding: '12px',
                  background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: '0 8px 16px rgba(33, 150, 243, 0.3)',
                  },
                }}
              >
                {loading ? (
                  <CircularProgress size={24} color="inherit" />
                ) : (
                  'Se connecter'
                )}
              </Button>
            </form>
          </Box>
        </StyledPaper>
      </Container>
    </Box>
  );
};

export default LoginPage; 