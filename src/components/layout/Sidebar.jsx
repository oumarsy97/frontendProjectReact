import { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Box,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Collapse,
  Typography,
  Avatar,
  useMediaQuery,
  Tooltip,
  Badge,
  IconButton,
  Button
} from '@mui/material';
import { styled, useTheme } from '@mui/material/styles';
import {
  Dashboard as DashboardIcon,
  MenuBook as BooksIcon,
  People as PeopleIcon,
  BarChart as AnalyticsIcon,
  Settings as SettingsIcon,
  Help as HelpIcon,
  ExpandLess,
  ExpandMore,
  School as SchoolIcon,
  LocalLibrary as LibraryIcon,
  SwapHoriz as LoansIcon,
  EventNote as ReservationsIcon,
  ChevronLeft as ChevronLeftIcon,
  ChevronRight as ChevronRightIcon,
  AddCircleOutline as AddIcon,
  Inventory as InventoryIcon,
  Bookmark as BookmarkIcon,
  StarBorder as StarIcon,
  Category as CategoryIcon
} from '@mui/icons-material';
import { useState } from 'react';

const DRAWER_WIDTH = 260;
const CLOSED_DRAWER_WIDTH = 70;

const StyledDrawer = styled(Drawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme, open }) => ({
    width: open ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    '& .MuiDrawer-paper': {
      width: open ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH,
      transition: theme.transitions.create('width', {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.enteringScreen,
      }),
      overflowX: 'hidden',
      background: 'linear-gradient(180deg, #2E7D32 0%, #1B5E20 100%)',
      color: '#ffffff',
      borderRight: 'none',
      boxShadow: '0 4px 20px 0 rgba(0,0,0,0.12)',
    },
  }),
);

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1),
  ...theme.mixins.toolbar,
}));

const StyledListItemButton = styled(ListItemButton)(({ theme }) => ({
  margin: theme.spacing(0.8, 1),
  borderRadius: 12,
  transition: 'all 0.2s ease',
  '&.Mui-selected': {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
    '&:hover': {
      backgroundColor: 'rgba(255, 255, 255, 0.3)',
    },
  },
  '&:hover': {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    transform: 'translateY(-2px)',
  },
}));

const StyledListItemIcon = styled(ListItemIcon)(() => ({
  color: '#ffffff',
  minWidth: 0,
  marginRight: 16,
}));

const UserBox = styled(Box)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  padding: theme.spacing(2),
  marginTop: theme.spacing(1),
  marginBottom: theme.spacing(1),
}));

const AddBookButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 1),
  backgroundColor: '#8BC34A',
  color: '#fff',
  borderRadius: 12,
  padding: '10px 16px',
  boxShadow: '0 4px 12px rgba(139, 195, 74, 0.4)',
  transition: 'all 0.3s ease',
  '&:hover': {
    backgroundColor: '#689F38',
    transform: 'translateY(-2px)',
    boxShadow: '0 6px 16px rgba(139, 195, 74, 0.6)',
  },
}));

