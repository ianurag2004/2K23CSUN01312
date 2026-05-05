// src/pages/AllNotifications.tsx
import { useState, useEffect } from 'react';
import { Typography, Card, CardContent, Box, Chip, CircularProgress } from '@mui/material';
import { Log } from 'logging_middleware';
import { NotificationData } from '../types';

// Replace with your Postman token
const AUTH_TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJpYW51cmFnMjAwNUBnbWFpbC5jb20iLCJleHAiOjE3Nzc5NzI3MzYsImlhdCI6MTc3Nzk3MTgzNiwiaXNzIjoiQWZmb3JkIE1lZGljYWwgVGVjaG5vbG9naWVzIFByaXZhdGUgTGltaXRlZCIsImp0aSI6IjgzZTQ0MzllLTE5NjItNDA5Yy04NWZjLTg4ODA2NmQxMTdjMiIsImxvY2FsZSI6ImVuLUlOIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwic3ViIjoiNGQzMzI3OWQtZDkxZS00ZDM0LTk4M2EtYmUxNGZlODM1ZmM4In0sImVtYWlsIjoiaWFudXJhZzIwMDVAZ21haWwuY29tIiwibmFtZSI6ImFudXJhZyBzcml2YXN0YXZhIiwicm9sbE5vIjoiMmsyM2NzdW4wMTMxMiIsImFjY2Vzc0NvZGUiOiJYanZUWngiLCJjbGllbnRJRCI6IjRkMzMyNzlkLWQ5MWUtNGQzNC05ODNhLWJlMTRmZTgzNWZjOCIsImNsaWVudFNlY3JldCI6IkhzZkFOeHR4dVR6d1pCTnoifQ.wEGgswB84rZ7sPx1MwNGGxRvyPnPdqBzq8eYZXeEA9E";

export default function AllNotifications() {
  const [notifications, setNotifications] = useState<NotificationData[]>([]);
  const [loading, setLoading] = useState(true);
  
  // We use state to track which notification IDs the user has clicked
  const [viewedIds, setViewedIds] = useState<Set<string>>(new Set());

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    Log("frontend", "info", "page", "AllNotifications page mounted, fetching data...");
    try {
      const response = await fetch("http://20.207.122.201/evaluation-service/notifications", {
        headers: { "Authorization": `Bearer ${AUTH_TOKEN}` }
      });

      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      
      const rawData = await response.json();
      
      // Safely extract the array just like we did in Stage 1
      let dataArray = [];
      if (Array.isArray(rawData)) dataArray = rawData;
      else if (rawData && Array.isArray(rawData.notifications)) dataArray = rawData.notifications;
      else if (rawData && Array.isArray(rawData.data)) dataArray = rawData.data;

      setNotifications(dataArray);
      Log("frontend", "debug", "api", `Successfully loaded ${dataArray.length} notifications.`);
    } catch (error: any) {
      Log("frontend", "error", "api", `Failed to fetch: ${error.message}`);
    } finally {
      setLoading(false);
    }
  };

  const markAsViewed = (id: string) => {
    if (!viewedIds.has(id)) {
      const newViewed = new Set(viewedIds);
      newViewed.add(id);
      setViewedIds(newViewed);
      Log("frontend", "info", "state", `Notification ${id} marked as viewed.`);
    }
  };

  const getChipColor = (type: string) => {
    switch (type) {
      case 'Placement': return 'success';
      case 'Result': return 'info';
      case 'Event': return 'warning';
      default: return 'default';
    }
  };

  if (loading) return <Box display="flex" justifyContent="center" mt={10}><CircularProgress /></Box>;

  return (
    <Box>
      <Typography variant="h4" gutterBottom fontWeight="bold">
        All Campus Notifications
      </Typography>
      
      {notifications.map((notif) => {
        const isViewed = viewedIds.has(notif.ID);
        
        return (
          <Card 
            key={notif.ID} 
            sx={{ 
              mb: 2, 
              cursor: 'pointer',
              transition: '0.3s',
              // Highlight unread ones with a white background and slight shadow. 
              // Viewed ones get a dimmed gray background.
              backgroundColor: isViewed ? '#f5f5f5' : '#ffffff',
              boxShadow: isViewed ? 1 : 3,
              borderLeft: isViewed ? 'none' : '5px solid #1976d2'
            }}
            onClick={() => markAsViewed(notif.ID)}
          >
            <CardContent>
              <Box display="flex" justifyContent="space-between" alignItems="center" mb={1}>
                <Chip label={notif.Type} color={getChipColor(notif.Type) as any} size="small" />
                <Typography variant="caption" color="text.secondary">
                  {new Date(notif.Timestamp).toLocaleString()}
                </Typography>
              </Box>
              <Typography variant="body1" fontWeight={isViewed ? 'normal' : 'bold'}>
                {notif.Message}
              </Typography>
            </CardContent>
          </Card>
        );
      })}
    </Box>
  );
}