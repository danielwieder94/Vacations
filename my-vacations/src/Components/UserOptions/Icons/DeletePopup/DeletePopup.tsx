import React, { useState } from "react";
import "./DeletePopup.css";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
} from "@mui/material";

interface DeletePopupProps {
  isOpen: boolean;
  handleClose: () => void;
  handleConfirm: () => void;
  destination?: string;
}

function DeletePopup({
  isOpen,
  handleClose,
  handleConfirm,
}: DeletePopupProps): JSX.Element {
  const handleAgree = () => {
    handleConfirm();
    handleClose();
  };
  return (
    <div className="DeletePopup">
      <Dialog
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        style={{ backgroundColor: "red" }}
      >
        <DialogTitle id="alert-dialog-title">
          {`Are you sure you want to delete ?`}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Let Google help apps determine location. This means sending
            anonymous location data to Google, even when no apps are running.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleAgree} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default DeletePopup;
