 import React, { useEffect, useState } from "react";
 import { Table, Button } from "react-bootstrap";
 import BookDataService from "../services/book.services";
 import { collection, getDocs,getDoc,addDoc, updateDoc,deleteDoc, doc, serverTimestamp,query,orderBy } from "firebase/firestore"
import { bookCollectionRef } from "../services/book.services";
 const BooksList = ({ getBookId }) => {
   const [books, setBooks] = useState([]);
   useEffect(() => {
     getBooks();
   }, []);
 
   const getBooks = async () => {
    
    const q = query(bookCollectionRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // console.log(querySnapshot);
    // const data = await BookDataService.getAllBooks();
    // console.log(data.docs);
    // setBooks(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));


   };
 
   const deleteHandler = async (id) => {
     await BookDataService.deleteBook(id);
     getBooks();
   };
   return (
     <>
       <div className="mb-2">
         <Button variant="dark edit" onClick={getBooks}>
           Refresh List
         </Button>
       </div>
         <tbody>
           {books.map &&
              books.map((doc, index) => {
                const name = `${doc?.fullName} ${doc?.lastName}`;

                // console.log(doc, "doc data");
                if(index=== doc.length-1){
                  console.log(doc);
                  return(
                      <tr key={doc.id}>
                        <div id="header">
                          <p id="name">
                            {name
                              .toLowerCase()
                              .split(" ")
                              .map(
                                (word) =>
                                  word.charAt(0).toUpperCase() + word.slice(1)
                              )
                              .join(" ")}
                          </p>
                          {/* <p id="name">{doc.lastName}</p> */}
                          <a
                            href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                            target="_blank"
                          >
                            <p id="email">{doc.email}</p>
                          </a>
                        </div>
    
                        <div className="right">
                          <img
                            className="image"
                            src={
                              !doc.url
                                ? "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                                : doc.url
                            }
                            alt="avatar"
                          />
                          <h3>CV Highlights</h3>
    
                          <p>
                            <ul>
                              <li>{doc?.cvHeighlits1}</li>
                              <li>{doc.cvHeighlits2}</li>
                              <li>{doc.cvHeighlits3}</li>
                              <li>{doc.cvHeighlits4}</li>
                            </ul>
                          </p>
                          <h3>Professional Experience</h3>
                          {/* <h4 id="company-name">{doc.experience1}</h4> */}
                       <p>   <h4 id="company-name">{doc?.newExperience?.[0]?.company}</h4> <br></br>
                          <h4 id="company-name">{doc?.newExperience?.[0]?.designation}</h4><br></br>
                          <h4 id="company-name">{doc?.newExperience?.[0]?.startRange}</h4> <br></br>
                          <h4 id="company-name">{doc?.newExperience?.[0]?.lastRange}</h4>
                          
                          </p>
                          {/* {console.log(doc.newExperience?.[0]?.company,"sddds")} */}
                         <p><h4 id="company-name">{doc?.newExperience?.[1]?.company}</h4>
                         <h4 id="company-name">{doc?.newExperience?.[1]?.designation}</h4>
                          <h4 id="company-name">{doc?.newExperience?.[1]?.startRange}</h4>
                          <h4 id="company-name">{doc?.newExperience?.[1]?.lastRange}</h4>
                          </p>
    
                          <p><h4 id="company-name">{doc?.newExperience?.[2]?.company}</h4>
                          <h4 id="company-name">{doc?.newExperience?.[2]?.designation}</h4>
                          <h4 id="company-name">{doc?.newExperience?.[2]?.startRange}</h4>
                          <h4 id="company-name">{doc?.newExperience?.[2]?.lastRange}</h4>
                          </p>
    
                          <br></br>
                          {/* <p id="job-title"><strong>Support Engineer (Technical Support)</strong></p>
                        <p id="job-responsibilities">Job Responsbilities</p>
                        <p>
                          <ul>
                            <li>Answer customer queries over email / ticketing system</li>
                            <li>Interact with our engineering team to get software issues and bugs resolved</li>
                            <li>Occasionally interact with customers over Skype or telephone</li>
                            <li>Contribute ideas to the team on how customers can be delighted</li></ul>
                        </p> */}
                          <h3>Educational Qualifications</h3>
                          <table>
                            <tr id="heading">
                              <td>Qualification</td>
                              <td>Board</td>
                              <td>Percentage / Grades</td>
                              <td>Year</td>
                            </tr>
                            <tr>
                              <td>{doc?.education?.[0]?.qualification}</td>
                              <td>{doc?.education?.[0]?.board}</td>
                              <td>{doc?.education?.[0]?.percentage}</td>
                              <td>{doc?.education?.[0]?.year}</td>
                            </tr>
                            <tr>
                            <td>{doc?.education?.[1]?.qualification}</td>
                              <td>{doc?.education?.[1]?.board}</td>
                              <td>{doc?.education?.[1]?.percentage}</td>
                              <td>{doc?.education?.[1]?.year}</td>
                            </tr>
                            <tr>
                            <td>{doc?.education?.[2]?.qualification}</td>
                              <td>{doc?.education?.[2]?.board}</td>
                              <td>{doc?.education?.[2]?.percentage}</td>
                              <td>{doc?.education?.[2]?.year}</td>
                            </tr>
                          </table>
                          {/* <h3>Independent Courses</h3>
                        <p>
                          <ul>
                            <li>
                              <span id="course-name">HTML & CSS for Beginners – Web Fundamentals</span> – Codecademy.com</li>
                            <li>
                              <span id="course-name">Python – Fundamentals and Dynamic Programming </span> - Codecademy.com</li>
                            <li>
                              <span id="course-name">JavaScript – Programming Basics, JS Apps and Build Games </span> - Codecademy.com</li>
    
                          </ul>
                        </p> */}
                          <h3>Technical Skills</h3>
                          <p>
                            <ul>
                              <li>
                                <span id="course-name">Operating Systems:</span>
                                {doc.techSkill1}
                                {/* {doc.technical[0]} */}
                              </li>
                              {/* {console.log(doc.technical[0],"technical")} */}
                              <li>
                                <span id="course-name">Application Software:</span>{" "}
                                {doc.techSkill2}
                              </li>
                              <li>
                                <span id="course-name">Programming Skills:</span>
                                {doc.techSkill3}
                              </li>
                            </ul>
                          </p>
                          <h3>Certifications / Awards:</h3>
                          <p>
                            <ul>
                             
                              {/* <li>{item}</li> */}
                              <p>{doc?.award?.[0]}</p>
                              <p>{doc?.award?.[1]}</p> 
                              <p>{!doc?.award?.[2]}</p>
                              <p>{doc?.award?.[3]}</p> 
                              <p>{doc?.award?.[4]}</p> 
    
                             
                              {/* <li>{doc.award3}</li> */} 
                            </ul>
                          </p>
                          <h3>Personal Information:</h3>
                          <p>
                            <ul>
                              <li>{doc.perDetails1}</li>
                              <li>
                                <span id="course-name">Languages Known:</span>                           </li>
                              
                             <p>  
                              {/* {const ab = doc?.newLanguage?.fields?.[0]?.name} */}
                               {doc?.newLanguage?.fields?.[0]?.name.charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[0]?.name.slice(1)} &nbsp;
                                {doc?.newLanguage?.fields?.[0]?.type} &nbsp;</p>
                               <p> {doc?.newLanguage?.fields?.[1]?.name .charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[1]?.name.slice(1)} &nbsp;
                                {doc?.newLanguage?.fields?.[1]?.type} &nbsp; </p>
                               <p> {doc?.newLanguage?.fields?.[2]?.name .charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[2]?.name.slice(1)} &nbsp;
                                {doc?.newLanguage?.fields?.[2]?.type} &nbsp; </p>
                                <p> {doc?.newLanguage?.fields?.[3]?.name } &nbsp;
                                {doc?.newLanguage?.fields?.[3]?.type} &nbsp; </p>
    
                                {/* {console.log(doc?.newLanguage?.fields?.[0]?.name)} */}
                              <li>
                                <span id="course-name">Hobbies:</span>
                                {doc.hobbies}
                              </li>{" "}
                            </ul>
                          </p>
                          {/* <h3>Other Information</h3>
                        <p>
                          <ul>
                            <li>
                              <span id="course-name">Expected Salary:</span>As per company standards</li>
                            <li>
                              <span id="course-name">Area of Interest:</span>Software Development, Programming, Start-ups, Coding, App Development, Technical Support, Support Engineer, Customer Happiness, Client service, Investment Banking, Corporate Finance, Hedge Funds, Mergers & Acquisitions, Analyst, Equity Research, Business Analysis</li>
                            <li>
                              <span id="course-name">Joining Date:</span>Immediate</li></ul>
                        </p> */}
                          <h3>Declaration</h3>
                          <p>
                            {!doc.declaration
                              ? "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief."
                              : doc.declaration}
                          </p>
                        </div>
                        <div id="footer">
                          {/* <button onClick={downloadHandler}>download as pdf</button> */}
                          {/* for download button */}
                          {/* <Download rootElementId="pagetodownload" downloadFileName="testpage "/> */}
    
                          {/* <button onClick={handlePrint}>download</button> */}
                        </div>
                        <Button
                         variant="danger"
                         className="delete"
                         onClick={(e) => deleteHandler(doc.id)}
                       >
                         Delete
                       </Button>
                      </tr>
                    );
                  // )
                }

                //       <p id="name">
                //         {name
                //           .toLowerCase()
                //           .split(" ")
                //           .map(
                //             (word) =>
                //               word.charAt(0).toUpperCase() + word.slice(1)
                //           )
                //           .join(" ")}
                //       </p>
                //       {/* <p id="name">{doc.lastName}</p> */}
                //       <a
                //         href="https://mail.google.com/mail/u/0/?tab=rm&ogbl#inbox"
                //         target="_blank"
                //       >
                //         <p id="email">{doc.email}</p>
                //       </a>
                //     </div>

                //     <div className="right">
                //       <img
                //         className="image"
                //         src={
                //           !doc.url
                //             ? "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                //             : doc.url
                //         }
                //         alt="avatar"
                //       />
                //       <h3>CV Highlights</h3>

                //       <p>
                //         <ul>
                //           <li>{doc?.cvHeighlits1}</li>
                //           <li>{doc.cvHeighlits2}</li>
                //           <li>{doc.cvHeighlits3}</li>
                //           <li>{doc.cvHeighlits4}</li>
                //         </ul>
                //       </p>
                //       <h3>Professional Experience</h3>
                //       {/* <h4 id="company-name">{doc.experience1}</h4> */}
                //    <p>   <h4 id="company-name">{doc?.newExperience?.[0]?.company}</h4> <br></br>
                //       <h4 id="company-name">{doc?.newExperience?.[0]?.designation}</h4><br></br>
                //       <h4 id="company-name">{doc?.newExperience?.[0]?.startRange}</h4> <br></br>
                //       <h4 id="company-name">{doc?.newExperience?.[0]?.lastRange}</h4>
                      
                //       </p>
                //       {/* {console.log(doc.newExperience?.[0]?.company,"sddds")} */}
                //      <p><h4 id="company-name">{doc?.newExperience?.[1]?.company}</h4>
                //      <h4 id="company-name">{doc?.newExperience?.[1]?.designation}</h4>
                //       <h4 id="company-name">{doc?.newExperience?.[1]?.startRange}</h4>
                //       <h4 id="company-name">{doc?.newExperience?.[1]?.lastRange}</h4>
                //       </p>

                //       <p><h4 id="company-name">{doc?.newExperience?.[2]?.company}</h4>
                //       <h4 id="company-name">{doc?.newExperience?.[2]?.designation}</h4>
                //       <h4 id="company-name">{doc?.newExperience?.[2]?.startRange}</h4>
                //       <h4 id="company-name">{doc?.newExperience?.[2]?.lastRange}</h4>
                //       </p>

                //       <br></br>
                //       {/* <p id="job-title"><strong>Support Engineer (Technical Support)</strong></p>
                //     <p id="job-responsibilities">Job Responsbilities</p>
                //     <p>
                //       <ul>
                //         <li>Answer customer queries over email / ticketing system</li>
                //         <li>Interact with our engineering team to get software issues and bugs resolved</li>
                //         <li>Occasionally interact with customers over Skype or telephone</li>
                //         <li>Contribute ideas to the team on how customers can be delighted</li></ul>
                //     </p> */}
                //       <h3>Educational Qualifications</h3>
                //       <table>
                //         <tr id="heading">
                //           <td>Qualification</td>
                //           <td>Board</td>
                //           <td>Percentage / Grades</td>
                //           <td>Year</td>
                //         </tr>
                //         <tr>
                //           <td>{doc?.education?.[0]?.qualification}</td>
                //           <td>{doc?.education?.[0]?.board}</td>
                //           <td>{doc?.education?.[0]?.percentage}</td>
                //           <td>{doc?.education?.[0]?.year}</td>
                //         </tr>
                //         <tr>
                //         <td>{doc?.education?.[1]?.qualification}</td>
                //           <td>{doc?.education?.[1]?.board}</td>
                //           <td>{doc?.education?.[1]?.percentage}</td>
                //           <td>{doc?.education?.[1]?.year}</td>
                //         </tr>
                //         <tr>
                //         <td>{doc?.education?.[2]?.qualification}</td>
                //           <td>{doc?.education?.[2]?.board}</td>
                //           <td>{doc?.education?.[2]?.percentage}</td>
                //           <td>{doc?.education?.[2]?.year}</td>
                //         </tr>
                //       </table>
                //       {/* <h3>Independent Courses</h3>
                //     <p>
                //       <ul>
                //         <li>
                //           <span id="course-name">HTML & CSS for Beginners – Web Fundamentals</span> – Codecademy.com</li>
                //         <li>
                //           <span id="course-name">Python – Fundamentals and Dynamic Programming </span> - Codecademy.com</li>
                //         <li>
                //           <span id="course-name">JavaScript – Programming Basics, JS Apps and Build Games </span> - Codecademy.com</li>

                //       </ul>
                //     </p> */}
                //       <h3>Technical Skills</h3>
                //       <p>
                //         <ul>
                //           <li>
                //             <span id="course-name">Operating Systems:</span>
                //             {doc.techSkill1}
                //             {/* {doc.technical[0]} */}
                //           </li>
                //           {/* {console.log(doc.technical[0],"technical")} */}
                //           <li>
                //             <span id="course-name">Application Software:</span>{" "}
                //             {doc.techSkill2}
                //           </li>
                //           <li>
                //             <span id="course-name">Programming Skills:</span>
                //             {doc.techSkill3}
                //           </li>
                //         </ul>
                //       </p>
                //       <h3>Certifications / Awards:</h3>
                //       <p>
                //         <ul>
                         
                //           {/* <li>{item}</li> */}
                //           <p>{doc?.award?.[0]}</p>
                //           <p>{doc?.award?.[1]}</p> 
                //           <p className={doc?.award?.[2]?aa.style:aa.style1}>{!doc?.award?.[2]}</p>
                //           <p>{doc?.award?.[3]}</p> 
                //           <p>{doc?.award?.[4]}</p> 

                         
                //           {/* <li>{doc.award3}</li> */} 
                //         </ul>
                //       </p>
                //       <h3>Personal Information:</h3>
                //       <p>
                //         <ul>
                //           <li>{doc.perDetails1}</li>
                //           <li>
                //             <span id="course-name">Languages Known:</span>                           </li>
                          
                //          <p>  
                //           {/* {const ab = doc?.newLanguage?.fields?.[0]?.name} */}
                //            {doc?.newLanguage?.fields?.[0]?.name.charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[0]?.name.slice(1)} &nbsp;
                //             {doc?.newLanguage?.fields?.[0]?.type} &nbsp;</p>
                //            <p> {doc?.newLanguage?.fields?.[1]?.name .charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[1]?.name.slice(1)} &nbsp;
                //             {doc?.newLanguage?.fields?.[1]?.type} &nbsp; </p>
                //            <p> {doc?.newLanguage?.fields?.[2]?.name .charAt(0).toUpperCase() + doc?.newLanguage?.fields?.[2]?.name.slice(1)} &nbsp;
                //             {doc?.newLanguage?.fields?.[2]?.type} &nbsp; </p>
                //             <p> {doc?.newLanguage?.fields?.[3]?.name } &nbsp;
                //             {doc?.newLanguage?.fields?.[3]?.type} &nbsp; </p>

                //             {/* {console.log(doc?.newLanguage?.fields?.[0]?.name)} */}
                //           <li>
                //             <span id="course-name">Hobbies:</span>
                //             {doc.hobbies}
                //           </li>{" "}
                //         </ul>
                //       </p>
                //       {/* <h3>Other Information</h3>
                //     <p>
                //       <ul>
                //         <li>
                //           <span id="course-name">Expected Salary:</span>As per company standards</li>
                //         <li>
                //           <span id="course-name">Area of Interest:</span>Software Development, Programming, Start-ups, Coding, App Development, Technical Support, Support Engineer, Customer Happiness, Client service, Investment Banking, Corporate Finance, Hedge Funds, Mergers & Acquisitions, Analyst, Equity Research, Business Analysis</li>
                //         <li>
                //           <span id="course-name">Joining Date:</span>Immediate</li></ul>
                //     </p> */}
                //       <h3>Declaration</h3>
                //       <p>
                //         {!doc.declaration
                //           ? "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief."
                //           : doc.declaration}
                //       </p>
                //     </div>
                //     <div id="footer">
                //       {/* <button onClick={downloadHandler}>download as pdf</button> */}
                //       {/* for download button */}
                //       {/* <Download rootElementId="pagetodownload" downloadFileName="testpage "/> */}

                //       <button onClick={handlePrint}>download</button>
                //     </div>
                //     <Button
                //      variant="danger"
                //      className="delete"
                //      onClick={(e) => deleteHandler(doc.id)}
                //    >
                //      Delete
                //    </Button>
                //   </tr>
                // );
              })}
         </tbody>
       {/* </Table> */}
     </>
   );
 };
 
 export default BooksList;
