import Box from "@mui/material/Box";
import { Snackbar, type SnackbarOrigin } from "@mui/material";

export interface SnackbarState extends SnackbarOrigin {
  open: boolean;
  message: string;
}

const SnackbarAlert = ({
  handleCloseSnackbar,
  snackbar,
}: {
  handleCloseSnackbar: () => void;
  snackbar: SnackbarState;
}) => {
  const { vertical, horizontal, open } = snackbar;

  return (
    <Box sx={{ width: 500 }}>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleCloseSnackbar}
        message={snackbar.message}
        key={vertical + horizontal}
        autoHideDuration={3000}
      />
    </Box>
  );
};

export default SnackbarAlert;
