import {
  Box,
  Button,
} from "@mui/material";

export default function Pagination({
  page,
  setPage,
}) {

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        gap: 2,
        mt: 3,
      }}
    >
      <Button
        variant="contained"
        disabled={page === 1}
        onClick={() =>
          setPage(page - 1)
        }
      >
        Previous
      </Button>

      <Button
        variant="outlined"
      >
        {page}
      </Button>

      <Button
        variant="contained"
        onClick={() =>
          setPage(page + 1)
        }
      >
        Next
      </Button>

    </Box>
  );
}