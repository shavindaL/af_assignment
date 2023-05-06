import React, { useEffect } from "react";
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
import { useParams } from "react-router";

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

const UpdateCandidateForm = () => {
  const { id } = useParams();

  const [name, setName] = useState()
  const [phoneNo, setPhoneNo] = useState()
  const [nic, setNic] = useState()
  const [prevGender, setPrevGender] = useState()
  const [position, setPosition] = useState()
  const [biography, setBiography] = useState()
  const [politicalPartyId, setPoliticalPartyId] = useState()
  const [prevProvince, setPrevProvince] = useState()
  const [prevelection, setPrevElection] = useState()
  const [number, setNumber] = useState()


  useEffect(() => {
    const getData = async () => {
      const res = await fetch(`http://localhost:5000/api/v1/candidates/${id}`);
      const json = await res.json();

      if (res.ok) {
        setName(json.name)
        setPhoneNo(json.phoneNo)
        setNic(json.nic)
        setPrevGender(json.gender)
        setPosition(json.position)
        setBiography(json.biography)
        setPoliticalPartyId(politicalPartyId)
        setPrevProvince(province)
      }
    }

    getData()
  }, [])



  const [emailAlert, setEmailAlert] = useState("");
  const [phoneAlert, setPhoneAlert] = useState("");

  const [value, setValue] = useState(dayjs('2022-04-17'));

  return (
    <div className="App__form">
      <p
        className="w-fit h-fit mt-[10px] flex text-[38px] font-[400]"
        style={{ fontFamily: "Roboto" }}
      >
        Candidate : {name}
      </p>

      {emailAlert && <div class="text-danger mt-1 mb-3">{emailAlert}</div>}

      <form >
        <div style={{ marginBottom: "15px", width: "700px" }}>
        <FormLabel>Full Name</FormLabel>

          <TextField
            name="name"
            variant="outlined"
            fullWidth
            value={name}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Phone Number</FormLabel>
          <TextField
            variant="outlined"
            name="phoneNo"
            fullWidth
            value={phoneNo}
          />
        </div>

        <div style={{ marginBottom: "10px", width: "700px" }}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DemoContainer components={["DatePicker"]}>
              <div>
                <FormLabel>NIC</FormLabel>
                <TextField
                  variant="outlined"
                  name="nic"
                  fullWidth
                  value={nic}
                />
              </div>
              <div>
                <FormLabel>Gender</FormLabel>
                <TextField
                  select
                  style={{ width: "325px" }}
                  name="gender"
                  defaultValue="Male"
                  SelectProps={{
                    native: true,
                  }}
                >
                  {gender.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </TextField>
              </div>

              <div>
                <FormLabel>Date of Birth</FormLabel>
                <DatePicker             
                  value={value}
                  onChange={(newValue) => setValue(newValue)}
                />
              </div>
            </DemoContainer>
          </LocalizationProvider>
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Email</FormLabel>
          <TextField
            variant="outlined"
            name="email"
            fullWidth
            value={1}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Position</FormLabel>
          <TextField
            variant="outlined"
            name="position"
            fullWidth
            value={position}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Biography</FormLabel>
          <TextField
            multiline
            variant="outlined"
            name="biography"
            fullWidth
            value={biography}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Political Party Id</FormLabel>
          <TextField
            multiline
            variant="outlined"
            name="politicalPartyId"
            fullWidth
            value={politicalPartyId}
          />
        </div>

        <div style={{ marginBottom: "15px", width: "700px" }}>
          <FormLabel>Province</FormLabel>
          <TextField
            select
            name="province"
            defaultValue={prevProvince}
            fullWidth
            SelectProps={{
              native: true,
            }}
          >
            {province.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </TextField>
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
            Update Account
          </Button>
        </div>
      </form>
    </div>
  );
};
export default UpdateCandidateForm;

