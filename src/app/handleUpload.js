"use server"

export default async function handleUpload(currentstate, formData) {
    let data = new FormData();
    data.append('file', formData.get("myFile"));
    let report = "";
    let response = null;
  
    try {
      // send request to backend and wait for the response
      response =  await fetch("http://127.0.0.1:8080", {
          mode: "no-cors",
          method: "POST",
          // Data will be serialized and sent as json
          body: data,
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

    return report;
  }