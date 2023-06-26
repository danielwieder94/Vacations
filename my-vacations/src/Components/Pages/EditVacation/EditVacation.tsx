import React, { useEffect, useRef, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import dayjs from "dayjs";
import Vacation from "../../../Model/Vacation";
import { ZodType, z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ThemeProvider } from "@emotion/react";
import { Button, InputAdornment, TextField, Typography } from "@mui/material";
import { theme } from "../../Layout/Theme/Theme";
import { MdCloudUpload, MdDelete } from "react-icons/md";
import { faUmbrellaBeach } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./EditVacation.css";
import { vacationlyStore } from "../../Redux/VacationlyStore";
import { updateVacation } from "../../Redux/VacationReducer";

function EditVacation(): JSX.Element {
  const [editedVacation, setEditedVacation] = useState<Vacation | null>(null);
  const [vacFile, setVacFile] = useState<File | null>(null);
  const [image, setImage] = useState<string>("");

  type FormData = {
    id?: number;
    destination: string;
    startDate: Date;
    endDate: Date;
    vacDesc: string;
    vacPrice: number;
    vacImg: string;
  };

  const schema: ZodType<FormData> = z
    .object({
      destination: z
        .string()
        .min(2, { message: "Destination must have at least 2 characters" })
        .nonempty(),
      startDate: z.coerce.date(),
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

  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    trigger,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema) });
  const { id } = useParams();

  useEffect(() => {
    const getVacation = async () => {
      await axios
        .get(`http://localhost:4000/api/v1/vacations/list/${id}`)
        .then((response) => {
          setEditedVacation(response.data);
          setImage(`http://localhost:4000/${id}_${response.data.vacImg}`);
        });
    };
    getVacation();
  }, [id]);

  const onSubmit = async (data: FormData) => {
    const imageData = new FormData();
    imageData.append("image", vacFile!);
    const vacationId: number | undefined = editedVacation?.id;
    const updatedVacation = new Vacation(
      editedVacation?.id!,
      data.destination,
      new Date(data.startDate),
      new Date(data.endDate),
      data.vacDesc,
      data.vacPrice,
      vacFile ? vacFile.name : editedVacation!.vacImg
    );
    updatedVacation.id = vacationId;
    axios.put(
      `http://localhost:4000/api/v1/vacations/update/${id}`,
      updatedVacation
    );
    if (editedVacation?.vacImg !== `${id}_${vacFile?.name}`) {
      axios.post(
        `http://localhost:4000/api/v1/vacations/${id}/upload`,
        imageData
      );
    }
    vacationlyStore.dispatch(updateVacation(updatedVacation));
    navigate("/vacationList");
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files![0];
    if (!file) {
      return "No file selected";
    }
    setVacFile(file);
    setImage(URL.createObjectURL(file));
  };
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
              defaultValue={editedVacation.vacDesc}
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
                defaultValue={new Date(editedVacation.startDate)
                  .toISOString()
                  .slice(0, 10)}
                type="date"
                {...register("startDate", { valueAsDate: true })}
                error={!!errors.startDate}
                helperText={errors.startDate?.message}
                onBlur={() => trigger("startDate")}
              />
              <Typography variant="subtitle2">End Date</Typography>
              <TextField
                defaultValue={new Date(editedVacation.endDate)
                  .toISOString()
                  .slice(0, 10)}
                type="date"
                {...register("endDate", { valueAsDate: true })}
                error={!!errors.endDate}
                helperText={errors.endDate?.message}
                onBlur={() => trigger("endDate")}
              />
            </div>
            {/* using valueAsNumber because the TextField component returns a string, and the schema requires a number. */}
            <TextField
              defaultValue={editedVacation.vacPrice}
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
                className="input-field visually-hidden"
                onChange={handleImageChange}
                required
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
                  <Typography variant="subtitle2">
                    {vacFile?.name
                      ? vacFile.name
                      : `${id}_${editedVacation.vacImg}`}
                  </Typography>
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
