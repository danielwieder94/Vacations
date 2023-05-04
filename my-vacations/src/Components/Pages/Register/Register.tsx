import React from "react";
import { Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { theme } from "../../Layout/Theme/Theme";
import "./Register.css";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useDispatch } from "react-redux";
import { addUser, isLoggedIn } from "../../Redux/UserReducer";
import User from "../../../Model/User";

function Register(): JSX.Element {
  const dispatch = useDispatch();
  type FormData = {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
    confirmPassword: string;
  };
  //This will be the schema for the form, it'll be used to validate the form when submitting.
  const schema: ZodType<FormData> = z
    .object({
      firstName: z
        .string()
        .min(2, { message: "Must contain at least 2 characters" })
        .max(100)
        .nonempty(),
      lastName: z
        .string()
        .min(2, { message: "Must contain at least 2 characters" })
        .max(100)
        .nonempty(),
      email: z.string().email().nonempty(),
      password: z
        .string()
        .min(4, { message: "Password must contain at least 4 characters" })
        .nonempty(),
      confirmPassword: z
        .string()
        .min(4, { message: "Password must contain at least 4 characters" })
        .nonempty(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    });
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const onSubmit = async (data: FormData) => {
    try {
      const newUser: User = {
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: data.password,
        isAdmin: false,
        id: 0,
        vacations: [],
      };
      const response = await axios.post<User>(
        "http://localhost:4000/api/v1/users/register",
        newUser
      );
      console.log(response.data);
      dispatch(addUser(response.data));
      dispatch(isLoggedIn(true));
      navigate("/vacationList");
    } catch (err) {
      console.log("error occured in register component: ", err);
    }
  };
  return (
    //onBlur to show the error message dynamically before form submits the form.
    //error={!!errors.fieldName} is used to show the error in red color (MUI)
    <ThemeProvider theme={theme}>
      <div className="Register">
        <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
          <Typography variant="h4">
            Sign Up{" "}
            <FontAwesomeIcon icon={faUserPlus} style={{ color: "#FFC857" }} />
          </Typography>
          <TextField
            type="text"
            label="First Name"
            {...register("firstName")}
            error={!!errors.firstName}
            helperText={errors.firstName ? errors.firstName.message : ""}
            onBlur={() => {
              trigger("firstName");
            }}
          />
          <TextField
            type="text"
            label="Last name"
            {...register("lastName")}
            error={!!errors.lastName}
            helperText={errors.lastName ? errors.lastName.message : ""}
            onBlur={() => {
              trigger("lastName");
            }}
          />
          <TextField
            type="text"
            label="Email"
            {...register("email")}
            error={!!errors.email}
            helperText={errors.email ? errors.email.message : ""}
            onBlur={() => {
              trigger("email");
            }}
          />
          <TextField
            type="password"
            label="Password"
            {...register("password")}
            error={!!errors.password}
            helperText={errors.password ? errors.password.message : ""}
            onBlur={() => {
              trigger("password");
            }}
          />
          <TextField
            type="password"
            label="Confirm password"
            {...register("confirmPassword")}
            error={!!errors.confirmPassword}
            helperText={
              errors.confirmPassword ? errors.confirmPassword.message : ""
            }
            onBlur={() => {
              trigger("confirmPassword");
            }}
          />
          <Button
            variant="contained"
            size="large"
            color="secondary"
            type="submit"
          >
            <Typography>Register</Typography>
          </Button>
          <span>Already have a user?</span>
          <Link
            underline="none"
            component="button"
            className="loginBtn"
            onClick={() => navigate("/login")}
          >
            Login
          </Link>
        </form>
      </div>
    </ThemeProvider>
  );
}

export default Register;
