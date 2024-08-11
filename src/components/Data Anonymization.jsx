import React, { useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import StepContent from "@mui/material/StepContent";
import * as XLSX from 'xlsx';
import { FileUploader } from "react-drag-drop-files";
 
import backgroundImage from "../images/DAImg1.jpg";
 
import Typography from "@mui/material/Typography";
import "../styles/styles.scss";
 
const DataAnonymization = () => {
 
 
  const steps = [
    {
      label: "Upload File",
    },
 
    {
      label: "Define Metadata",
    },
    {
      label: "Get Anonymized data",
    },
  ];
 
  const [selections, setSelections] = useState({});
  const [file, setFile] = useState(null);
 
  const handleSave = async() => {
 
     const transformedJson = createJsonForHeaders();
    // Make the API call
    fetch('http://localhost:3000/getconfig', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(transformedJson),
    })
    .then(response => response.json(),setShowPopup(false))
    .then(data => {
      console.log('Success:', data);
      // Handle success (e.g., show a success message)
    })
    .catch((error) => {
      console.error('Error:', error);
      // Handle error (e.g., show an error message)
    });
  };
 
 
  const handleDropdownChange = (header, field, value) => {
    setSelections(prevSelections => ({
      ...prevSelections,
      [header]: {
        ...prevSelections[header],
        [field]: value
      }
    }));
  };
 
  const createJsonForHeaders = () => {
    const jsonResult = headers.map(header => {
      const selection = selections[header] || {};
      const isPii = selection.isPii === 'Yes' ? 'yes' : 'no';
      const piiType = selection.piiType || '';
      const anonymizationMethod = selection.anonymizationMethod || '';
 
      return {
        column_header: header,
        is_pii: isPii,
        pii_type: piiType,
        anonymization_method: anonymizationMethod,
      };
    });
 
    return(jsonResult);
  };
 
  const [activeOption, setActiveOption] = useState(0);
  const divWithBackground = {
    backgroundImage: `url(${backgroundImage})`,
    backgroundSize: "cover",
  };
const [activeStep, setActiveStep] = useState(0);
 
const handleOnChange = (e) => {
  setFile(e.target.files[0]);
};
 
const[fileData, setFileData]=useState("");
const[fileUploadMsg, setfileUploadMsg]=useState("");
const handleNext = () => {
  setActiveStep((currentStep) => currentStep + 1);
  setActiveOption(1);
  setfileUploadMsg("");
};
const [showPopup, setShowPopup] = useState(false);
    const [headers, setHeaders] = useState([]);
 
    const [anon_data, setAnon_data] = useState([]);
const handleSelectHeadersClick = async () => {
  try {
    const response = await fetch("http://localhost:3000/getmeta", {
      method: "GET",
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const headers = await response.json();
    setHeaders(headers);
    setShowPopup(true);
  } catch (error) {
    console.error('Error fetching headers:', error);
  }
};
const performAnonymization = async () => {
  try {
    const response = await fetch("http://localhost:3000/anonymize", {
      method: "GET",
    });
 
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
 
    const anon_data = await response.json();
    setAnon_data(anon_data.csv_base64);
    console.log(anon_data.csv_base64);
  } catch (error) {
    console.error('Error fetching headers:', error);
  }
};
 
const handleUpload = async (file) => {
  setFile(file);
 
  try {
    const formData = new FormData();
    formData.append("file", file);
 
    const response = await fetch(" http://127.0.0.1:5000/getdata", {
      method: "POST",
      body: formData,
    });
    if (response.status === 200) {
      const data =await response.text();
      setfileUploadMsg("File Uploaded successfully!");
     
    } else {
      setfileUploadMsg("Some error occured uploading file");
    }
  } catch (error) {
    setfileUploadMsg("Some error occured");
  }
};
const downloadCSV = () => {
  if (!anon_data) {
    console.error('No CSV data available to download');
    return;
  }
 
  // Convert base64 to Blob
  const byteCharacters = atob(anon_data);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: 'text/csv' });
 
  // Create a link element and trigger download
  const url = window.URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.setAttribute('href', url);
  a.setAttribute('download', 'anonymized_data.csv');
  a.click();
};
 
  return (
   
   
 
    <>
    <div className="data-anonymization">
      <div className="stepper">
        <br></br>
        <Box sx={{ maxWidth: 1800 }}>
          <Stepper activeStep={activeStep} orientation="horizontal">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>{step.label}</StepLabel>
                <StepContent>
                  <Typography>{step.description}</Typography>
                </StepContent>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
      <div className="top-side">
        {activeOption === 0 && (
          <>
            <div className="left-side">
              <div className="file-widget my-1" style={{height:'200px'}}>
                <br></br>
                <br></br>
                {/* <input type="file" id="fileInput" onChange={handleFileChange} className="file-input" /> */}
           
               
                        {/* <input type="file" id="fileInput" onChange={handleFileChange} className="file-input" /> */}
                        <FileUploader handleChange={handleUpload} name="file" />
                  <button
                    style={{ margin: '0.5rem' }}
                    onClick={handleNext}
                 
                  >
                    Next
                  </button>
               <br></br>
                <label style={{ fontWeight: "bolder", color: "red" }}>
                {fileUploadMsg}
                </label>
                <br></br>
               
             
               
              </div>
            </div>
            <div className="right-side" style={divWithBackground}></div>
          </>
        )}
 
       
     
      {activeOption === 1 && (
<>
 
 
<div className="left-side">
              <div className="file-widget my-1" style={{height:'200px'}}>
                <br></br>
                <br></br>
                                 
           
               
                        <button
                            onClick={handleSelectHeadersClick}
                            >
                    Define Metadata
                  </button>
                  <button
                    style={{ margin: '0.5rem' }}
                    onClick={performAnonymization}
                 
                  >
                    Perform Anonymization
                  </button>
                  <br></br> <br></br> <br></br>
                  <button
                   onClick={downloadCSV}
                   
                 
                  >
                    Download
                  </button>
               
                <label style={{ fontWeight: "bolder", color: "red" }}>
                {fileUploadMsg}
                </label>
                <br></br>
               
             
               
              </div>
            </div>
            <div className="separator"></div>
            {showPopup ? (
  <div className="right-side">
    <table style={{ width: '90%', borderCollapse: 'separate', borderSpacing: '0 15px', marginLeft:'60px' }}>
      <thead>
        <tr>
          <th style={{ textAlign: 'left', padding: '10px' ,width:'33%'}}>Column Header</th>
          <th style={{ textAlign: 'left', padding: '10px' ,width:'33%'}}>Is PII ?</th>
          <th style={{ textAlign: 'left', padding: '10px' ,width:'33%'}}>PII Type</th>
          <th style={{ textAlign: 'left', padding: '10px' ,width:'33%'}}>Anonymization method</th>
        </tr>
      </thead>
      <tbody>
        {headers.map((header, index) => (
          <tr key={index}>
            <td style={{ textAlign: 'left', padding: '10px' }}>{header}</td>
            <td style={{ textAlign: 'left', padding: '5px' }}>
            <select
                  value={selections[header]?.isPii || ''}
                  onChange={(e) => handleDropdownChange(header, 'isPii', e.target.value)}
                  style={{ width: '50%' }}
                > <option value="No">No</option>
                <option value="Yes">Yes</option>
               
               
               
              </select>
            </td>
 
            <td style={{ textAlign: 'left', padding: '5px' }}>
            <select
                  value={selections[header]?.piiType || ''}
                  onChange={(e) => handleDropdownChange(header, 'piiType', e.target.value)}
                  style={{ width: '50%' }}
                >
              <option value="">Select...</option>
                <option value="pii-email">Email</option>
                <option value="pii-fname">Name</option>
                <option value="pii-ssn">SSN</option>
                <option value="pii-phone">Phone</option>
               
               
              </select>
            </td>
            <td style={{ textAlign: 'left', padding: '5px' }}>
            <select
                  value={selections[header]?.anonymizationMethod || ''}
                  onChange={(e) => handleDropdownChange(header, 'anonymizationMethod', e.target.value)}
                  style={{ width: '120%' }}
                >
              <option value="">Select...</option>
                <option value="Remove values">Remove values</option>
                <option value="Fill fake values">Fill fake values</option>
              </select>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
    <button style={{ marginLeft: '70px' }} onClick={handleSave}>Save</button>
  </div>
) : (        
         
  <div className="right-side" style={divWithBackground}></div>)}
 
 
 
 
 
 
 
 
 
 
 
</>)}
</div>
    </div>
    </>
  );
};
 
export default DataAnonymization;