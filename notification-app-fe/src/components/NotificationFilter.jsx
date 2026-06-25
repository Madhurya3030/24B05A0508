import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";

export function NotificationFilter({
  value,
  onChange,
}) {
  return (
    <FormControl
      fullWidth
      sx={{ mb: 3 }}
    >
      <InputLabel>
        Type
      </InputLabel>

      <Select
        value={value}
        label="Type"
        onChange={(e) =>
          onChange(e.target.value)
        }
      >
        <MenuItem value="All">
          All
        </MenuItem>

        <MenuItem value="Placement">
          Placement
        </MenuItem>

        <MenuItem value="Result">
          Result
        </MenuItem>

        <MenuItem value="Event">
          Event
        </MenuItem>

      </Select>

    </FormControl>
  );
}