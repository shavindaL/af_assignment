import React from "react";
import dayjs from "dayjs";

import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

import { useState } from "react";

import {
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  FormHelperText,
  FormGroup,
  Checkbox,
} from "@mui/material";
import { useForm } from "react-hook-form";

const election = [
  {
    value: "2023",
    label: "2023",
  },
  {
    value: "2019",
    label: "2019",
  },
];

const gender = [
  {
    value: "Male",
    label: "Male",
  },
  {
    value: "Female",
    label: "Femal",
  },
  {
    value: "Other",
    label: "Other",
  },
];

const province = [
  {
    value: "Western Province",
    label: "Western Province",
  },
  {
    value: "Central",
    label: "Central",
  },
  {
    value: "Eastern",
    label: "Eastern",
  },
  {
    value: "North Central",
    label: "North Central",
  },
  {
    value: "Northern",
    label: "Northern",
  },
  {
    value: "North Western",
    label: "North Western",
  },
  {
    value: "Sabaragamuwa",
    label: "Sabaragamuwa",
  },
  {
    value: "Southern",
    label: "Southern",
  },
  {
    value: "Uva",
    label: "Uva",
  },
];

const CandidateAccountCreation = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const [emailAlert, setEmailAlert] = useState("");
  const [phoneAlert, setPhoneAlert] = useState("");

  const [value, setValue] = useState(dayjs('2022-04-17'));


  const onSubmit = async ({
    name,
    phoneNo,
    nic,
    gender,
    // value,
    email,
    password,
    position,
    biography,
    politicalPartyId,
    province,
    election,
    number,
  }) => {

    console.log(name,value,gender)
    const response = await fetch("http://localhost:5000/api/v1/candidates/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phoneNo,
        nic,
        gender,
        // dob,
        email,
        password,
        position,
        biography,
        politicalPartyId,
        province,
        election,
        number,
      }),
    });

    const msg = await response.text();

    if (msg === "Sorry, this email is already taken") {
      // redirect
      setEmailAlert(msg);
    } else if (msg === "Sorry, this NIC is already taken") {
      setEmailAlert(msg);
    } else {
      setEmailAlert(msg);
      // Reload the page
      window.location.reload();
    }
  };

  return (
    <div className="App__form">
      {/* {emailAlert || phoneAlert && <Alert severity="error">
  <AlertTitle>Error</AlertTitle>
  {emailAlert}<strong>check it out!</strong>
</Alert>} */}

      {emailAlert && <div class="text-danger mt-1 mb-3">{emailAlert}</div>}

      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            name="name"
            label="Full Name"
            variant="outlined"
            fullWidth
            {...register("name", { required: "*required." })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="Phone Number"
            variant="outlined"
            name="phoneNo"
            fullWidth
            {...register("phoneNo", { required: "*required." })}
            error={Boolean(errors.phoneNo)}
            helperText={errors.phoneNo?.message}
          />
        </div>

        {/* <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="NIC"
            variant="outlined"
            name="nic"
            fullWidth
            {...register("nic", { required: "*required." })}
            error={Boolean(errors.nic)}
            helperText={errors.nic?.message}
          />
        </div> */}

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <TextField
                label="NIC"
                variant="outlined"
                name="nic"
                fullWidth
                {...register("nic", { required: "*required." })}
                error={Boolean(errors.nic)}
                helperText={errors.nic?.message}
              />
              <TextField
                select
                style={{ width: "325px" }}
                label="Gender"
                name="gender"
                defaultValue="Male"
                SelectProps={{
                  native: true,
                }}
                {...register("gender")}
                helperText="Select The Gender"
              >
                {gender.map((option) => (
                  <option key={option.value} value={option.value}>
                    {option.label}
                  </option>
                ))}
              </TextField>

              <DatePicker
                label="Date of Birth"
                value={value}
          onChange={(newValue) => setValue(newValue)}
              />
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="Email"
            variant="outlined"
            name="email"
            fullWidth
            {...register("email", {
              required: "*required.",
              pattern: {
                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                message: "Invalid email address",
              },
            })}
            error={Boolean(errors.email)}
            helperText={errors.email?.message}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="Password"
            variant="outlined"
            name="password"
            fullWidth
            {...register("password", {
              required: "*required.",
              pattern: {
                value:
                  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/,
                message: "Invalid Password",
              },
            })}
            error={Boolean(errors.password)}
            helperText={errors.password?.message}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="Position"
            variant="outlined"
            name="position"
            fullWidth
            {...register("position")}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            multiline
            label="Biography"
            variant="outlined"
            name="biography"
            fullWidth
            {...register("biography", {
              required: "*required.",
            })}
            error={Boolean(errors.biography)}
            helperText={errors.biography?.message}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            multiline
            label="political Party Id"
            variant="outlined"
            name="politicalPartyId"
            fullWidth
            {...register("politicalPartyId", {
              required: "*required.",
            })}
            error={Boolean(errors.politicalPartyId)}
            helperText={errors.politicalPartyId?.message}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            select
            label="Province"
            name="province"
            defaultValue="Western Province"
            fullWidth
            SelectProps={{
              native: true,
            }}
            {...register("province")}
            helperText="Select The province"
          >
            {province.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
        </div>

        <h1 style={{ marginBottom: "20px" }}>Voting Number</h1>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            select
            style={{ width: "325px", marginRight: "50px" }}
            label="Election"
            name="election"
            defaultValue="2023"
            SelectProps={{
              native: true,
            }}
            {...register("election")}
            helperText="Select The election"
          >
            {election.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            name="Number"
            label="number"
            variant="outlined"
            style={{ width: "325px" }}
            {...register("number")}
            error={Boolean(errors.number)}
            helperText={errors.number?.message}
          />
        </div>

        <h1 style={{ marginBottom: "20px" }}>Profile Image</h1>

        <div>
          <input accept="image/*" type="file" />
        </div>

        <div
          style={{
            marginTop: "50px",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "700px",
          }}
        >
          <Button
            variant="contained"
            color="primary"
            type="submit"
            className="btns"
          >
            create new Candidate Account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default CandidateAccountCreation;
