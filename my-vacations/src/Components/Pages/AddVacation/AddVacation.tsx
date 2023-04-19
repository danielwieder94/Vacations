import React, { useRef, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ZodType, z } from "zod";
import Vacation from "../../../Model/Vacation";
import { theme } from "../Register/Register";
import {MdCloudUpload, MdDelete} from 'react-icons/md';
import "./AddVacation.css";
import axios from "axios";
import { DatePicker, DateValidationError, LocalizationProvider, enUS } from "@mui/x-date-pickers-pro";
import { AdapterDayjs } from "@mui/x-date-pickers-pro/AdapterDayjs";
import dayjs from "dayjs";
import 'dayjs/locale/en-gb'



function AddVacation(): JSX.Element {
    const [allVacations, setAllVacations] = useState<Vacation[]>([]);
    const [vacFile, setVacFile] = useState<File | null>(null);
    const [image, setImage] = useState<string>('');
    const [error, setError] = useState<DateValidationError | null>(null);
    type FormData = {
        // id: number,
        destination: string,
        startDate: Date,
        endDate: Date,
        vacDesc: string,
        vacPrice: number,
        // vacFile: File,
        vacImg: string,
      }
      // This will be the schema for the form, it'll be used to validate the form when submitting.
      //z.coerce.date() is used to convert the string to a date object.
    const schema: ZodType<FormData> = z.object({
        destination: z.string().min(2, {message: 'Destination must have at least 2 characters'}).nonempty(),
        startDate: z.coerce.date().refine((data) => data > new Date(), {message: 'Start date must be in the future'}).transform((data) =>new Date(data)),
        endDate: z.coerce.date(),
        vacDesc: z.string().min(2).nonempty(),
        vacPrice: z.number().positive().max(10000, {message: 'Price must be equal to or less than $10,000'}),
        vacImg: z.string().nonempty(),
        // vacFile: z.instanceof(File),
        }).refine((data) => data.startDate < data.endDate, {message: 'End date must be after start date',
        path: ['endDate']});

    const today = dayjs();
    const tomorrow = today.add(1, 'day');
    const navigate = useNavigate();
    const { register, handleSubmit, trigger ,formState: { errors } } = useForm<FormData>({resolver: zodResolver(schema)});
    const onSubmit = async (data: FormData) => {
        const newVacation = new Vacation(data.destination, data.startDate, data.endDate, data.vacDesc, data.vacPrice, vacFile?.name || '');
        console.log("submitting...", newVacation)
        setAllVacations([...allVacations, newVacation]);
        try {
            const response = await axios.post<FormData>("http://localhost:4000/api/v1/vacations/add", {newVacation});
            console.log(response.data);
            navigate("/vacationList");
        } catch (err) {
            console.log("error occured in onSubmit function: ", err);
        }
        console.log('newVacation:', newVacation)
        navigate("/vacationList")
    }
    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {  
        const file = e.target.files![0];
        if (!file){
            return 'No file selected';
        }
        setVacFile(file);
        setImage(URL.createObjectURL(file));
    }
    const inputRef = useRef<HTMLInputElement | null>(null);
    const handleClick = () => {
        inputRef.current?.click();
    }
    const handleDelete = () => {
        setVacFile(null);
        setImage('');
        if(inputRef.current){
            inputRef.current.value = '';
        }
    }

    return (
        <div className="AddVacation">
			<ThemeProvider theme={theme}>
            <form className="addVacationForm" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">Add a new Vacation</Typography>
            <TextField className="destination" type="text" label="Destination" 
            {...register("destination")} error={!!errors.destination} helperText={errors.destination?.message}
            onBlur={()=>trigger('destination')}/>
            <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en-gb">
                <DatePicker label='Start Date' onError={(newError) => setError(newError)}
                slotProps={{
                    textField: {
                        helperText: errors.startDate?.message,
                    },
                }} 
                onAccept={()=> trigger('startDate')}
                minDate={today}/>
                <DatePicker label='End Date' minDate={tomorrow}/>
            </LocalizationProvider>
            <TextField multiline minRows={1} className="desc" type="text" label="Description"
                {...register('vacDesc')}/>
            {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
            <TextField style={{width: '50%', alignSelf:'center'}} type="number" label="Price" 
            {...register('vacPrice', {valueAsNumber: true})}
            InputProps={{
                startAdornment: (
                <InputAdornment position="start">$</InputAdornment>
                ),
            }} error={!!errors.vacPrice} helperText={errors.vacPrice ? errors.vacPrice.message : ''} 
            onBlur={() => trigger('vacPrice')}/>
            <div className="fileInput" onClick={handleClick}>
                <input accept="image/*" type="file" id="image-file" ref={inputRef} className="input-field" onChange={handleImageChange} hidden/>
                {image ? <img src={image} width={'100%'} height={'100%'} alt={File.name}/> : <MdCloudUpload size={50} color="#5EB4FF"/> }
                <input type="text"  style={{display:'none'}} value={('vacImg')} {...register('vacImg')}/>
            </div>
            <span>
                {image && (
                <>
                    <Typography variant="subtitle2">{vacFile?.name}</Typography>
                    <MdDelete onClick={handleDelete}/>
                </>
                )}
            </span>
            <Button variant="contained" size="large" color="primary" type="submit"><Typography>Add Vacation</Typography></Button> <br />
            </form>
            </ThemeProvider>
        </div>
    );
}

export default AddVacation;
