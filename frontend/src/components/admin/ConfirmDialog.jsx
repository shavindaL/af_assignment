import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import DeleteIcon from "@mui/icons-material/Delete";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
  fontFamily: "Roboto",
}));

function BootstrapDialogTitle(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

// Function to delete a political party
async function handleDelete(partyID) {
  try {
    const res = await fetch(
      `http://localhost:5000/api/v1/political-parties/${partyID}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const resMsg = await res.text();

    if (resMsg) {
      // Reload the page
      window.location.reload();
    }
  } catch (err) {
    // Print error message
    console.log(err.message);
  }
}

export default function ConfirmDialog({ partyID }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <IconButton
        size="medium"
        sx={{ padding: "4px 4px 4px 4px" }}
        onClick={handleClickOpen}
      >
        <DeleteIcon fontSize="inherit" sx={{ color: "#ef5350" }} />
      </IconButton>

      <BootstrapDialog
        onClose={handleClose}
        aria-labelledby="customized-dialog-title"
        open={open}
      >
        <BootstrapDialogTitle
          id="customized-dialog-title"
          onClose={handleClose}
        >
          Are you sure?
        </BootstrapDialogTitle>
        <DialogContent dividers>
          <Typography paragraph style={{ fontFamily: "Roboto" }}>
            This is will permanantly delete your account. Are your sure?
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose} style={{ color: "#42a5f5" }}>
            NO
          </Button>
          <Button
            autoFocus
            onClick={() => {
              handleDelete(partyID);
            }}
            style={{ color: "#ef5350" }}
          >
            YES
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </>
  );
}
