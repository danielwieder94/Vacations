import { Button, Link, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form"
import { useNavigate } from "react-router-dom";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "./Register.css";
import { z, ZodType } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

export const theme = createTheme({
        palette: {
          primary: {
            main: '#5EB4FF',
          },
          secondary: {
            main: '#ffa95e',
          },
        },
});

function Register(): JSX.Element {
  type FormData = {
    firstName: string,
    lastName: string,
    email: string,
    password: string,
    confirmPassword: string
  }
  //This will be the schema for the form, it'll be used to validate the form when submitting.
  const schema: ZodType<FormData> = z.object({
    firstName: z.string().min(2,{message: 'Must contain at least 2 characters'}).max(100).nonempty(),
    lastName: z.string().min(2,{message: 'Must contain at least 2 characters'}).max(100).nonempty(),
    email: z.string().email().nonempty(),
    password: z.string().min(4,{message: 'Password must contain at least 4 characters'}).nonempty(),
    confirmPassword: z.string().min(4,{message: 'Password must contain at least 4 characters'}).nonempty()
}).refine((data) => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['confirmPassword'],
})
    const navigate = useNavigate()
    const { register, handleSubmit, trigger ,formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});
    const onSubmit = (data: FormData) => {
        console.log(data);
        navigate("/vacationList")
    }
    return (
      //onBlur to show the error message dynamically before form submits the form.
        <ThemeProvider theme={theme}>
        <div className="Register">
            <form className="regForm" onSubmit={handleSubmit(onSubmit)}>
                <Typography variant="h4">Sign Up</Typography>
                <TextField type="text" label="First Name" {...register("firstName")} error={!!errors.firstName} helperText={errors.firstName ? errors.firstName.message : ''}
                onBlur={()=>{trigger('firstName')}}/>
                <TextField type="text" label="Last name"{...register("lastName")}  error={!!errors.lastName} helperText={errors.lastName ? errors.lastName.message : ''}
                onBlur={()=>{trigger('lastName')}}/>
                <TextField type="text" label="Email" {...register("email")} error={!!errors.email} helperText={errors.email ? errors.email.message : ''}
                onBlur={()=>{trigger('email')}}/>
                <TextField type="password" label="Password" {...register("password")} error={!!errors.password} helperText={errors.password ? errors.password.message : ''}
                onBlur={()=>{trigger('password')}}/>
                <TextField type="password" label="Confirm password" {...register("confirmPassword")} error={!!errors.confirmPassword} helperText={errors.confirmPassword ? errors.confirmPassword.message : ''} 
                onBlur={()=>{trigger('confirmPassword')}}/>
                <Button variant="contained" size="large" color="primary" type="submit"><Typography>Register</Typography></Button> <br />
                <span>Already have a user?</span><Link underline="none" component="button" className="loginBtn" onClick={()=>navigate("/login")}>Login</Link>
            </form>
        </div>
        </ThemeProvider>
    );
}

export default Register;
