import React from 'react'
import  html2canvas from 'html2canvas'
import {jsPDF} from 'jspdf'

const Download = ({rootElementId,downloadFileName}) => {
    const downloadFileDocument = ()=>{
        const input = document.getElementById(rootElementId)
        html2canvas(input).then((canvas)=>{
            const imgData = canvas.toDataURL('image/png')
            const pdf = new jsPDF("p","pt","a4")
            pdf.addImage(imgData,"JPEG",10,10)
            pdf.save(`${downloadFileName}`)
        })
    }
  return (
    <div>  
      <button onClick={downloadFileDocument}>Download As Pdf</button>
    </div>
  )
}

export default Download
