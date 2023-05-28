import React, { useState } from "react";
import { userIsAdmin } from "../../../Utils/authUtils";
import { useNavigate } from "react-router-dom";
import "./Icons.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPenToSquare, faTrash } from "@fortawesome/free-solid-svg-icons";
import FavoriteBorderOutlinedIcon from "@mui/icons-material/FavoriteBorderOutlined";
import FavoriteIcon from "@mui/icons-material/Favorite";

interface IconProps {
  vacationId?: number;
}

function Icons({ vacationId }: IconProps): JSX.Element {
  const navigate = useNavigate();
  const [liked, setLiked] = useState<boolean>(false);
  const handleEdit = () => {
    navigate(`/editVacation/${vacationId}`);
  };
  const handleDelete = () => {
    //handle logic. I want to open a modal to confirm the delete
  };
  const handleLike = () => {
    //handle logic, add a follower and fill the heart with red
    setLiked(!liked);
  };
  return (
    <div className="Icons">
      {userIsAdmin() ? (
        <div className="adminIcons">
          <FontAwesomeIcon
            icon={faPenToSquare}
            size="xs"
            onClick={handleEdit}
          />
          <FontAwesomeIcon icon={faTrash} size="xs" />
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
    </div>
  );
}

export default Icons;
