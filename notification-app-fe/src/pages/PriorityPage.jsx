import { Container, Typography } from "@mui/material";

import { useNotifications } from "../hooks/useNotifications";
import { NotificationCard } from "../components/NotificationCard";

export function PriorityPage() {
  const { notifications } = useNotifications(1, "All");

  const priority = {
    Placement: 3,
    Result: 2,
    Event: 1,
  };

  const top = [...notifications]
    .sort((a, b) => {
      const p1 = priority[a.Type] || 0;
      const p2 = priority[b.Type] || 0;

      if (p1 !== p2) {
        return p2 - p1;
      }

      return (
        new Date(b.Timestamp).getTime() -
        new Date(a.Timestamp).getTime()
      );
    })
    .slice(0, 10);

  return (
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Priority Inbox
      </Typography>

      {top.length === 0 ? (
        <Typography>No notifications available.</Typography>
      ) : (
        top.map((notification) => (
          <NotificationCard
            key={notification.ID}
            notification={notification}
          />
        ))
      )}
    </Container>
  );
}