import React from "react";
import { styled } from "@mui/system";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const Root = styled("div")({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  margin: "50px auto",
  maxWidth: 500,
  padding: "32px",
  backgroundColor: "#FFFFFF",
  borderRadius: "8px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
});

const Heading = styled("h2")({
  marginBottom: "32px",
  fontSize: "28px",
  fontWeight: 700,
  color: "#2E2E2E",
});

const Form = styled("form")({
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledTextField = styled(TextField)({
  marginBottom: "16px",
  "& .MuiInputBase-input": {
    backgroundColor: "#F2F2F2",
    borderRadius: "4px",
    padding: "12px",
    fontSize: "16px",
    lineHeight: "24px",
  },
  "& .MuiInputLabel-root": {
    color: "#3F51B5",
    fontWeight: 700,
    fontSize: "16px",
    lineHeight: "24px",
    transform: "translate(12px, 16px) scale(1)",
  },
  "& .MuiInputLabel-shrink": {
    transform: "translate(12px, 7px) scale(0.75)",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "#E0E0E0",
      borderWidth: "2px",
    },
    "&:hover fieldset": {
      borderColor: "#BDBDBD",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#3F51B5",
    },
  },
});

const StyledButton = styled(Button)({
  backgroundColor: "#3F51B5",
  color: "#FFFFFF",
  fontWeight: 700,
  marginTop: "24px",
  "&:hover": {
    backgroundColor: "#2E3B55",
  },
});

function InquiryForm() {
  return (
    <Root>
      <Heading>Inquiry Form</Heading>
      <Form>
        <StyledTextField
          label="Name"
          variant="outlined"
          fullWidth
          required
        />
        <StyledTextField
          label="Email"
          variant="outlined"
          fullWidth
          required
        />
        <StyledTextField
          label="Message"
          variant="outlined"
          multiline
          rows={4}
          fullWidth
          required
        />
        <StyledButton variant="contained" size="large">
          Submit
        </StyledButton>
      </Form>
    </Root>
  );
}

export default InquiryForm;
