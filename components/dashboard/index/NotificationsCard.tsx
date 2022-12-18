import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import useSWR from "swr";

type Notification = {
  id: string;
  message: string;
  markdown: boolean;
  createdAt: string;
  updatedAt: string;
};

const fetcher = (url: string) => fetch(url).then((res) => res.json());

const NotificationsCard = () => {
  const { data, error } = useSWR("/api/notifications/all?limit=15", fetcher);

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card sx={{ minWidth: 275, minHeight: 210 }}>
        <CardHeader
          title="Notifications"
          subheader={`
        System notifications. 
      `}
        />
        <Divider />
        <CardContent>
          <List>
            {data &&
              data.map((notification: any) => (
                <ListItem disablePadding key={notification.$id}>
                  <ListItemText primary={`${notification.message}`} />
                </ListItem>
              ))}
            {error && (
              <ListItem disablePadding>
                <ListItemText primary="Failed to load" />
              </ListItem>
            )}
            {!data && !error && (
              <ListItem disablePadding>
                <ListItemText primary="Loading..." />
              </ListItem>
            )}
          </List>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default NotificationsCard;
