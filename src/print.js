import {React, useRef} from 'react'

const Print = () => {

    const divRef = useRef(null);
    const handlePrint = () => {
      const printContents = divRef.current.innerHTML;
      const originalContents = document.body.innerHTML;
  
      document.body.innerHTML = printContents;
  
      window.print();
  
      document.body.innerHTML = originalContents;
    };

  return (
    <div>
      <button onClick={handlePrint}>printt</button>
    </div>
  )
}

export default Print
