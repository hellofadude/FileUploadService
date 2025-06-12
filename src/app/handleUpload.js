"use server"

import { redirect } from "next/navigation";

export default async function handleUpload(currentstate, formData) {
  let report = "";

  if (currentstate !== "" ) {
    console.log("Resetting Form State");
    currentstate = "";
    redirect("/"); // Redirect to the home page if currentstate is not empty

  } else {
    let logInfo = new FormData();
    logInfo.append('file', formData.get("myFile"));
      
    try {
      // send request to backend and wait for the response
      const response =  await fetch("http://127.0.0.1:8080", {
          mode: "no-cors",
          method: "POST",
          // Data will be serialized and sent as json
          body: logInfo, // if no file is selected, send the current state
          // tell the server we're sending JSON
      }).then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      }).then(data => {
        report  =  data;      
      }).catch(error => {
        console.error('Error:', error);
      })
    } catch (error) {
      console.log("An error occured", error)// an error occured
    }

  }
  
    return report;
  }