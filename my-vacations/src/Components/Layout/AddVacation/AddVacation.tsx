import React from "react";
import { ThemeProvider } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import Vacation from "../../../Model/Vacation";
import { theme } from "../../Layout/Register/Register";
import { DateRangePicker } from "@mui/x-date-pickers-pro"
import "./AddVacation.css";


function AddVacation(): JSX.Element {
    let allVacations: Vacation[] = [];
    type FormData = {
        // id: number,
        destination: string,
        startDate: Date,
        endDate: Date,
        vacDesc: string,
        vacPrice: number,
        vacImg: string,
      }
      // This will be the schema for the form, it'll be used to validate the form when submitting.
      //z.coerce.date() is used to convert the string to a date object.
      const schema: ZodType<FormData> = z.object({
        destination: z.string().min(2, {message: 'Destination must have at least 2 characters'}).nonempty(),
        startDate: z.coerce.date().refine((data) => data > new Date(), {message: 'Start date must be in the future'}),
        endDate: z.coerce.date(),
        vacDesc: z.string().min(2).nonempty(),
        vacPrice: z.number().positive().max(1000),
        vacImg: z.string().nonempty()
      }).refine((data) => data.startDate < data.endDate, {message: 'End date must be after start date',
      path: ['endDate']});
      const navigate = useNavigate();
      const { register, handleSubmit, trigger ,formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});
      const onSubmit = (data: FormData) => {
            console.log("submitting...")
            console.log(errors);
            const newVacation = new Vacation(data.destination, data.startDate, data.endDate, data.vacDesc, data.vacPrice, data.vacImg);
            allVacations.push(newVacation);
            console.log(data);
            console.log(`allVacations: ${allVacations}`)
            navigate("/vacationList")
      }

    return (
        <div className="AddVacation">
			<ThemeProvider theme={theme}>
            <form className="addVacationForm" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">Add a new Vacation</Typography>
            <TextField type="text" label="Destination" {...register("destination")} error={!!errors.destination} helperText={errors.destination?.message}
            onBlur={()=>trigger('destination')}/>
            <div>
                <Typography variant="subtitle2">Start Date</Typography>
                <TextField type="date" {...register("startDate")} error={!!errors.startDate} helperText={errors.startDate?.message} 
                onBlur={() => trigger('startDate')}/>
            </div>
            <div>
                <Typography variant="subtitle2">End Date</Typography>
                <TextField type="date" {...register("endDate")} error={!!errors.endDate} helperText={errors.endDate?.message}
                onBlur={() => trigger('endDate')}/>
            </div>
            <TextField type="text" label="Description" {...register("vacDesc")}/>
            {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
            <TextField type="number" label="Price" {...register('vacPrice', {valueAsNumber: true})}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
                ),
            }} error={!!errors.vacPrice} helperText={errors.vacPrice ? errors.vacPrice.message : ''} onBlur={() => trigger('vacPrice')}
            />
            <TextField type="text" label="Image URL" {...register("vacImg")}/>
            <Button variant="contained" size="large" color="primary" type="submit"><Typography>Add Vacation</Typography></Button> <br />
            </form>
            </ThemeProvider>
        </div>
    );
}

export default AddVacation;
