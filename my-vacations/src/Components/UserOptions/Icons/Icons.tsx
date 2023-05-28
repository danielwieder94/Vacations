import React, { useEffect, useMemo, useState } from "react";
import { userIsAdmin } from "../../../Utils/authUtils";
import { useNavigate } from "react-router-dom";
import EditOutlinedIcon from "@mui/icons-material/EditOutlined";
import DeleteForeverOutlinedIcon from "@mui/icons-material/DeleteForeverOutlined";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";
import DeletePopup from "./DeletePopup/DeletePopup";
import "./Icons.css";
import { Tooltip } from "@mui/material";

interface IconProps {
  vacationId?: number;
  destination?: string;
}

function Icons({ vacationId, destination }: IconProps): JSX.Element {
  const isAdmin = useMemo(() => userIsAdmin(), []); //memorize userIsAdmin() value to reduce re-renders
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);
  const [isPopupOpen, setIsPopupOpen] = useState<boolean>(false);
  const handleEdit = () => {
    navigate(`/editVacation/${vacationId}`);
  };
  const handleDelete = () => {
    //handle logic. I want to open a modal to confirm the delete
    setIsPopupOpen(true);
    console.log("delete icon is clicked...");
  };
  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };
  const handleConfirmDelete = () => {
    handleClosePopup();
  };
  const handleLike = () => {
    //handle logic, add a follower and fill the heart with red
    setLiked(!liked);
  };

  useEffect(() => {
    console.log("isPopupOpen: ", isPopupOpen);
  }, [isPopupOpen]);
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
          {isPopupOpen && (
            <DeletePopup
              isOpen={isPopupOpen}
              handleClose={handleClosePopup}
              handleConfirm={handleConfirmDelete}
              destination={destination}
            />
          )}
        </div>
      )}
    </div>
  );
}

export default Icons;
