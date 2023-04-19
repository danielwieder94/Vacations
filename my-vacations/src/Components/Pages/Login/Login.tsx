import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { ThemeProvider} from "@mui/material/styles";
import { theme } from "../Register/Register"
import { Alert, Button, Link, TextField, Typography } from "@mui/material";
import { z, ZodType } from "zod"
import { zodResolver } from "@hookform/resolvers/zod";
import axios from "axios";

function Login(): JSX.Element {
    const [errorMsg, setErrorMsg] = useState('');
    type FormData = {
        email: string,
        password: string,
      }
      //This will be the schema for the form, it'll be used to validate the form when submitting.
    const schema: ZodType<FormData> = z.object({
        email: z.string().email().nonempty(),
        password: z.string().min(4,{message: 'Password must contain at least 4 characters'}).nonempty()
    })
    const { register, handleSubmit, trigger, formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});
    const navigate = useNavigate()
    const onSubmit = async (data: FormData) => {
        try {
        const response = await axios.post<FormData>("http://localhost:4000/api/v1/users/login", data);
        console.log(response.data)
        navigate("/vacationList");
    } catch (err: any) {
        err.response.status === 401 ? setErrorMsg("Invalid email or password") : setErrorMsg(err.response.data.message);
        console.log(err.response.status)
        console.log("error occured in login component: ", err);
    }
    }
    return (
        <ThemeProvider theme={theme}>
        <div className="Login" onSubmit={handleSubmit(onSubmit)}>
            {errorMsg && (
            <Alert severity="error" onClose={() => setErrorMsg('')}>
                {errorMsg}
                </Alert>)}
			<form className="logForm">
                <Typography variant="h4">Login</Typography>
                <TextField type="text" label="Email" {...register("email")} error={!!errors.email} helperText={errors.email?.message}
                onBlur={()=>{trigger('email')}}/>
                <TextField type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password?.message}
                onBlur={()=>{trigger('password')}}/>
                <Button variant="contained" size="large" color="primary" type="submit"><Typography>Login</Typography></Button>
                <span>Don't have a user?</span><Link underline="none" component="button" className="registerBtn" onClick={()=>navigate("/register")}>Register</Link>
                
            </form>
        </div>
        </ThemeProvider>
    );
}

export default Login;
