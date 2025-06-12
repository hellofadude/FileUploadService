"use client"

import React from 'react';
import handleUpload from "./handleUpload";
import { useActionState } from 'react';
import HandleReport from './report/page';
import { startTransition } from 'react';



export default function Fileupload() {
  const [state, formAction, isPending] = useActionState(handleUpload, "");


const handleFormReset = () => { 
  console.log("Resetting form state");
  startTransition(() => {
    formAction('/', 'push');
  });
};
  // This function is called when the form is submitted
  // It will handle the file upload and return the report
  return (
    <>
      
        <div>     
          <form action={formAction}>
            <div>
              <div>
                <div>           
                  <label>
                    File to parse:
                    <input type="file" name="myFile" required/>
                  </label>
                </div>
                <div>
                  <button type="submit">Upload</button>
                </div>
              </div>
            </div>
          </form>
          { isPending ? ( "Loading...") : state === "" ? ("") : (
              <HandleReport state={state} resetState={handleFormReset} />
              )
          }
          
        </div>
    </>
  );  
}


  