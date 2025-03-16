import { useState } from 'react';
import {
  Container,
  Paper,
  Grid,
  Typography,
  Avatar,
  Button,
  TextField,
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
} from '@mui/material';
import {
  Email,
  Phone,
  School,
  Edit,
  Save,
  Cancel,
} from '@mui/icons-material';
import Grid2 from '@mui/material/Unstable_Grid2';

const ProfilePage = () => {
  const [editing, setEditing] = useState(false);
  const [userData, setUserData] = useState({
    firstName: 'John',
    lastName: 'Doe',
    email: 'john.doe@example.com',
    phone: '+33 6 12 34 56 78',
    university: 'Université Paris 1',
    bio: 'Passionné de lecture et d\'apprentissage',
  });

  const [tempData, setTempData] = useState(userData);

  const handleEdit = () => {
    setTempData(userData);
    setEditing(true);
  };

  const handleSave = () => {
    setUserData(tempData);
    setEditing(false);
  };

  const handleCancel = () => {
    setEditing(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTempData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Grid2 container spacing={4}>
        <Grid2 xs={12} md={4}>
          <Paper elevation={3} sx={{ p: 3, textAlign: 'center' }}>
            <Avatar
              sx={{
                width: 120,
                height: 120,
                margin: '0 auto 16px',
                bgcolor: 'primary.main',
              }}
            >
              {userData.firstName[0]}{userData.lastName[0]}
            </Avatar>
            <Typography variant="h5" gutterBottom>
              {userData.firstName} {userData.lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              {userData.email}
            </Typography>
            <Button
              variant="contained"
              sx={{ mt: 2 }}
              startIcon={editing ? <Save /> : <Edit />}
              onClick={editing ? handleSave : handleEdit}
            >
              {editing ? 'Sauvegarder' : 'Modifier'}
            </Button>
            {editing && (
              <Button
                variant="outlined"
                sx={{ mt: 2, ml: 1 }}
                startIcon={<Cancel />}
                onClick={handleCancel}
              >
                Annuler
              </Button>
            )}
          </Paper>
        </Grid2>

        <Grid2 xs={12} md={8}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Informations personnelles
            </Typography>
            <Divider sx={{ mb: 3 }} />

            {editing ? (
              <Grid2 container spacing={2}>
                <Grid2 xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Prénom"
                    name="firstName"
                    value={tempData.firstName}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 xs={12} sm={6}>
                  <TextField
                    fullWidth
                    label="Nom"
                    name="lastName"
                    value={tempData.lastName}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Email"
                    name="email"
                    value={tempData.email}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Téléphone"
                    name="phone"
                    value={tempData.phone}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    label="Université"
                    name="university"
                    value={tempData.university}
                    onChange={handleChange}
                  />
                </Grid2>
                <Grid2 xs={12}>
                  <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Bio"
                    name="bio"
                    value={tempData.bio}
                    onChange={handleChange}
                  />
                </Grid2>
              </Grid2>
            ) : (
              <List>
                <ListItem>
                  <ListItemIcon>
                    <Email />
                  </ListItemIcon>
                  <ListItemText
                    primary="Email"
                    secondary={userData.email}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <Phone />
                  </ListItemIcon>
                  <ListItemText
                    primary="Téléphone"
                    secondary={userData.phone}
                  />
                </ListItem>
                <ListItem>
                  <ListItemIcon>
                    <School />
                  </ListItemIcon>
                  <ListItemText
                    primary="Université"
                    secondary={userData.university}
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary="Bio"
                    secondary={userData.bio}
                  />
                </ListItem>
              </List>
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </Container>
  );
};

export default ProfilePage; 