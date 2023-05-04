import React, { useEffect, useRef, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { ZodType, z } from "zod";
import Vacation from "../../../Model/Vacation";
import { theme } from "../../Layout/Theme/Theme";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import "./EditVacation.css";
import axios from "axios";
import dayjs from "dayjs";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function EditVacation(): JSX.Element {
  const [editedVacation, setEditedVacation] = useState<Vacation>(
    {} as Vacation
  );
  //for image file
  const [vacFile, setVacFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");
  const today = dayjs().startOf("day").toDate();
  type FormData = {
    id?: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    vacDesc: string;
    vacPrice: number;
    vacImg: string;
  };
  // This will be the schema for the form, it'll be used to validate the form when submitting.
  //z.coerce.date() is used to convert the string to a date object.

  const schema: ZodType<FormData> = z
    .object({
      destination: z
        .string()
        .min(2, { message: "Destination must have at least 2 characters" })
        .nonempty(),
      startDate: z.coerce.date().refine((data) => data >= today, {
        message: "Start date must be today or in the future",
      }),
      endDate: z.coerce.date(),
      vacDesc: z
        .string()
        .min(2, { message: "Description too short" })
        .nonempty(),
      vacPrice: z
        .number()
        .positive()
        .max(10000, { message: "Price must be equal to or less than $10,000" }),
      vacImg: z.string().nonempty(),
    })
    .refine((data) => data.startDate < data.endDate, {
      message: "End date must be after start date",
      path: ["endDate"],
    });
  const { id } = useParams<{ id: string }>(); //get the id of the vacation we want to edit from the url
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });

  useEffect(() => {
    const getVacation = async () => {
      try {
        const response = await axios.get<Vacation>(
          `http://localhost:4000/api/v1/vacations/list/${id}`
        );
        setEditedVacation(response.data);
        console.log(response.data);
      } catch (error) {
        console.log(error);
      }
    };
    getVacation();
  }, [id]);

  const onSubmit = async (data: FormData) => {};

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) {
      return "No file selected";
    }
    setVacFile(file);
    setImage(URL.createObjectURL(file));
  };
  //   console.log(vacFile);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleClick = () => {
    inputRef.current?.click();
  };
  const handleDelete = () => {
    setVacFile(null);
    setImage("");
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div className="EditVacation">
      <ThemeProvider theme={theme}>
        {editedVacation && (
          <form className="editVacationForm" onSubmit={handleSubmit(onSubmit)}>
            <Typography variant="h4">
              Edit Vacation{" "}
              <FontAwesomeIcon icon={faUmbrellaBeach} color="#FFC857" />
            </Typography>
            <TextField
              defaultValue={editedVacation.destination}
              className="destination"
              type="text"
              label="Destination"
              {...register("destination")}
              error={!!errors.destination}
              helperText={errors.destination?.message}
              onBlur={() => trigger("destination")}
            />
            <TextField
              multiline
              minRows={1}
              className="desc"
              type="text"
              label="Description"
              {...register("vacDesc")}
              error={!!errors.vacDesc}
              helperText={errors.vacDesc?.message}
              onBlur={() => trigger("vacDesc")}
            />
            <div className="dateDiv">
              <Typography variant="subtitle2">Start Date</Typography>
              <TextField
                type="date"
                {...register("startDate", { valueAsDate: true })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                onBlur={() => trigger("startDate")}
              />
              <Typography variant="subtitle2">End Date</Typography>
              <TextField
                type="date"
                {...register("endDate", { valueAsDate: true })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                onBlur={() => trigger("endDate")}
              />
            </div>
            {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
            <TextField
              style={{ width: "50%", alignSelf: "center" }}
              type="number"
              label="Price"
              {...register("vacPrice", { valueAsNumber: true })}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">$</InputAdornment>
                ),
              }}
              error={!!errors.vacPrice}
              helperText={errors.vacPrice ? errors.vacPrice.message : ""}
              onBlur={() => trigger("vacPrice")}
            />
            <div className="fileInput" onClick={handleClick}>
              <input
                accept="image/*"
                type="file"
                id="image-file"
                name="image"
                ref={inputRef}
                className="input-field"
                onChange={handleImageChange}
                hidden
              />
              {image ? (
                <img
                  src={image}
                  width={"100%"}
                  height={"100%"}
                  alt={File.name}
                />
              ) : (
                <MdCloudUpload size={50} color="#0075A2" />
              )}
              {!image && <span>Upload Image</span>}
              <input
                type="text"
                style={{ display: "none" }}
                value={"vacImg"}
                {...register("vacImg")}
              />
            </div>
            <span>
              {image && (
                <>
                  <Typography variant="subtitle2">{vacFile?.name}</Typography>
                  <MdDelete onClick={handleDelete} />
                </>
              )}
            </span>
            <Button
              variant="contained"
              size="large"
              color="secondary"
              type="submit"
            >
              <Typography>Save Changes</Typography>
            </Button>
            <Button
              variant="outlined"
              size="large"
              color="info"
              type="submit"
              onClick={() => navigate("/vacationList")}
            >
              <Typography>Cancel</Typography>
            </Button>

            <br />
          </form>
        )}
      </ThemeProvider>
    </div>
  );
}

export default EditVacation;
