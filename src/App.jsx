import { useState, useEffect } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import logo from "./assets/hl7-fhir.png";
import "./App.css";
import { GetPatient } from "./components/Get/GetPatient";
import { CreatePatient } from "./components/Create/CreatePatient";

function App() {
  const loadPatients = () => {
    const savedPatients = JSON.parse(localStorage.getItem("patientIds")) || [];
    return savedPatients;
  };

  const [patients, setPatients] = useState(loadPatients);

  const addPatient = (newPatient) => {
    const updatedPatients = [...patients, newPatient];

    localStorage.setItem("patientIds", JSON.stringify(updatedPatients));

    setPatients(updatedPatients);
  };

  return (
    <>
      <image src="./assets/hl7-fhir.png" />
      <div
        style={{
          display: "flex",
          alignContent: "center",
          justifyContent: "space-evenly",
        }}
      >
        <CreatePatient addPatient={addPatient} />
        <GetPatient patients={patients} />
      </div>
    </>
  );
}

export default App;
