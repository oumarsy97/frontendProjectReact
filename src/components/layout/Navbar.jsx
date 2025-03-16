import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useToken } from '../../context/TokenContext';
import {
  AppBar,
  Avatar,
  Badge,
  Box,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
  styled,
  alpha,
  Chip,
  Divider,
  useTheme,
  Toolbar,
} from '@mui/material';
import {
  Menu as MenuIcon,
  Search as SearchIcon,
  NotificationsNoneRounded,
  School,
  LogoutRounded,
  PersonOutlineRounded,
  SettingsOutlined,
  Notifications as NotificationsIcon,
  Brightness4 as DarkModeIcon,
  Brightness7 as LightModeIcon,
  HelpOutline as HelpIcon,
} from '@mui/icons-material';

const StyledAppBar = styled(AppBar)(({ theme }) => ({
  backdropFilter: 'blur(6px)',
  backgroundColor: alpha(theme.palette.background.default, 0.8),
  boxShadow: theme.shadows[3],
  color: theme.palette.text.primary,
  zIndex: theme.zIndex.drawer + 1,
}));

const SearchWrapper = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  '&:hover': {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: '100%',
  [theme.breakpoints.up('sm')]: {
    marginLeft: theme.spacing(3),
    width: 'auto',
  },
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '30ch',
    },
  },
}));

const UniversityChip = styled(Chip)(({ theme }) => ({
  backgroundColor: alpha(theme.palette.primary.main, 0.1),
  color: theme.palette.primary.main,
  fontWeight: 600,
  '&:hover': {
    backgroundColor: alpha(theme.palette.primary.main, 0.2),
  },
}));

