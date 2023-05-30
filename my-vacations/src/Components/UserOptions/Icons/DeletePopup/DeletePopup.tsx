import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
} from "@mui/material";

interface DeletePopupProps {
  open: boolean;
  onClose: () => void;
  onConfirm: () => void;
}
function DeletePopup({
  open,
  onClose,
  onConfirm,
}: DeletePopupProps): JSX.Element {
  return (
    <div className="DeletePopup">
      <Dialog open={open} onClose={onClose}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button onClick={onConfirm} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
export default DeletePopup;
//   return (
//     <div className="DeletePopup">
//       <Dialog
//         open={isOpen}
//         onClose={handleClose}
//         aria-labelledby="alert-dialog-title"
//         aria-describedby="alert-dialog-description"
//         style={{ backgroundColor: "red" }}
//       >
//         <DialogTitle id="alert-dialog-title">
//           {`Are you sure you want to delete ?`}
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText id="alert-dialog-description">
//             Let Google help apps determine location. This means sending
//             anonymous location data to Google, even when no apps are running.
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Disagree</Button>
//           <Button onClick={handleAgree} autoFocus>
//             Agree
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }

// export default DeletePopup;
