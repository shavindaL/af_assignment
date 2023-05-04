import React from "react";
import TextField from "@mui/material/TextField";

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
  const onSubmit = async({name,phoneNo,nic,email,password,position,biography,province}) =>{
    const response = await fetch('http://localhost:5000/api/v1/candidates/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({name,phoneNo,nic,email,password,position,biography,province}),
    });

    const json = await response.json();

      if (res.status === 200) {
        // redirect
        window.Location("https://www.youtube.com/watch?v=4MrbfGSFY2A&ab_channel=BeierLuo")
      } else {
        // display an error
      }
  }

  return (
    <div className="App__form">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div style={{ marginBottom: "10px", width: "500px" }}>
          <TextField
            id="outlined"
            name="name"
            label="Full Name"
            variant="outlined"
            {...register("name", { required: "*required." })}
            error={Boolean(errors.name)}
            helperText={errors.name?.message}
          />
        </div>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            label="Phone Number"
            variant="outlined"
            name="phoneNo"
            {...register("phoneNo", { required: "*required." })}
            error={Boolean(errors.phoneNo)}
            helperText={errors.phoneNo?.message}
          />
        </div>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            label="NIC"
            variant="outlined"
            name="nic"
            {...register("nic", { required: "*required." })}
            error={Boolean(errors.nic)}
            helperText={errors.nic?.message}
          />
        </div>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            label="Email"
            variant="outlined"
            name="email"
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

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            label="Password"
            variant="outlined"
            name="password"
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

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            label="Position"
            variant="outlined"
            name="position"
            {...register("position")}
          />
        </div>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <TextField
            id="outlined"
            multiline
            label="Biography"
            variant="outlined"
            name="biography"
            {...register("biography", {
              required: "*required.",
            })}
            error={Boolean(errors.biography)}
            helperText={errors.biography?.message}
          />
        </div>

        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Province"
            name="province"
            defaultValue="Western Province"
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

        <div>
          <TextField
            id="outlined-select-currency-native"
            select
            label="Election"
            name="election"
            defaultValue="2023"
            SelectProps={{
              native: true,
            }}
            {...register("zzzzzzzzzzzz")}
            helperText="Select The election"
          >
            {election.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>

          <TextField
            id="outlined"
            name="Number"
            label="number"
            variant="outlined"
            {...register("number")}
            error={Boolean(errors.number)}
            helperText={errors.number?.message}
          />
        </div>

        <h1 style={{ marginBottom: "20px" }}>Profile Image</h1>

        <div>
          <input accept="image/*" type="file" />
        </div>




        <Button
          variant="contained"
          color="primary"
          type="submit"
          className="btns"
        >
          create new account
        </Button>
      </form>
    </div>
  );
};
export default CandidateAccountCreation;