const Navbar = ({ 
  onSidebarToggle, 
  onMobileSidebarToggle, 
  isSidebarOpen,
  onThemeToggle,
  isDarkMode
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { user, logout } = useToken();
  const [anchorEl, setAnchorEl] = useState(null);
  const [notificationsAnchorEl, setNotificationsAnchorEl] = useState(null);
  const [universityAnchorEl, setUniversityAnchorEl] = useState(null);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleNotificationsOpen = (event) => {
    setNotificationsAnchorEl(event.currentTarget);
  };

  const handleNotificationsClose = () => {
    setNotificationsAnchorEl(null);
  };

  const handleUniversityMenuOpen = (event) => {
    setUniversityAnchorEl(event.currentTarget);
  };

  const handleUniversityMenuClose = () => {
    setUniversityAnchorEl(null);
  };

  const handleLogout = () => {
    handleMenuClose();
    logout();
    navigate('/login');
  };

  return (
    <StyledAppBar position="fixed">
      <Toolbar>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="open drawer"
          onClick={onMobileSidebarToggle}
          sx={{ mr: 2, display: { xs: 'flex', md: 'none' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <IconButton
          color="inherit"
          aria-label="toggle sidebar"
          onClick={onSidebarToggle}
          sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
        >
          <MenuIcon />
        </IconButton>
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <School sx={{ mr: 1, color: '#8BC34A' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ display: { xs: 'none', sm: 'block' }, fontWeight: 'bold' }}
          >
            BiblioUADB
          </Typography>
        </Box>
        
        <UniversityChip
          icon={<School />}
          label="Université Alioune Diop de Bambey"
          sx={{ ml: 2, display: { xs: 'none', md: 'flex' } }}
        />
        
        <SearchWrapper>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Rechercher un livre par titre, auteur, ISBN..."
            inputProps={{ 'aria-label': 'search' }}
          />
        </SearchWrapper>
        
        <Box sx={{ flexGrow: 1 }} />
        
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <IconButton color="inherit" onClick={onThemeToggle}>
            {isDarkMode ? <LightModeIcon /> : <DarkModeIcon />}
          </IconButton>
          
          <Tooltip title="Notifications">
            <IconButton 
              color="inherit"
              onClick={handleNotificationsOpen}
            >
              <Badge badgeContent={3} color="error">
                <NotificationsIcon />
              </Badge>
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Aide">
            <IconButton color="inherit" onClick={() => navigate('/help')}>
              <HelpIcon />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Paramètres">
            <IconButton color="inherit" onClick={() => navigate('/settings')}>
              <SettingsOutlined />
            </IconButton>
          </Tooltip>
          
          <Tooltip title="Profil">
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <Avatar 
                alt={user?.name || "Admin UADB"} 
                src={user?.image} 
                sx={{ width: 32, height: 32 }}
              />
            </IconButton>
          </Tooltip>
        </Box>
      </Toolbar>
      
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(anchorEl)}
        onClose={handleMenuClose}
      >
        <Box sx={{ px: 2, py: 1 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
            {user?.name || "Admin UADB"}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {user?.email || "admin@uadb.edu.sn"}
          </Typography>
          <Typography variant="body2" color="primary">
            Administrateur Bibliothèque UADB
          </Typography>
        </Box>
        <Divider />
        <MenuItem onClick={() => { handleMenuClose(); navigate('/profile'); }}>
          <PersonOutlineRounded sx={{ mr: 2 }} />
          Mon Profil
        </MenuItem>
        <MenuItem onClick={() => { handleMenuClose(); navigate('/settings'); }}>
          <SettingsOutlined sx={{ mr: 2 }} />
          Paramètres
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleLogout} sx={{ color: 'error.main' }}>
          <LogoutRounded sx={{ mr: 2 }} />
          Se déconnecter
        </MenuItem>
      </Menu>
      
      <Menu
        anchorEl={notificationsAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(notificationsAnchorEl)}
        onClose={handleNotificationsClose}
        PaperProps={{
          sx: { width: 320, maxHeight: 400 }
        }}
      >
        <Box sx={{ p: 2, borderBottom: '1px solid', borderColor: 'divider' }}>
          <Typography variant="subtitle1" fontWeight="bold">Notifications</Typography>
        </Box>
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight="bold">Nouveau livre ajouté</Typography>
            <Typography variant="caption" color="text.secondary">
              "Mon 1er" par Oumar Sy a été ajouté au catalogue
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight="bold">Demande d'emprunt</Typography>
            <Typography variant="caption" color="text.secondary">
              2 nouvelles demandes d'emprunt à approuver
            </Typography>
          </Box>
        </MenuItem>
        <MenuItem onClick={handleNotificationsClose}>
          <Box>
            <Typography variant="body2" fontWeight="bold">Mise à jour système</Typography>
            <Typography variant="caption" color="text.secondary">
              La plateforme sera mise à jour ce soir à 23h
            </Typography>
          </Box>
        </MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleNotificationsClose(); navigate('/notifications'); }}>
          <Typography variant="body2" color="primary" sx={{ width: '100%', textAlign: 'center' }}>
            Voir toutes les notifications
          </Typography>
        </MenuItem>
      </Menu>
      
      <Menu
        anchorEl={universityAnchorEl}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        open={Boolean(universityAnchorEl)}
        onClose={handleUniversityMenuClose}
      >
        <MenuItem onClick={handleUniversityMenuClose}>Université Cheikh Anta Diop</MenuItem>
        <MenuItem onClick={handleUniversityMenuClose}>Université Gaston Berger</MenuItem>
        <MenuItem onClick={handleUniversityMenuClose}>Université de Thiès</MenuItem>
        <MenuItem onClick={handleUniversityMenuClose}>Université Alioune Diop de Bambey</MenuItem>
        <MenuItem onClick={handleUniversityMenuClose}>Université Assane Seck de Ziguinchor</MenuItem>
        <Divider />
        <MenuItem onClick={() => { handleUniversityMenuClose(); navigate('/universities'); }}>
          Gérer les universités
        </MenuItem>
      </Menu>
    </StyledAppBar>
  );
};

export default Navbar;