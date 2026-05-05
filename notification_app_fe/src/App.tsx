import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AllNotifications from './pages/AllNotifications';

function App() {
  return (
    <Router>
      <Box sx={{ flexGrow: 1 }}>
        <AppBar position="static" color="primary">
          <Toolbar>
            <NotificationsIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              Campus Alerts
            </Typography>
            <Button color="inherit" component={Link} to="/">
              All Notifications
            </Button>
            <Button color="inherit" component={Link} to="/priority">
              Priority Inbox
            </Button>
          </Toolbar>
        </AppBar>

        <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
          </Routes>
        </Container>
      </Box>
    </Router>
  );
}

export default App;