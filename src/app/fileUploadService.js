"use client"

import React from 'react';
import handleUpload from "./handleUpload"; 
import { useActionState } from "react";
import { redirect } from "react-router-dom";
import HandleReport from './report/page';



export default function Fileupload() {
  const [state, formAction, isPending] = useActionState(handleUpload, "");
  const [formState, setFormState] = React.useState(true);



  return (
    <>
      
        <div>     
          <form action={formAction}>
            <div>
              <div>
                <div>           
                  <label>
                    File to parse:
                    <input type="file" name="myFile" />
                  </label>
                </div>
                <div>
                  <button type="submit">Upload</button>
                </div>
              </div>
            </div>
          </form>
          { isPending ? ( "Loading...") : state === "" ? ("") : (
              <HandleReport state={state} />
              )
          }
          
        </div>
    </>
  );  
}


  