const Sidebar = ({
  isOpen,
  isMobileOpen,
  onMobileClose,
  onToggle,
  activeSection,
  onSectionChange
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const location = useLocation();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [openSubMenu, setOpenSubMenu] = useState('');

  useEffect(() => {
    if (isMobile) {
      onMobileClose();
    }
  }, [isMobile, onMobileClose]);

  useEffect(() => {
    // Déterminer la section active basée sur le chemin actuel
    const path = location.pathname;
    if (path.includes('/books')) {
      setOpenSubMenu('books');
    } else if (path.includes('/loans')) {
      setOpenSubMenu('loans');
    }
  }, [location.pathname]);

  const handleSubMenuToggle = (menu) => {
    setOpenSubMenu(openSubMenu === menu ? '' : menu);
  };

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile) {
      onMobileClose();
    }
  };

  const menuItems = [
    {
      id: 'dashboard',
      text: 'Tableau de bord',
      icon: <DashboardIcon />,
      path: '/dashboard'
    },
    {
      id: 'books',
      text: 'Livres',
      icon: <BooksIcon />,
      path: '/books',
      badge: 3
    },
    {
      id: 'categories',
      text: 'Catégories',
      icon: <CategoryIcon />,
      path: '/categories'
    },
    {
      id: 'loans',
      text: 'Emprunts',
      icon: <LoansIcon />,
      path: '/loans'
    },
    {
      id: 'reservations',
      text: 'Réservations',
      icon: <ReservationsIcon />,
      path: '/reservations'
    },
    {
      id: 'students',
      text: 'Étudiants',
      icon: <PeopleIcon />,
      path: '/students'
    },
    {
      id: 'analytics',
      text: 'Statistiques',
      icon: <AnalyticsIcon />,
      path: '/analytics'
    },
    {
      id: 'settings',
      text: 'Paramètres',
      icon: <SettingsIcon />,
      path: '/settings'
    }
  ];

  const drawer = (
    <>
      <DrawerHeader>
        {isOpen && (
          <Box sx={{ display: 'flex', alignItems: 'center', ml: 1 }}>
            <LibraryIcon sx={{ mr: 1 }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold' }}>
              BiblioUADB
            </Typography>
          </Box>
        )}
        <IconButton onClick={onToggle} sx={{ color: 'inherit' }}>
          {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
        </IconButton>
      </DrawerHeader>
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      
      {isOpen && (
        <UserBox>
          <Avatar 
            alt="Admin UADB" 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 40, height: 40, mr: 2 }}
          />
          <Box>
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold' }}>
              Bibliothécaire
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8 }}>
              Admin UADB
            </Typography>
          </Box>
        </UserBox>
      )}
      
      {!isOpen && (
        <Box sx={{ display: 'flex', justifyContent: 'center', my: 2 }}>
          <Avatar 
            alt="Admin UADB" 
            src="/static/images/avatar/1.jpg" 
            sx={{ width: 40, height: 40 }}
          />
        </Box>
      )}
      
      <Divider sx={{ backgroundColor: 'rgba(255,255,255,0.2)' }} />
      
      {isOpen && (
        <AddBookButton 
          variant="contained" 
          startIcon={<AddIcon />}
          onClick={() => handleNavigation('/books/add')}
          fullWidth
        >
          Ajouter un livre
        </AddBookButton>
      )}
      
      <List sx={{ px: 1 }}>
        {menuItems.map((item) => (
          <Box key={item.id}>
            <Tooltip title={!isOpen ? item.text : ''} placement="right">
              <StyledListItemButton
                selected={activeSection === item.id || location.pathname === item.path}
                onClick={() => {
                  if (item.subItems) {
                    handleSubMenuToggle(item.id);
                  } else if (item.path) {
                    handleNavigation(item.path);
                    onSectionChange(item.id);
                  }
                }}
                sx={{
                  justifyContent: isOpen ? 'initial' : 'center',
                  px: isOpen ? 2 : 2.5,
                }}
              >
                <StyledListItemIcon>
                  {item.badge ? (
                    <Badge badgeContent={item.badge} color="error">
                      {item.icon}
                    </Badge>
                  ) : (
                    item.icon
                  )}
                </StyledListItemIcon>
                {isOpen && (
                  <>
                    <ListItemText primary={item.text} />
                    {item.badge && (
                      <Box
                        sx={{
                          bgcolor: 'error.main',
                          color: 'error.contrastText',
                          borderRadius: '50%',
                          width: 20,
                          height: 20,
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          fontSize: '0.75rem',
                        }}
                      >
                        {item.badge}
                      </Box>
                    )}
                    {item.subItems && (
                      openSubMenu === item.id ? <ExpandLess /> : <ExpandMore />
                    )}
                  </>
                )}
              </StyledListItemButton>
            </Tooltip>
            
            {isOpen && item.subItems && (
              <Collapse in={openSubMenu === item.id} timeout="auto" unmountOnExit>
                <List component="div" disablePadding>
                  {item.subItems.map((subItem) => (
                    <StyledListItemButton
                      key={subItem.id}
                      selected={location.pathname === subItem.path}
                      onClick={() => {
                        handleNavigation(subItem.path);
                        onSectionChange(subItem.id);
                      }}
                      sx={{ pl: 4 }}
                    >
                      <ListItemText primary={subItem.text} />
                    </StyledListItemButton>
                  ))}
                </List>
              </Collapse>
            )}
          </Box>
        ))}
      </List>
    </>
  );

  return (
    <Box component="nav" sx={{ width: { md: isOpen ? DRAWER_WIDTH : CLOSED_DRAWER_WIDTH }, flexShrink: { md: 0 } }}>
      {/* Mobile drawer */}
      {isMobile && (
        <Drawer
          variant="temporary"
          open={isMobileOpen}
          onClose={onMobileClose}
          ModalProps={{ keepMounted: true }}
          sx={{
            display: { xs: 'block', md: 'none' },
            '& .MuiDrawer-paper': { 
              width: DRAWER_WIDTH,
              background: 'linear-gradient(180deg, #2E7D32 0%, #1B5E20 100%)',
              color: '#ffffff',
            },
          }}
        >
          {drawer}
        </Drawer>
      )}
      
      {/* Desktop drawer */}
      <StyledDrawer
        variant="permanent"
        open={isOpen}
        sx={{ display: { xs: 'none', md: 'block' } }}
      >
        {drawer}
      </StyledDrawer>
    </Box>
  );
};

export default Sidebar;