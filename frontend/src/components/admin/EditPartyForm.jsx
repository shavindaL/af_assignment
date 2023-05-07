import {
  Button,
  Card,
  CardContent,
  CardMedia,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import LinearProgress from "@mui/material/LinearProgress";
import axios from "axios";

export default function EditPartyForm({ partyID }) {
  // Use useEffect hook
  useEffect(() => {
    // Function to get details of particular political party
    async function getPartyData() {
      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/political-parties/${partyID}`
        );
        const data = await res.json();

        if (data) {
          // Assign value to state variable
          setPartyData(data);
          setName(data.name);
          setPhone(data.phone_no);
          setEmail(data.email);
          setLeaderName(data.leader_name);
          setDes(data.description);
          setCompCount(data.competitor_count);
          setVotes(data.vote_results);
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }

    // Invoke getPartyData function
    getPartyData();
  }, [partyID]);

  // State variable to hold data of the political party
  const [partyData, setPartyData] = useState({});

  // State variable to hold image data during uploading of photo
  const [imageData, setImageData] = useState(null);

  // Set of state variables for the input fields
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [leaderName, setLeaderName] = useState("");
  const [des, setDes] = useState("");
  const [compCount, setCompCount] = useState("");
  const [votes, setVotes] = useState("");

  // Set of state variables to show error messages
  const [nameAlert, setNameAlert] = useState("");
  const [phoneAlert, setPhoneAlert] = useState("");
  const [emailAlert, setEmailAlert] = useState("");
  const [leaderNameAlert, setLeaderNameAlert] = useState("");
  const [desAlert, setDesAlert] = useState("");
  const [compCountAlert, setCompCountAlert] = useState("");
  const [votesAlert, setVotesAlert] = useState("");

  // State variables to change the error prop of TextFields
  const [error1, setError1] = useState(false);
  const [error2, setError2] = useState(false);
  const [error3, setError3] = useState(false);
  const [error4, setError4] = useState(false);
  const [error5, setError5] = useState(false);
  const [error6, setError6] = useState(false);
  const [error7, setError7] = useState(false);

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
      isVotesValid: false,
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

    // Validate the votes state variable to be filled and contain valid values
    if (votes.length === 0) {
      setVotesAlert("Votes are required");
      setError7(true);
      isAllValid.isVotesValid = false;
    } else if (votes < 0) {
      setVotesAlert("Only positive values are allowed");
      setError7(true);
      isAllValid.isVotesValid = false;
    } else if (Math.trunc(Number(votes)) !== Number(votes)) {
      setVotesAlert("Only whole numbers are allowed");
      setError7(true);
      isAllValid.isVotesValid = false;
    } else {
      isAllValid.isVotesValid = true;
      setVotesAlert("");
      setError7(false);
    }

    // Return the boolean value
    if (
      isAllValid.isNameValid === false ||
      isAllValid.isPhoneValid === false ||
      isAllValid.isEmailValid === false ||
      isAllValid.isLeaderNameValid === false ||
      isAllValid.isDesValid === false ||
      isAllValid.isCompCountValid === false ||
      isAllValid.isVotesValid === false
    ) {
      return false;
    } else {
      return true;
    }
  }

  // Function to update the political party
  async function updatePoltParty(e) {
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
        vote_results: votes.toString(),
      };

      // Make the loading bar visible
      document.getElementById("loadingBar").style.visibility = "visible";

      try {
        const res = await fetch(
          `http://localhost:5000/api/v1/political-parties/${partyID}`,
          {
            method: "PUT",
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
          
          const reply = await updateLogo();

          // Reload the page
          if (reply) {
            window.location.reload();
          }

        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    }
  }

  // Function to update the log
  async function updateLogo() {
    if (imageData) {
      // Print the file object
      console.log(imageData);

      const formData = new FormData();

      formData.append("politicalPartyLogo", imageData, imageData.name);

      try {
        const res = await axios.post(
          `http://localhost:5000/api/v1/political-parties/logo/${partyID}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        const resMsg = await res.data.toString();

        if (resMsg === "Failed to upload the image for political party") {
          console.log(resMsg);

        } else if (resMsg === "Failed to upload the image to cloud") {
          console.log("Could not upload image to Google Cloud");
        } else {
          console.log(resMsg);

          // Return message
          return resMsg;
        }
      } catch (err) {
        // Print error message
        console.log(err.message);
      }
    } else {
      // Print message that no file has been selected
      console.log("No file selected");

      // Return message
      return "No image uploaded";
    }
  }

  return (
    // Start of EditPartyForm component
    <>
      <Card className="w-fit h-fit border mt-[70px]  p-[10px]">
        <LinearProgress id="loadingBar" style={{ visibility: "hidden" }} className="relative bottom-[5px]"/>

        <CardMedia align="center" className="relative bottom-[7px]">
          <Button
            onClick={() => {
              document.getElementById("imgFile").click();
            }}
          >
            <img
              src={partyData.logo}
              alt="image"
              className="h-[150px] w-[150px] border-[2px] "
            />
          </Button>

          <input
            id="imgFile"
            type="file"
            accept="image/*"
            style={{ display: "none" }}
            onChange={(e) => setImageData(e.target.files[0])}
            name="imgFile"
          />
        </CardMedia>

        <Divider />

        <br />
        <Typography paragraph align="center">
          Party ID :&nbsp;{partyData.partyID}
        </Typography>

        <CardContent className="h-fit w-fit justify-center">
          <form className="h-fit space-y-[20px]" onSubmit={updatePoltParty}>
            <div className="flex space-x-[40px] ">
              <TextField
                error={error1}
                type="text"
                id="outlined-error-helper-text"
                label="Name"
                value={name}
                helperText={nameAlert}
                onChange={(e) => setName(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <TextField
                error={error2}
                type="text"
                id="outlined-error-helper-text"
                label="Phone Number"
                value={phone}
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
                value={email}
                helperText={emailAlert}
                onChange={(e) => setEmail(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <TextField
                error={error4}
                id="outlined-error-helper-text"
                label="Leader name"
                value={leaderName}
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
                value={des}
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
                value={compCount}
                helperText={compCountAlert}
                onChange={(e) => setCompCount(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />

              <TextField
                error={error7}
                type="number"
                id="outlined-error-helper-text"
                label="Vote Results"
                value={votes}
                helperText={votesAlert}
                onChange={(e) => setVotes(e.target.value)}
                sx={{ fontFamily: "Roboto" }}
              />
            </div>

            <center>
              <Button
                type="submit"
                variant="contained"
                className="bg-[#1565c0]"
                sx={{ height: "55px", width: "210px", letterSpacing: "2px" }}
              >
                SAVE
              </Button>
            </center>
          </form>
        </CardContent>
      </Card>
    </>

    // End of EditPartyForm component
  );
}
