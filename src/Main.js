import { useState, useEffect, useRef, React } from "react";
import { Link } from "react-router-dom";
import { Container, Navbar, Row, Col, Table } from "react-bootstrap";
import AddBook from "./components/AddBook";
// import BooksList from "./components/BooksList";
import "./App.css";
import BookDataService from "../src/services/book.services";
import { Progress, InputNumber } from "antd";
import {
  collection,
  getDocs,
  getDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  serverTimestamp,
  query,
  orderBy,
} from "firebase/firestore";
import { bookCollectionRef } from "../src/services/book.services";
import { Divider, Space, Tag, Button, Checkbox, DatePicker, Input } from "antd";
import About from "./About";

import { async } from "@firebase/util";
import { getAllByAltText } from "@testing-library/react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

// import ShowData from "./components/ShowData";
// import { html2canvas } from "html2canvas";
// import { jspdf } from "jspdf";
// import { display } from "html2canvas/dist/types/css/property-descriptors/display";

function Main({ getBookId }) {
  <Divider orientation="left">Presets</Divider>;

  const aa = {
    style: {
      display: "none",
    },
    style1: {
      color: "red",
    },
  };

  const [bookId, setBookId] = useState("");
  const [books, setBooks] = useState("");
  const [show, setShow] = useState(false);

  const getBookIdHandler = (id) => {
    console.log("The ID of document to be edited: ", id);
    setBookId(id);
  };

  useEffect(() => {
    // getBooks();
    // console.log(qw);
  }, []);
  let qw = localStorage.getItem("names");

  const getBooks = async () => {
    // setShow(true);
    // const data = await BookDataService.getAllBooks();
    // console.log(data.docs);
    // setBooks(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));

    const q = query(bookCollectionRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  console.log("books data", books);
  const getAll = async () => {
    // setShow(true);
    const q = query(bookCollectionRef, orderBy("createdAt"));
    const querySnapshot = await getDocs(q);
    setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));

    // const q = query(bookCollectionRef, orderBy("createdAt"));
    // const querySnapshot = await getDocs(q);
    // setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  const propData = books;

  const getBookss = async () => {
    setShow(true);
    const data = await BookDataService.getAllBooks();
    console.log(data.docs);
    setBooks(data?.docs?.map((doc) => ({ ...doc.data(), id: doc.id })));
    // const q = query(bookCollectionRef, orderBy("createdAt"));
    // const querySnapshot = await getDocs(q);
    // setBooks(querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
  };
  // console.log("books",books);

  const deleteHandler = async (id) => {
    await BookDataService.deleteBook(id);
    getBooks();
  };
  // console.log(books[0]?.id,"doc id");

  // const editHandler=()=>{
  //  { books?.map((item) =>
  //   // getBookId(item?.id),
  // // getBookId={getBookIdHandler},
  // setShow(false)

  //   )
  // }
  // // getBookId={getBookIdHandler}

  // }

  // const handlePrint = () => {
  //   window.print();
  // };
  const divRef = useRef(null);
  const handlePrintt = () => {
    // const printContents = divRef.current.innerHTML;
    // const originalContents = document.body.innerHTML;
    // document.body.innerHTML = printContents;
    // window.print();
    // document.body.innerHTML = originalContents;
  };

  const handlePrint = () => {
    const input = document.getElementById("divToPrint");
    html2canvas(input).then((canvas) => {
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF("p", "px", [4500, 3931]);
      pdf.addImage(imgData, "PNG", 10, 10, 4100, 4400);
      pdf.save("download.pdf");
    });
  };

  return (
    <div className="App" id="pagetodownload">
      <>
        <Navbar bg="dark" variant="dark" className="header"></Navbar>

        <Container style={{ width: "400px" }}>
          <Row>
            <AddBook id={bookId} setBookId={setBookId} />

            <Col></Col>
          </Row>
        </Container>
        <Container>
          <Row>
            {/* <Col><BooksList getBookId={getBookIdHandler} /></Col> */}
          </Row>
        </Container>

        <div className="mb-2">
          <Button variant="dark edit" onClick={getBooks}>
            See Preview
          </Button>

          <Link to="/about">
            <Button variant="dark edit">
              {/* <About data={books} /> */}
              See All
            </Button>
          </Link>
        </div>
        <tbody>
          {books?.map &&
            books?.map((doc, index) => {
              console.log(doc, "doc data");
              const name = `${doc.fullName} ${doc.lastName}`;
              // console.log(name);
              //if not working
              if (index === books.length - 1) {
                return (
                  <>
                    {/* <About data = {books}/> */}
                    <div ref={divRef} id="divToPrint">
                      <article className="resume-wrapper text-center position-relative">
                        <div className="resume-wrapper-inner mx-auto text-left bg-white shadow-lg">
                          <header className="resume-header pt-4 pt-md-0">
                            <div className="media flex-column flex-md-row">
                              <a href="https://imgbb.com/">
                                <img
                                  src={
                                    !doc.url
                                      ? "https://www.pngfind.com/pngs/m/676-6764065_default-profile-picture-transparent-hd-png-download.png"
                                      : doc.url
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
                                    {name
                                      .toLowerCase()
                                      .split(" ")
                                      .map(
                                        (word) =>
                                          word.charAt(0).toUpperCase() +
                                          word.slice(1)
                                      )
                                      .join(" ")}
                                  </h1>
                                  <div className="title mb-3">
                                    {!doc?.newExperience?.[1]?.designation
                                      ? "Current Designation"
                                      : doc?.newExperience?.[1]?.designation}
                                  </div>
                                  <ul className="list-unstyled">
                                    <li className="mb-2">
                                      <a href="mailto:zveryanovstanis@gmail.com">
                                        <i
                                          className="far fa-envelope fa-fw mr-2"
                                          data-fa-transform="grow-3"
                                        ></i>
                                        {doc.email}
                                      </a>
                                    </li>
                                    <li>
                                      <a>
                                        <i
                                          className="fas fa-mobile-alt fa-fw mr-2"
                                          data-fa-transform="grow-6"
                                        ></i>
                                        {doc?.phoneNo}
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
                                        {doc?.linkedin}
                                      </a>
                                    </li>
                                    <li className="mb-3">
                                      <a href="https://vk.com/id19720848">
                                        <span className="fa-container text-center mr-2">
                                          <i
                                            className="fa fa-github"
                                            aria-hidden="true"
                                          ></i>
                                        </span>
                                        {doc?.github}
                                      </a>
                                    </li>
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
                                  {!doc.perDetails1
                                    ? "Master student in Visual Studies at the National Research University Higher School of Economics, I write and edit texts. I am engaged in academic research of video games, I blog about it in Telegram. I travel around Russia and the world, taking pictures on trips. I'm posting the photos on Byhans."
                                    : doc.perDetails1}{" "}
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
                                    <article className="resume-timeline-item position-relative pb-5">
                                      {doc.formDataList.map((workItem) => {
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
                                        {!doc.cvHeighlits1
                                          ? "sdfjskf"
                                          : doc?.cvHeighlits1}
                                      </li>
                                      <li>
                                        {!doc.cvHeighlits2
                                          ? "sdfjskf"
                                          : doc.cvHeighlits2}
                                      </li>
                                      <li>
                                        {!doc.cvHeighlits3
                                          ? "sdfjskf"
                                          : doc.cvHeighlits3}
                                      </li>
                                      {/* <li>
                                        {!doc.cvHeighlits4
                                          ? "sdfjskf"
                                          : doc.cvHeighlits4}
                                      </li> */}
                                    </ul>
                                  </p>

                                  <h3>Declaration</h3>
                                  <p>
                                    {!doc.declaration
                                      ? "I hereby declare that the details furnished above are true and correct to the best of my knowledge and belief."
                                      : doc.declaration}
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
                                      {/* <h4 className="resume-skills-cat font-weight-bold">
                                      В Адоуб
                                    </h4> */}
                                      <ul className="list-unstyled mb-4">
                                        <li className="mb-2">
                                          <div className="resume-skill-name">
                                            <Tag color="magenta">
                                              {" "}
                                              {!doc.techSkill1
                                                ? "css"
                                                : doc.techSkill1}
                                            </Tag>
                                          </div>
                                          {/* <div className="progress resume-progress"> */}
                                          {/* <Progress percent={doc?.progress1} /> */}

                                          {/* </div> */}
                                        </li>
                                        <li className="mb-2">
                                          <div className="resume-skill-name">
                                            <Tag color="magenta">
                                              {" "}
                                              {!doc.techSkill2
                                                ? "js"
                                                : doc.techSkill2}
                                            </Tag>
                                          </div>
                                          {/* <Progress percent={doc?.progress2} /> */}
                                        </li>
                                        <li className="mb-2">
                                          <div className="resume-skill-name">
                                            <Tag color="magenta">
                                              {" "}
                                              {!doc.techSkill3
                                                ? "html"
                                                : doc.techSkill3}
                                            </Tag>
                                          </div>
                                          {/* <Progress percent={doc?.progress3} /> */}
                                          {/* <div className="progress resume-progress"> */}
                                          {/* <div className="progress-bar theme-progress-bar-dark" role="progressbar" style="width: 77%" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div> */}
                                          {/* </div> */}
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </section>
                                <section className="resume-section education-section mb-5">
                                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                                    Education
                                  </h2>
                                  <div className="resume-section-content">
                                    {doc?.education &&
                                      doc?.education?.map((educationItem) => {
                                        console.log(
                                          "educationItem",
                                          educationItem
                                        );

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
                                  <div className="resume-section-content">
                                    {doc?.award &&
                                      doc?.award?.map((awardItem) => {
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
                                  <div className="resume-section-content">
                                    {doc?.newLanguage?.fields?.map(
                                      (languageItem) => {
                                        console.log(
                                          languageItem,
                                          "language Item"
                                        );
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
                                      }
                                    )}
                                  </div>
                                </section>
                                <section className="resume-section interests-section mb-5">
                                  <h2 className="resume-section-title text-uppercase font-weight-bold pb-3 mb-3">
                                    Hobbies
                                  </h2>
                                  <div className="resume-section-content">
                                    <ul className="list-unstyled">
                                      <li className="mb-1">
                                        {!doc.hobbies.toUpperCase()
                                          ? "N/A"
                                          : doc.hobbies.toUpperCase()}
                                      </li>
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
                    {/* <Button onClick={handlePrint}>Download as pdf</Button> */}
                  </>
                );
              }
            })}
        </tbody>
      </>
    </div>
  );
}

export default Main;
