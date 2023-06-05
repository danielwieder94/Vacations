import React, { useEffect, useMemo, useState } from "react";
import { userIsAdmin } from "../../../Utils/authUtils";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
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
import axios from "axios";
import { vacationlyStore } from "../../Redux/VacationlyStore";

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
    console.log("delete icon is clicked...");
    setShowDeleteModal(true);
  };
  const confirmDelete = () => {
    onDelete();
    setShowDeleteModal(false);
  };

  const handleLike = () => {
    const userId = vacationlyStore.getState().users.user[0].id;
    const requestData = {
      userId: userId,
      vacationId: vacationId,
    };
    try {
      axios.post("http://localhost:4000/api/v1/likes/addLike", requestData);
      console.log("like icon is clicked...");
      setLiked(!liked);
    } catch (error) {
      console.log(error);
    }
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
          <Button onClick={confirmDelete} color="error">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Icons;
