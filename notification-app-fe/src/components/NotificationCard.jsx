import {
  Card,
  CardContent,
  Typography,
  Chip,
} from "@mui/material";

const getColor = (type) => {
  switch (type) {
    case "Placement":
      return "success";

    case "Result":
      return "primary";

    case "Event":
      return "warning";

    default:
      return "default";
  }
};

export function NotificationCard({
  notification,
  onClick,
}) {
  return (
    <Card
      sx={{
        mb: 2,
        cursor: "pointer",
        backgroundColor: notification.isRead
          ? "#ffffff"
          : "#E3F2FD",
      }}
      onClick={onClick}
    >
      <CardContent>

        <Chip
          label={notification.Type}
          color={getColor(notification.Type)}
        />

        <Typography
          variant="h6"
          sx={{ mt: 2 }}
        >
          {notification.Message}
        </Typography>

        <Typography
          color="text.secondary"
        >
          {notification.Timestamp}
        </Typography>

      </CardContent>
    </Card>
  );
}