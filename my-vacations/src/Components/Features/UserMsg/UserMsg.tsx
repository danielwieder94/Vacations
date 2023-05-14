import React, { useEffect, useState } from "react";
import { Snackbar, Alert } from "@mui/material";
import "./UserMsg.css";

interface msgProps {
  message: string;
}

function UserMsg({ message: msgProps }: msgProps): JSX.Element {
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");

  return (
    <div className="UserMsg">
      <Snackbar
        open={!!errorMsg}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setErrorMsg("")}
      >
        <Alert severity="error" onClose={() => setErrorMsg("")}>
          {errorMsg}
        </Alert>
      </Snackbar>

      <Snackbar
        open={!!successMsg}
        autoHideDuration={6000}
        anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
        onClose={() => setSuccessMsg("")}
      >
        <Alert severity="success" onClose={() => setSuccessMsg("")}>
          {successMsg}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default UserMsg;
