"use client"

import React from 'react';
import handleUpload from "./fileUploadService";
import { useActionState } from "react";



export default function FileuploadService() {
  const [state, formAction, isPending] = useActionState(handleUpload, "");
   
  return(
    <>
     <form action={formAction}>
          <div>
             <div>
               <label>
                  File to parse:  <input
                      type='file'
                      name='myFile' />
               </label>
             </div>
             <div>
              <button type="submit">upload</button>
            </div>
              {isPending ? "Loading..." : 
                 state === "" ? "" : 
                 <div style={{ border: '1px solid black', padding: '10px', marginTop: '100px' }}>
                    <h3>Report</h3>
                       <pre style={{ whiteSpace: 'pre-wrap' }}>{state}</pre>
                 </div> 
               }
          </div>        
      </form>
  
    </>
  )  
}



  