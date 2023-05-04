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
  const onSubmit = async ({
    name,
    phoneNo,
    nic,
    email,
    password,
    position,
    biography,
    politicalPartyId,
    province,
    election,
    number,
  }) => {
    const response = await fetch("http://localhost:5000/api/v1/candidates/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name,
        phoneNo,
        nic,
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

    const json = await response.json();

    if (response.status === 200) {
      // redirect
      console.log("DOne")
    } else {
      // display an error
    }
  };

  return (
    <div className="App__form">
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

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <TextField
            label="NIC"
            variant="outlined"
            name="nic"
            fullWidth
            {...register("nic", { required: "*required." })}
            error={Boolean(errors.nic)}
            helperText={errors.nic?.message}
          />
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
            style={{width:"325px", marginRight:"50px"}}
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
            style={{width:"325px"}}
            {...register("number")}
            error={Boolean(errors.number)}
            helperText={errors.number?.message}
          />
        </div>

        <h1 style={{ marginBottom: "20px" }}>Profile Image</h1>

        <div>
          <input accept="image/*" type="file" />
        </div>

        <div style={{marginTop:"50px",display: "flex", justifyContent:"center", alignItems: "center", width:"700px"}}>
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
