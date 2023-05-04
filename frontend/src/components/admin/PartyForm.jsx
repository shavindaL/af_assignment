import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  TextField,
} from "@mui/material";
import { useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";

export default function PartyForm() {
  // Set of state variables for the input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [des, setDes] = useState("");
  const [compCount, setCompCount] = useState(null);

  // Set of state variables to show error messages
  const [nameAlert, setNameAlert] = useState("");
  const [phoneAlert, setPhoneAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [leaderNameAlert, setLeaderNameAlert] = useState("");
  const [desAlert, setDesAlert] = useState("");
  const [compCountAlert, setCompCountAlert] = useState("");

  // State variables to change the error prop of TextFields
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [error6, setError6] = useState(false);

  //Function to validate the input fields
  function validateDetails() {
    // An object to check whether all input fields are valid
    let isAllValid = {
      isNameValid: false,
      isPhoneValid: false,
      isEmailValid: false,
      isLeaderNameValid: false,
      isDesValid: false,
      isCompCountValid: false,
    };

    // Validate the name state variable to be filled and contain letters only
    if (/^[a-zA-Z]+$/.test(name) == true && name !== "") {
      isAllValid.isNameValid = true;

      setNameAlert("");
      setError1(false);
    } else {
      if (name.length === 0) {
        setNameAlert("Name is required");
        setError1(true);
      } else if (/^[a-zA-Z]+$/.test(name) === false) {
        setNameAlert("Only letters are allowed");
        setError1(true);
      }

      isAllValid.isNameValid = false;
    }

    // Validate the phone state variable to be filled and contain numbers only and of length 10 only
    if (/^\d+$/.test(phone) == true && phone.length == 10) {
      isAllValid.isPhoneValid = true;
      setPhoneAlert("");
      setError2(false);
    } else {
      if (phone.length == 0) {
        setPhoneAlert("Phone number is required");
        setError2(true);
      } else if (phone.length != 10) {
        setPhoneAlert("Please enter only 10 digits");
        setError2(true);
      } else if (/^\d+$/.test(phone) == false) {
        setPhoneAlert("Please enter only numbers");
        setError2(true);
      }

      isAllValid.isPhoneValid = false;
    }

    // Validate the email state variable to be filled and check for appropriate pattern
    if (email.length == 0) {
      setEmailAlert("Email is required");
      setError3(true);

      isAllValid.isEmailValid = false;
    } else {
      if (email.match(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)) {
        setEmailAlert("");
        setError3(false);

        isAllValid.isEmailValid = true;
      } else {
        setEmailAlert("Please enter a valid email");
        setError3(true);

        isAllValid.isEmailValid = false;
      }
    }

    // Validate the leaderName state variable to be filled and check for appropriate pattern
    if (/^[a-zA-Z]+$/.test(leaderName) == true && leaderName !== "") {
      isAllValid.isLeaderNameValid = true;

      setLeaderNameAlert("");
      setError4(false);
    } else {
      if (leaderName.length === 0) {
        setLeaderNameAlert("Leader name is required");
        setError4(true);
      } else if (/^[a-zA-Z]+$/.test(leaderName) === false) {
        setLeaderNameAlert("Only letters are allowed");
        setError4(true);
      }

      isAllValid.isLeaderNameValid = false;
    }

    // Validate the des state variable to be filled
    if (des !== "") {
      isAllValid.isDesValid = true;

      setDesAlert("");
      setError5(false);
    } else {
      isAllValid.isDesValid = false;
      setDesAlert("Description is required");
      setError5(true);
    }

    // Validate the compCount state variable to be filled and contain valid values
    if (compCount === null) {
      setCompCountAlert("Competitor count is required");
      setError6(true);
      isAllValid.isCompCountValid = false;
    } else if (compCount < 0) {
      setCompCountAlert("Only positive values are allowed");
      setError6(true);
      isAllValid.isCompCountValid = false;
    } else if (compCount == 0) {
      setCompCountAlert("Value should be greater than 0");
      setError6(true);
      isAllValid.isCompCountValid = false;
    } else {
      isAllValid.isCompCountValid = true;
      setCompCountAlert("");
      setError6(false);
    }

    // Return the boolean value
    if (
      isAllValid.isNameValid === false ||
      isAllValid.isPhoneValid === false ||
      isAllValid.isEmailValid === false ||
      isAllValid.isLeaderNameValid === false ||
      isAllValid.isDesValid === false ||
      isAllValid.isCompCountValid === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Function to add a new political party
  async function addNewPoltParty(e) {
    e.preventDefault();

    // Invoke validateDetails method
    if (validateDetails() === true) {
      // Create new object
      const newPoltParty = {
        name: name,
        phone_no: phone,
        email: email,
        leader_name: leaderName,
        description: des,
        competitor_count: compCount.toString(),
      };

      // Make the loading bar visible
      document.getElementById("loadingBar").style.visibility = "visible";

      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/political-parties",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(newPoltParty),
          }
        );

        const resMsg = await res.text();

        if (resMsg === "Sorry, this email is already taken") {
          setEmailAlert(resMsg);
          setError3(true);
        } else if (resMsg === "Sorry, this phone number is already taken") {
          setPhoneAlert("Sorry, this phone number is taken");
          setError2(true);
        } else {
          // Reload the page
          window.location.reload();
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }
  }

  return (
    // Start of PartyForm component
    <>
      <Card className="w-fit h-fit border mt-[120px]  p-[10px]">
        <LinearProgress id="loadingBar" style={{ visibility: "hidden" }} />

        <CardMedia align="center" className="pt-[10px]">
          <img
            src="data:image/png;base64,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"
            alt="image"
          />
        </CardMedia>

        <Divider />

        <CardContent className="h-fit w-fit justify-center">
          <form className="h-fit space-y-[20px]" onSubmit={addNewPoltParty}>
            <div className="flex space-x-[40px] ">
              <TextField
                error={error1}
                type="text"
                id="outlined-error-helper-text"
                label="Name"
                helperText={nameAlert}
                onChange={(e) => setName(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <TextField
                error={error2}
                type="text"
                id="outlined-error-helper-text"
                label="Phone Number"
                helperText={phoneAlert}
                onChange={(e) => setPhone(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />
            </div>

            <div className="flex space-x-[40px]">
              <TextField
                error={error3}
                id="outlined-error-helper-text"
                label="Email"
                helperText={emailAlert}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <TextField
                error={error4}
                id="outlined-error-helper-text"
                label="Leader name"
                helperText={leaderNameAlert}
                onChange={(e) => setLeaderName(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />
            </div>

            <div className="flex space-x-[40px]">
              <TextField
                multiline
                error={error5}
                id="outlined-error-helper-text"
                label="Description"
                helperText={desAlert}
                onChange={(e) => setDes(e.target.value)}
                sx={{ fontFamily: "Roboto", width: "460px" }}
              />
            </div>

            <div className="flex space-x-[40px]">
              <TextField
                error={error6}
                type="number"
                id="outlined-error-helper-text"
                label="Competitor Count"
                helperText={compCountAlert}
                onChange={(e) => setCompCount(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <Button
                type="submit"
                variant="contained"
                className="bg-[#1565c0]"
                sx={{ height: "55px", width: "210px", letterSpacing: "2px" }}
              >
                CREATE
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </>

    // End of PartyForm component
  );
}
