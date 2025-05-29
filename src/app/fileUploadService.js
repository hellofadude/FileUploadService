"use client"

import React from 'react';
import handleUpload from "./handleUpload"; 
import { useActionState } from "react";
import Link from 'next/link'



export default function Fileupload() {
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
                 <div>
                    <div style={{ border: '1px solid black', padding: '10px', marginTop: '100px' }}>
                       <h3>Report</h3>
                       <pre style={{ whiteSpace: 'pre-wrap' }}>{state}</pre>   
                    </div>
                    <p>Refresh to go back</p>
                  </div>
               }
                     
          </div>        
        </form>
  
    </>
  )  
}



  