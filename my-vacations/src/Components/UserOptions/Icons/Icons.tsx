import React, { useEffect, useMemo, useState } from "react";
import { userIsAdmin } from "../../../Utils/authUtils";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
// import DeletePopup from "./DeletePopup/DeletePopup";
import "./Icons.css";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Modal,
  Tooltip,
} from "@mui/material";

interface IconProps {
  vacationId?: number;
  onDelete: () => void;
  isAdmin: boolean;
}

function Icons({ vacationId, onDelete, isAdmin }: IconProps): JSX.Element {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);
  const [showDeleteModal, setShowDeleteModal] = useState<boolean>(false);

  const handleEdit = () => {
    navigate(`/editVacation/${vacationId}`);
  };
  const handleDelete = () => {
    //handle logic. I want to open a modal to confirm the delete
    console.log("delete icon is clicked...");
    setShowDeleteModal(true);
  };

  const handleLike = () => {
    //handle logic, add a follower and fill the heart with red
    setLiked(!liked);
  };

  return (
    <div className="Icons">
      {isAdmin ? (
        <div className="adminIcons">
          <Tooltip title="Edit">
            <EditOutlinedIcon onClick={handleEdit} />
          </Tooltip>
          <Tooltip title="Delete">
            <DeleteForeverOutlinedIcon onClick={handleDelete} />
          </Tooltip>
        </div>
      ) : (
        <div className="userIcons">
          {liked ? (
            <FavoriteIcon
              className="heartIcon filled"
              sx={{ color: "red" }}
              onClick={handleLike}
            />
          ) : (
            <FavoriteBorderOutlinedIcon
              className="heartIcon outlined"
              sx={{ color: "#FFC857" }}
              onClick={handleLike}
            />
          )}
        </div>
      )}
      <Dialog open={showDeleteModal} onClose={() => setShowDeleteModal(false)}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this item?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowDeleteModal(false)}>Cancel</Button>
          <Button color="error">Delete</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Icons;
