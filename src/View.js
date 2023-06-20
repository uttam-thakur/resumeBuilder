import { React, useState, useEffect, useRef } from "react";
import { Divider, Space, Tag, Button, Checkbox, DatePicker, Input } from "antd";
import { Progress, InputNumber } from "antd";

import getBook from "./services/book.services";
import { useHistory, useParams, Link } from "react-router-dom";
import { storage } from "./firebase";
// import {db} from "./firebase"
import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import { initializeApp } from "firebase/app";
import BookDataService from "../src/services/book.services";
import { bookCollectionRef } from "../src/services/book.services";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import {
  collection,
  getusers,
  getuser,
  adduser,
  updateuser,
  deleteuser,
  user,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDEIpZEPB1F-1EyKGn8GYdlPqDMnxTQbG8",
  authDomain: "cvbuilder-7df42.firebaseapp.com",
  projectId: "cvbuilder-7df42",
  storageBucket: "cvbuilder-7df42.appspot.com",
  messagingSenderId: "400204340314",
  appId: "1:400204340314:web:92d41cd84eb7dbd8fd8c63",
};
firebase.initializeApp(firebaseConfig);

const db = firebase.firestore();

const View = (props) => {
  const {userId, setUserId}= props
  const [user, setUser] = useState([]);
  const { id } = useParams();

  const fetchData = async (id) => {
    const doc = await db.collection("new").doc(id).get();
    console.log("data view",doc.data());
    setUser(doc.data());
  };

  useEffect(() => {
    if(id){
      fetchData(id);
    }
  }, [id]);

  useEffect(()=>{
    if(userId && userId.id){
      console.log("userid in 60",userId,userId?.id);
      fetchData(userId.id)
      setTimeout(()=>{
        console.log("calling function");
        handlePrint()},1000)
    } 
  },[userId])

  const handlePrintt = () => {
    console.log("print");
    const printContents = divRef.current.innerHTML;
    const originalContents = document.body.innerHTML;

    document.body.innerHTML = printContents;

    window.print();

    document.body.innerHTML = originalContents;
  };

  const handlePrint = () => {
    const input = document.getElementById("divToPrint");
    console.log("input",input);
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", [4500, 3931]);
      pdf.addImage(imgData, "PNG", 10, 10, 4100, 4400);
      pdf.save("download.pdf");
      setUser({})
      setUserId({})
    });

  };

  const divRef = useRef(null);

  // console.log("users", user);

  console.log("userId ================ >",user?.fullName);
  return (
    // <div style={{display: userId ? "none" : "contents"}}>
    <div style={{display: !user?.fullName ? "none" : "contents"}}>
      {/* // <div>   */}

   {/* { user?.length && userId && <ReactToPdf targetRef={divRef} filename="div-blue.pdf">
        {({toPdf}) => {toPdf();setUserId({})}}
    </ReactToPdf>} */}

      <div>`this is view page of id {id}`</div>
      <div ref={divRef} id="divToPrint">
        <article className="resume-wrapper text-center position-relative">
          <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
            <header className="resume-header pt-4 pt-md-0">
              <div className="media flex-column flex-md-row">
                <a href="https://imgbb.com/">
                  <img
                    src={
                      !user.url
                        ? "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                        : user.url
                    }
                    alt="avatar"
                    border="0"
                    width="220"
                    height="220"
                  />
                </a>
                <img
                  className="mr-3 img-fluid picture mx-auto"
                  src="assets/images/фотощька.jpg"
                  alt=""
                />
                <div className="media-body p-4 d-flex flex-column flex-md-row mx-auto mx-lg-0">
                  <div className="primary-info">
                    <h1 className="name mt-0 mb-1 text-white ">
                      {/* {const name = `${user.fullName} ${user.lastName}`} */}

                      {`${user.fullName} ${user.lastName}`
                        .toLowerCase()
                        .split(" ")
                        .map(
                          (word) => word.charAt(0).toUpperCase() + word.slice(1)
                        )
                        .join(" ")}
                    </h1>
                    <div className="title mb-3">
                      {!user?.newExperience?.[1]?.designation
                        ? "Current Designation"
                        : user?.newExperience?.[1]?.designation}
                    </div>
                    <ul className="list-unstyled">
                      <li className="mb-2">
                        <a href="mailto:zveryanovstanis@gmail.com">
                          <i
                            className="far fa-envelope fa-fw mr-2"
                            data-fa-transform="grow-3"
                          ></i>
                          {user.email}
                        </a>
                      </li>
                      <li>
                        <a>
                          <i
                            className="fas fa-mobile-alt fa-fw mr-2"
                            data-fa-transform="grow-6"
                          ></i>
                          {user?.phoneNo}
                        </a>
                      </li>
                    </ul>
                  </div>
                  <div className="secondary-info ml-md-auto mt-2">
                    <ul className="resume-social list-unstyled">
                      <li className="mb-3">
                        <a href="https://t-do.ru/shcok7">
                          <span className="fa-container text-center mr-2">
                            <i
                              className="fa fa-linkedin"
                              aria-hidden="true"
                            ></i>
                          </span>
                          {user?.linkedin}
                        </a>
                      </li>
                      <li className="mb-3">
                        <a href="https://vk.com/id19720848">
                          <span className="fa-container text-center mr-2">
                            <i className="fa fa-github" aria-hidden="true"></i>
                          </span>
                          {user?.github}
                        </a>
                      </li>
                      {/* <li className="mb-3"><a href="https://behance.net/twstrblg"><span className="fa-container text-center mr-2"><i className="fab fa-behance fa-fw"></i></span>twstrblg</a></li>
				                <li><a href="https://psnprofiles.com/twisterblog"><span className="fa-container text-center mr-2"><i className="fab fa-playstation"></i></span>twisterblog</a></li> */}
                    </ul>
                  </div>
                </div>
              </div>
            </header>
            <div className="resume-body p-5">
              <section className="resume-section summary-section mb-5">
                <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                  personal summary
                </h2>
                <div className="resume-section-content">
                  {/* <p className="mb-0">Магистрант Visual Studies в НИУ ВШЭ, пишу и редактирую тексты. Занимаюсь академическими исследованиями видеоигр, веду про это <a href="http://t-do.ru/twisterblog" target="_blank">блог в Телеграме.</a> Езжу по России и миру, фотографирую в поездках. Фотографии выкладываю на Биханс.</p> */}
                  <p className="mb-0">
                    {!user.perDetails1
                      ? "Master student in Visual Studies at the National Research University Higher School of Economics, I write and edit texts. I am engaged in academic research of video games, I blog about it in Telegram. I travel around Russia and the world, taking pictures on trips. I'm posting the photos on Byhans."
                      : user.perDetails1}{" "}
                  </p>
                </div>
              </section>
              <div className="row">
                <div className="col-lg-9">
                  <section className="resume-section experience-section mb-5" />
                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                    Work Experince
                  </h2>
                  <div className="resume-section-content">
                    <div className="resume-timeline position-relative">
                      {/* <article className="resume-timeline-item position-relative pb-5">
                                    <div className="resume-timeline-item-header mb-2">
                                      <div className="d-flex flex-column flex-md-row">
                                        <h3 className="resume-position-title font-weight-bold mb-1">
                                          {!user?.formDataList?.[0]?.textInputValue
                                            ? "Company Name"
                                            : user?.formDataList?.[0]?.textInputValue}
                                        </h3>
                                        <div className="resume-company-name ml-auto">
                                          {!user?.formDataList?.[0]?.textSecondInputValue
                                            ? "Designation"
                                            : user?.formDataList?.[0]
                                                ?.textSecondInputValue}
                                        </div>
                                      </div>

                                      <div className="resume-position-time">
                                        {!user?.formDataList?.[0]?.dateFieldValue
                                          ? "start date"
                                          : user?.formDataList?.[0]
                                              ?.dateFieldValue}{" "}
                                        —{" "}
                                        {!user?.formDataList?.[0]?.additionalDateFieldValue
                                          ? "endDate"
                                          : user?.formDataList?.[0]?.additionalDateFieldValue}
                                      </div>
                                    </div>
                                    <div className="resume-timeline-item-desc">
                                      <p>{!user?.formDataList?.[0]?.jobResponsibility?
                                        "I do everything related to social networks and texts. I write newslettersand posts. I create landing pages,translate press releases, do specialprojects.": user?.formDataList?.[0]?.jobResponsibility}
                                      </p>
                                    
                                      <ul>
                                        <li>
                                          <a
                                            href="https://vk.com/@russianimp-top-5-faktov-ob-internete-v-metro-vo-vremena-rossiiskoi-impe?ref=group_block"
                                            target="_blank"
                                          >
                                            «url»
                                          </a>
                                        </li>
                                      </ul>
                                    </div>
                                  </article> */}

                      {/* <article className="resume-timeline-item position-relative pb-5">
                                        <div className="resume-timeline-item-header mb-2">
                                          <div className="d-flex flex-column flex-md-row">
                                            <h3 className="resume-position-title font-weight-bold mb-1">
                                            {!user?.formDataList?.[1]?.textInputValue
                                                ? "Company Name"
                                                : user?.formDataList?.[1]?.textInputValue}
                                            </h3>
                                            <div className="resume-company-name ml-auto">
                                            {!user?.formDataList?.[1]?.textSecondInputValue
                                                ? "Designation"
                                                : user?.formDataList?.[1]
                                                    ?.textSecondInputValue}
                                            </div>
                                          </div>
                                          <div className="resume-position-time">
                                          {!user?.formDataList?.[1]?.dateFieldValue
                                              ? "start date"
                                              : user?.formDataList?.[1]
                                                  ?.dateFieldValue}{" "}
                                            —{" "}
                                            {!user?.formDataList?.[1]?.additionalDateFieldValue
                                              ? "currently Working"
                                              : user?.formDataList?.[1]?.additionalDateFieldValue}
                                          </div>
                                        </div>
                                        <div className="resume-timeline-item-desc">
                                        <p>{!user?.formDataList?.[1]?.jobResponsibility?
                                            "I do everything related to social networks and texts. I write newslettersand posts. I create landing pages,translate press releases, do specialprojects.": user?.formDataList?.[1]?.jobResponsibility}
                                          </p>
                                          <ul>
                                            <li>
                                              <a
                                                href="https://vk.com/@russianimp-top-5-faktov-ob-internete-v-metro-vo-vremena-rossiiskoi-impe?ref=group_block"
                                                target="_blank"
                                              >
                                                «url»
                                              </a>
                                            </li>
                                          </ul>
                                        </div>
                                      </article> */}

                      <article className="resume-timeline-item position-relative pb-5">
                        {user?.formDataList?.map((workItem) => {
                          console.log("workItem", workItem);
                          return (
                            <>
                              <div className="resume-timeline-item-header mb-2">
                                <div className="d-flex flex-column flex-md-row">
                                  <h3 className="resume-position-title font-weight-bold mb-1">
                                    {!workItem?.textInputValue
                                      ? "Company Name"
                                      : workItem?.textInputValue}
                                  </h3>
                                  <div className="resume-company-name ml-auto">
                                    {!workItem?.textSecondInputValue
                                      ? "Designation"
                                      : workItem?.textSecondInputValue}
                                  </div>
                                </div>

                                <div className="resume-position-time">
                                  {!workItem?.dateFieldValue
                                    ? "start date"
                                    : workItem?.dateFieldValue}{" "}
                                  —{" "}
                                  {!workItem?.additionalDateFieldValue
                                    ? "currenty working"
                                    : workItem?.additionalDateFieldValue}
                                </div>
                              </div>
                              <div className="resume-timeline-item-desc">
                                <p>
                                  {!workItem?.jobResponsibility
                                    ? "I do everything related to social networks and texts. I write newslettersand posts. I create landing pages,translate press releases, do specialprojects."
                                    : workItem?.jobResponsibility}
                                </p>

                                <ul>
                                  <li>
                                    <a
                                      href="https://vk.com/@russianimp-top-5-faktov-ob-internete-v-metro-vo-vremena-rossiiskoi-impe?ref=group_block"
                                      target="_blank"
                                    >
                                      «url»
                                    </a>
                                  </li>
                                </ul>
                              </div>
                            </>
                          );
                        })}
                      </article>
                    </div>

                    <h3>CV Highlights</h3>

                    <p>
                      <ul>
                        <li>
                          {!user.cvHeighlits1 ? "sdfjskf" : user?.cvHeighlits1}
                        </li>
                        <li>
                          {!user.cvHeighlits2 ? "sdfjskf" : user.cvHeighlits2}
                        </li>
                        <li>
                          {!user.cvHeighlits3 ? "sdfjskf" : user.cvHeighlits3}
                        </li>
                      </ul>
                    </p>

                    <h3>Declaration</h3>
                    <p>
                      {!user.declaration
                        ? "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief."
                        : user.declaration}
                    </p>
                  </div>
                </div>
                <div className="col-lg-3">
                  <section className="resume-section skills-section mb-5">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Tech Skill
                    </h2>
                    <div className="resume-section-content">
                      <div className="resume-skill-item">
                        <ul className="list-unstyled mb-4">
                          <li className="mb-2">
                            <div className="resume-skill-name">
                              <Tag color="magenta">
                                {" "}
                                {!user.techSkill1 ? "css" : user.techSkill1}
                              </Tag>
                            </div>
                            {/* <Progress percent={user?.progress1} /> */}
                          </li>
                          <li className="mb-2">
                            <div className="resume-skill-name">
                              <Tag color="magenta">
                                {" "}
                                {!user.techSkill2 ? "js" : user.techSkill2}
                              </Tag>
                            </div>
                            {/* <Progress percent={user?.progress2} /> */}
                          </li>
                          <li className="mb-2">
                            <div className="resume-skill-name">
                              <Tag color="magenta">
                                {" "}
                                {!user.techSkill3 ? "html" : user.techSkill3}
                              </Tag>
                            </div>
                            {/* <Progress percent={user?.progress3} /> */}
                          </li>
                        </ul>
                      </div>
                    </div>
                  </section>
                  <section className="resume-section education-section mb-5">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Education
                    </h2>
                    {/* <div className="resume-section-content">
                                  <ul className="list-unstyled">
                                    <li className="mb-2">
                                      <div className="resume-degree font-weight-bold">
                                        {!user?.education?.[0]?.qualification
                                          ? "degree name"
                                          : user?.education?.[0]?.qualification}
                                      </div>
                                      <div className="resume-degree-org">
                                        {!user?.education?.[0]?.board
                                          ? "college name"
                                          : user?.education?.[0]?.board}
                                      </div>
                                      <div className="resume-degree-time">
                                        {!user?.education?.[0]?.year
                                          ? "year"
                                          : user?.education?.[0]?.year}
                                      </div>
                                      <div className="resume-degree-time">
                                        {!user?.education?.[0]?.percentage
                                          ? "cgpa"
                                          : user?.education?.[0]?.percentage}
                                      </div>
                                    </li>
                                    <li>
                                      <div className="resume-degree font-weight-bold">
                                        {!user?.education?.[1]?.qualification
                                          ? "degree name"
                                          : user?.education?.[1]?.qualification}
                                      </div>
                                      <div className="resume-degree-org">
                                        {!user?.education?.[0]?.board
                                          ? "college name"
                                          : user?.education?.[0]?.board}
                                      </div>
                                      <div className="resume-degree-time">
                                        {!user?.education?.[0]?.year
                                          ? "year"
                                          : user?.education?.[0]?.year}
                                      </div>
                                      <div className="resume-degree-time">
                                        {!user?.education?.[0]?.percentage
                                          ? "cgpa"
                                          : user?.education?.[0]?.percentage}
                                      </div>
                                    </li>
                                  </ul>
                                </div> */}

                    <div className="resume-section-content">
                      {user?.education &&
                        user?.education?.map((educationItem) => {
                          console.log("educationItem", educationItem);

                          return (
                            <>
                              <ul className="list-unstyled">
                                <li className="mb-2">
                                  <div className="resume-degree font-weight-bold">
                                    {!educationItem?.qualification
                                      ? "degree name"
                                      : educationItem?.qualification}
                                  </div>
                                  <div className="resume-degree-org">
                                    {!educationItem?.board
                                      ? "college name"
                                      : educationItem?.board}
                                  </div>
                                  <div className="resume-degree-time">
                                    {!educationItem?.year
                                      ? "year"
                                      : educationItem?.year}
                                  </div>
                                  <div className="resume-degree-time">
                                    {!educationItem?.percentage
                                      ? "cgpa"
                                      : educationItem?.percentage}
                                  </div>
                                </li>
                              </ul>
                            </>
                          );
                        })}
                    </div>
                  </section>
                  <section className="resume-section reference-section mb-5">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Achivements
                    </h2>
                    {/* <div className="resume-section-content">
                                  <ul className="list-unstyled resume-awards-list">
                                    <li className="mb-2 pl-4 position-relative">
                                      <i
                                        className="resume-award-icon fas fa-trophy position-absolute"
                                        data-fa-transform="shrink-2"
                                      ></i>
                                      <div className="resume-award-name">
                                        {!user?.award?.[0]
                                          ? "get award on something"
                                          : user?.award?.[0]}
                                      </div>
                                    </li>
                                    <li className="mb-2 pl-4 position-relative">
                                      <i
                                        className="resume-award-icon fas fa-trophy position-absolute"
                                        data-fa-transform="shrink-2"
                                      ></i>
                                      <div className="resume-award-name">
                                        {!user?.award?.[0]
                                          ? "get award on something"
                                          : user?.award?.[1]}
                                      </div>
                                    </li>
                                  </ul>
                                </div> */}

                    <div className="resume-section-content">
                      {user?.award &&
                        user?.award?.map((awardItem) => {
                          console.log("awardItem", awardItem);
                          return (
                            <>
                              <ul className="list-unstyled resume-awards-list">
                                <li className="mb-2 pl-4 position-relative">
                                  <i
                                    className="resume-award-icon fas fa-trophy position-absolute"
                                    data-fa-transform="shrink-2"
                                  ></i>
                                  <div className="resume-award-name">
                                    {!awardItem
                                      ? "get award on something"
                                      : awardItem}
                                  </div>
                                </li>
                              </ul>
                            </>
                          );
                        })}
                    </div>
                  </section>
                  <section className="resume-section language-section mb-5">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Language
                    </h2>
                    {/* <div className="resume-section-content">
                                  <ul className="list-unstyled resume-lang-list">
                                    <li className="mb-2">
                                      <span className="resume-lang-name font-weight-bold">
                                        {!user?.newLanguage?.fields?.[0]?.name
                                          ? "Language 1"
                                          : user?.newLanguage?.fields?.[0]?.name}
                                      </span>{" "}
                                      <small className="text-muted font-weight-normal">
                                        (
                                        {!user?.newLanguage?.fields?.[0]?.type
                                          ? "level"
                                          : user?.newLanguage?.fields?.[0]?.type}
                                        )
                                      </small>
                                    </li>
                                    <li className="mb-2">
                                      <span className="resume-lang-name font-weight-bold">
                                        {!user?.newLanguage?.fields?.[1]?.name
                                          ? "Language 1"
                                          : user?.newLanguage?.fields?.[1]?.name}
                                      </span>{" "}
                                      <small className="text-muted font-weight-normal">
                                        (
                                        {!user?.newLanguage?.fields?.[1]?.type
                                          ? "level"
                                          : user?.newLanguage?.fields?.[1]?.type}
                                        )
                                      </small>
                                    </li>
                                    <li className="mb-2">
                                      <span className="resume-lang-name font-weight-bold">
                                        {!user?.newLanguage?.fields?.[2]?.name
                                          ? ""
                                          : user?.newLanguage?.fields?.[2]?.name}
                                      </span>{" "}
                                      <small className="text-muted font-weight-normal">
                                        {!user?.newLanguage?.fields?.[2]?.type
                                          ? ""
                                          : user?.newLanguage?.fields?.[2]?.type}
                                      </small>
                                    </li>
                                 
                                  </ul>
                                </div> */}

                    <div className="resume-section-content">
                      {user?.newLanguage?.fields?.map((languageItem) => {
                        console.log(languageItem, "language Item");
                        return (
                          <>
                            <ul className="list-unstyled resume-lang-list">
                              <li className="mb-2">
                                <span className="resume-lang-name font-weight-bold">
                                  {!languageItem?.name
                                    ? "Language 1"
                                    : languageItem?.name}
                                </span>{" "}
                                <small className="text-muted font-weight-normal">
                                  (
                                  {!languageItem?.type
                                    ? "level"
                                    : languageItem?.type}
                                  )
                                </small>
                              </li>
                            </ul>
                          </>
                        );
                      })}
                    </div>
                  </section>
                  <section className="resume-section interests-section mb-5">
                    <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                      Hobbies
                    </h2>
                    <div className="resume-section-content">
                      <ul className="list-unstyled">
                        <li className="mb-1">
                          {!user?.hobbies?.toUpperCase()
                            ? "N/A"
                            : user?.hobbies?.toUpperCase()}
                        </li>
                        {/* <li className="mb-1">Редактурой</li>
								    <li className="mb-1">Дизайном</li> */}
                      </ul>
                    </div>
                  </section>
                </div>
              </div>
            </div>
          </div>
        </article>
      </div>
      <Button onClick={handlePrintt}>print</Button>
      <Link to="/about">
          <Button variant="dark edit" >
             Back
          </Button>
          </Link>    
            {/* <Button onClick={handlePrint}>Download as pdf</Button> */}
    </div>
  );
};

export default View;
