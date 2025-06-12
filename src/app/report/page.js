'use client'

import { redirect } from "next/navigation";


export default function HandleReport({ state, resetState }) {

 function  handleReset() {
      // Reset the form state and clear the report
      resetState(state);
      
    };
  
  return (
    <div>
        
                <div id="div-01">            
                  <div
                    style={{
                      border: "1px solid black",
                      padding: "10px",
                      marginTop: "300px",
                    }}
                  >
                    <h3>Report</h3>
                    <pre style={{ whiteSpace: "pre-wrap" }}>{state}</pre>
                  </div>
                  <button onClick={handleReset}>reset</button>                
                </div>
        
    </div>
  );
}
import React from 'react';
