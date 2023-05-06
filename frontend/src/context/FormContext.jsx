import { createContext, useState, useEffect } from "react";

const FormContext = createContext({});

export const FormProvider = ({ children }) => {
    const title = {
        0: "Select Location",
        1: "Enter Password"
    }
    const [location, setLocation] = useState("");
    const [password, setPassword] = useState("");


    return (
        <FormContext.Provider value={{ title, location, setLocation, password, setPassword }}>
            {children}
        </FormContext.Provider>
    )
}

export default FormContext;