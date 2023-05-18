import React, { useEffect, useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../Layout/Theme/Theme";
import {
  Alert,
  Button,
  Link,
  Snackbar,
  TextField,
  Typography,
} from "@mui/material";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRightToBracket } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { downloadUsers, isLoggedIn } from "../../Redux/UserReducer";

function Login(): JSX.Element {
  const dispatch = useDispatch();
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  type FormData = {
    email: string;
    password: string;
  };
  //This will be the schema for the form, it'll be used to validate the form when submitting.
  const schema: ZodType<FormData> = z.object({
    email: z.string().email().nonempty(),
    password: z
      .string()
      .min(4, { message: "Password must contain at least 4 characters" })
      .nonempty(),
  });
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const navigate = useNavigate();
  const onSubmit = async (data: FormData) => {
    try {
      const response = await axios.post(
        "http://localhost:4000/api/v1/users/login",
        data
      );
      const { user } = response.data;
      dispatch(downloadUsers({ ...user, password: "Confidential" }));
      dispatch(isLoggedIn(true));
      setSuccessMsg("Logged in successfully");
      navigate("/vacationList");
    } catch (err: any) {
      err.response.status === 401
        ? setErrorMsg("Invalid email or password")
        : setErrorMsg(err.response.message);
    }
  };
  useEffect(() => {
    if (errorMsg) {
      const timeout = setTimeout(() => {
        setErrorMsg("");
      }, 5000);
      return () => clearTimeout(timeout);
    }
  }, [errorMsg]);

  return (
    <ThemeProvider theme={theme}>
      <div className="Login" onSubmit={handleSubmit(onSubmit)}>
        {errorMsg && (
          <Snackbar
            open={!!errorMsg}
            autoHideDuration={600}
            anchorOrigin={{ vertical: "bottom", horizontal: "left" }}
          >
            <Alert severity="error" onClose={() => setErrorMsg("")}>
              {errorMsg}
            </Alert>
          </Snackbar>
        )}
        {/* <UserMsg errorMsg={errorMsg} successMsg={successMsg} /> */}
        <form className="logForm">
          <Typography variant="h4">
            Login{" "}
            <FontAwesomeIcon
              icon={faArrowRightToBracket}
              style={{ color: "#FFC857" }}
            />
          </Typography>
          <TextField
            type="text"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email?.message}
            onBlur={() => {
              trigger("email");
            }}
          />
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password?.message}
            onBlur={() => {
              trigger("password");
            }}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
          >
            <Typography>Login</Typography>
          </Button>
          <span>Don't have a user?</span>
          <Link
            underline="none"
            component="button"
            className="registerBtn"
            onClick={() => navigate("/register")}
          >
            Register
          </Link>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Login;
