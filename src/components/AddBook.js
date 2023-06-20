import React, { useState, useEffect } from "react";
import { Alert, FormGroup, ButtonGroup, Button as Butt } from "react-bootstrap";
import { storage } from "../firebase";
import { Container, Navbar, Row, Col, Table } from "react-bootstrap";
import { Progress, InputNumber } from "antd";

import BookDataService from "../services/book.services";
import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { v4 } from "uuid";
import { useHistory, useParams, Link } from "react-router-dom";

//for ant design

import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import {
  Button,
  Form,
  Input,
  Typography,
  Space,
  DatePicker,
  Checkbox,
  message,
  Switch
} from "antd";
import moment from "moment";
import DarkLight from "./DarkLight";

//for image field
import DynamicField from "./DynamicField";
import { serverTimestamp } from "firebase/database";
import "./AddBook.css";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 4,
    },
  },
  wrapperCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 20,
    },
  },
};
const formItemLayoutWithOutLabel = {
  wrapperCol: {
    xs: {
      span: 24,
      offset: 0,
    },
    sm: {
      span: 20,
      offset: 4,
    },
  },
};

//for language field

const defaultFormItemLayout = {
  labelCol: {
    xs: { span: 6 },
  },
  wrapperCol: {
    xs: { span: 12 },
  },
};

//for ant design

const AddBook = ({ setBookId }) => {
  const { id } = useParams();

  const [form] = Form.useForm();
  const [fullName, setFullName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNo, setPhoneNo] = useState(" ");
  const [linkedin, setLinkedin] = useState("");
  const [github, setGithub] = useState("");
  const [validEmail, setValidEmail] = useState(false);

  const [status, setStatus] = useState("Draft");

  const [flag, setFlag] = useState(true);
  const [image, setImage] = useState("");
  const [url, setUrl] = useState("");
  const [progress1, setProgress1] = useState();
  const [progress2, setProgress2] = useState(0);
  const [progress3, setProgress3] = useState(0);

  const [award1, setAward1] = useState("");
  const [award2, setAward2] = useState("");
  const [award3, setAward3] = useState("");
  const [award, setAward] = useState([]);

  const [board1, setBoard1] = useState("");
  const [board2, setBoard2] = useState("");
  const [board3, setBoard3] = useState("");

  const [percentage1, setPercentage1] = useState("");
  const [percentage2, setPercentage2] = useState("");
  const [percentage3, setPercentage3] = useState("");

  const [qualification1, setQualification1] = useState("");
  const [qualification2, setQualification2] = useState("");
  const [qualification3, setQualification3] = useState("");

  const [education, setEducation] = useState([]);

  const [year1, setYear1] = useState("");
  const [year2, setYear2] = useState("");
  const [year3, setYear3] = useState("");

  const [cvHeighlits1, setCvHeiglist1] = useState("");
  const [cvHeighlits2, setCvHeighlits2] = useState("");
  const [cvHeighlits3, setCvHeighlits3] = useState("");
  const [cvHeighlits4, setCvHeighlits4] = useState("");

  const [declaration, setDeclaration] = useState("");

  const [experience1, setExperience1] = useState("");
  const [experience2, setExperience2] = useState("");
  const [newExperience, setNewExperience] = useState([]);

  const [hobbies, setHobbies] = useState("");
  const [language, setLanguage] = useState([]);
  const [newLanguage, setNewLanguage] = useState([]);
  const [perDetails1, setPerDetails1] = useState("");

  const [techSkill1, setTechSkill1] = useState("");
  const [techSkill2, setTechSkill2] = useState("");
  const [techSkill3, setTechSkill3] = useState("");
  const [message, setMessage] = useState({ error: false, msg: "" });
  const [uuid, setUuid] = useState("");
  const [error, setError] = useState(null);
  const [errorEmail, setErrorEmail] = useState(null);
  const [checked, setChecked] = useState(false);
  const [formDataList, setFormDataList] = useState([]);
  const [nextId, setNextId] = useState(2);

  const onFinish = (values) => {
    console.log("Received values of form:", values);
  };

  useEffect(() => {
    //  console.log(uuid);
  }, []);
  const ab = v4();

  // console.log(education);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");

    // setTimeout(() => {
    //   setMessage("");
    // }, 2500);
    // setUuid(ab);
    // if (fullName === "") {
    //   setMessage({ error: true, msg: "All fields are mandatory!" });
    //   setTimeout(() => {
    //     setMessage("");
    //   }, 2500);
    // }
    // else if(!validEmail){
    //   setMessage({ error: true, msg: "correct email is mandatory" });
    //   return;

    // }

    const newBook = {
      fullName,
      lastName,
      url,
      image,
      email,
      phoneNo,
      linkedin,
      github,
      cvHeighlits1,
      cvHeighlits2,
      cvHeighlits3,
      cvHeighlits4,
      award,
      education,
      award1,
      award2,
      award3,
      experience1,
      experience2,
      newExperience,
      board1,
      board2,
      board3,
      year1,
      year2,
      year3,
      percentage1,
      percentage2,
      percentage3,
      qualification1,
      qualification2,
      qualification3,
      board1,
      hobbies,
      perDetails1,
      techSkill1,
      techSkill2,
      techSkill3,
      language,
      newLanguage,
      declaration,
      uuid,
      createdAt: new Date(),
      formDataList,
      status,
      // progress1,
      // progress2,
      // progress3,
    };
    console.log(newBook, "newbook");

    try {
      if (id !== undefined && id !== "") {
        console.log("id", id);
        await BookDataService.updateBook(id, newBook);
        // setBookId("");
        setMessage({ error: false, msg: "Updated successfully!" });
      } else {
        await BookDataService.addBooks(newBook);
        setMessage({ error: false, msg: "New record added successfully!" });
      }
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }

    setFullName("");
    setLastName("");
    setImage("");
    setUrl("");
    setEmail("");
    setPhoneNo("");
    setLinkedin("");
    setGithub("");
    setAward("");
    setEducation("");
    setAward1("");
    setAward2("");
    setAward3("");
    setExperience1("");
    setExperience2("");
    setNewExperience("");
    setHobbies("");
    setTechSkill1("");
    setTechSkill2("");
    setTechSkill3("");
    setPerDetails1("");
    setDeclaration("");
    setCvHeighlits2("");
    setCvHeiglist1("");
    setCvHeighlits3("");
    setCvHeighlits4("");
    setLanguage("");
    setNewLanguage("");
    setBoard1("");
    setBoard2("");
    setBoard3("");
    setQualification1("");
    setQualification2("");
    setQualification3("");
    setYear1("");
    setYear2("");
    setYear3("");
    setPercentage1("");
    setPercentage2("");
    setPercentage3("");
    setProgress1("");
    setProgress2("");
    setProgress3("");
  };
  // console.log(uuid);

  const uploadImage = () => {
    if (image == null) return;
    const imageRef = ref(storage, "/images/" + image.name);

    uploadBytes(imageRef, image)
      .then(() => {
        getDownloadURL(imageRef)
          .then((url) => {
            setUrl(url);
          })
          .catch((error) => {
            console.log(error.message, "erreor getting image url ");
          });
        setImage(null);
      })
      .catch((error) => {
        console.log(error.message);
      });
  };
  // console.log(url,"url");

  // const handleChange = (e) => {
  //   if (e.target.files[0]) {
  //     setImage(e.target.files[0]);
  //   }
  // };
  const types = ["image/png", "image/jpeg"];

  const handleChange = (e) => {
    let selectedFile = e.target.files[0];
    if (selectedFile && types.includes(selectedFile.type)) {
      setImage(selectedFile);
      setError(null);
    } else {
      setImage(null);
      setError("Please select a valid image file (png or jpeg)");
    }
  };
  // const handleCheckboxChange = (e, key) => {
  //   // console.log(key,"key");
  //   for (let i = 0; i < key; i++) {
  //     if (key[i].isChecked === true) {
  //       console.log("yes checked");
  //     } else {
  //       console.log("not checked");
  //     }
  //   }
  //   // console.log("checked",e.target.checked);
  //   let checkValue = e.target.checked;
  //   setChecked(checkValue);
  // };
  const emailHandler = (e) => {
    setEmail(e.target.value);
    // Email validation regex pattern
    const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setValidEmail(pattern.test(e.target.value));
    if (!validEmail) {
      console.log("dss");
      // const qqa = <div style={{color:"black"}}>dfffsdf</div>
    }
  };

  //new one
  const handleCheckboxChangee = (event, id) => {
    const newList = formDataList.map((formData) => {
      if (formData.id === id) {
        return {
          ...formData,
          checkboxChecked: event.target.checked,
          // dateFieldValue: "",
          additionalDateFieldValue: "",
        };
      } else {
        return formData;
      }
    });
    setFormDataList(newList);
  };

  const handleDateFieldChange = (date, dateString, id) => {
    const newList = formDataList.map((formData) => {
      if (formData.id === id) {
        return { ...formData, dateFieldValue: dateString };
      } else {
        return formData;
      }
    });
    setFormDataList(newList);
  };

  const handleAdditionalDateFieldChange = (date, dateString, id) => {
    const updatedFormDataList = formDataList.map((formData) => {
      if (formData.id === id) {
        const startDate = moment(formData.dateFieldValue, "YYYY-MM-DD");
        const endDate = moment(dateString, "YYYY-MM-DD");
        if (
          startDate.isValid() &&
          endDate.isValid() &&
          endDate.isBefore(startDate)
        ) {
          // message.error("End date cannot be earlier than start date");
          alert("End date cannot be earlier than start date ");
          return formData;
        } else {
          return {
            ...formData,
            additionalDateFieldValue: dateString,
          };
        }
      } else {
        return formData;
      }
    });
    setFormDataList(updatedFormDataList);
  };

  const handleTextInputChange = (event, id) => {
    const newList = formDataList.map((formData) => {
      if (formData.id === id) {
        return { ...formData, textInputValue: event.target.value };
      } else {
        return formData;
      }
    });
    setFormDataList(newList);
  };

  const handleSecondTextInputChange = (event, id) => {
    const newList = formDataList.map((formData) => {
      if (formData.id === id) {
        return { ...formData, textSecondInputValue: event.target.value };
      } else {
        return formData;
      }
    });
    setFormDataList(newList);
  };
  const handleJobResponsibilityInputChange = (event, id) => {
    const newList = formDataList.map((formData) => {
      if (formData.id === id) {
        return { ...formData, jobResponsibility: event.target.value };
      } else {
        return formData;
      }
    });
    setFormDataList(newList);
  };

  const handleAddField = () => {
    setFormDataList([
      ...formDataList,
      {
        id: nextId,
        checkboxChecked: false,
        dateFieldValue: "",
        additionalDateFieldValue: "",
        textInputValue: "",
        textSecondInputValue: "",
      },
    ]);
    setNextId(nextId + 1);
  };

  const handleRemoveField = (id) => {
    const newList = formDataList.filter((formData) => formData.id !== id);
    setFormDataList(newList);
  };
  useEffect(() => {});

  const handleSubmitt = (event) => {
    event.preventDefault();
    console.log(formDataList);
  };

  const handleFinish = (values) => {
    console.log("VALUES", values);
    setNewLanguage(values);
    //alert("Check console for values");
  };
  // console.log(newLanguage)

  // console.log(image);
  const editHandler = async () => {
    setMessage("");
    try {
      const docSnap = await BookDataService.getBook(id);
      console.log("the record is :", docSnap.data());
      setFullName(docSnap.data().fullName);
      setLastName(docSnap.data().lastName);
      setStatus(docSnap.data().status);
      setProgress1(docSnap.data().progress1);
      setProgress2(docSnap.data().progress2);
      setProgress3(docSnap.data().progress3);

      setImage(docSnap.data().image);
      setEmail(docSnap.data().email);
      setPhoneNo(docSnap.data().phoneNo);
      setLinkedin(docSnap.data().linkedin);
      setGithub(docSnap.data().github);
      setAward(docSnap.data().award);
      setEducation(docSnap.data().education);
      setCvHeiglist1(docSnap.data().cvHeighlits1);
      setCvHeighlits2(docSnap.data().cvHeighlits2);
      setCvHeighlits3(docSnap.data().cvHeighlits3);
      setCvHeighlits4(docSnap.data().cvHeighlits4);
      setBoard1(docSnap.data().board1);
      setBoard2(docSnap.data().board2);
      setBoard3(docSnap.data().board3);
      setYear1(docSnap.data().year1);
      setYear2(docSnap.data().year2);
      setYear3(docSnap.data().year3);
      setQualification1(docSnap.data().qualification1);
      setQualification2(docSnap.data().qualification2);
      setQualification3(docSnap.data().qualification3);
      setPercentage1(docSnap.data().percentage1);
      setPercentage2(docSnap.data().percentage2);
      setPercentage3(docSnap.data().percentage3);

      setAward1(docSnap.data().award1);
      setAward2(docSnap.data().award2);
      setAward3(docSnap.data().award3);
      setExperience1(docSnap.data().experience1);
      setExperience2(docSnap.data().experience2);
      setNewExperience(docSnap.data().newExperience);
      setHobbies(docSnap.data().hobbies);
      setPerDetails1(docSnap.data().perDetails1);
      setTechSkill1(docSnap.data().techSkill1);
      setTechSkill2(docSnap.data().techSkill2);
      setTechSkill3(docSnap.data().techSkill3);
      setLanguage(docSnap.data().language);
      setNewLanguage(docSnap.data().newLanguage);
      setDeclaration(docSnap.data().declaration);
    } catch (err) {
      setMessage({ error: true, msg: err.message });
    }
  };

  useEffect(() => {
    console.log("The id here is : ", id);
    if (id !== undefined && id !== "") {
      editHandler();
    }
  }, [id]);

  const onProgressChange = (e) => {
    setProgress1(e.target.value);
  };
  const onProgressChangee = (e) => {
    setProgress2(e.target.value);
  };
  const onProgressChangeee = (e) => {
    setProgress3(e.target.value);
  };
  if (id !== undefined && id !== "") {
    return (
      <>
        <Container style={{ width: "400px" }}>
          <Row>
            <div className="App">
              <div className="p-4 box">
                {message?.msg && (
                  <Alert
                    variant={message?.error ? "danger" : "success"}
                    dismissible
                    onClose={() => setMessage("")}
                  >
                    {message?.msg}
                  </Alert>
                )}
                <div className="items">
                  {/* <ButtonGroup aria-label="Basic example" className="mb-3">
                    <Butt
                    style={{borderRadius:"50%"}}
                      disabled={flag}
                      variant="success"
                      onClick={(e) => {
                        setStatus("Draft");
                        setFlag(true);
                      }}
                    >
                      Draft
                    </Butt>
                    <Butt
                      variant="danger"
                      disabled={!flag}
                      onClick={(e) => {
                        setStatus("Compleate");
                        setFlag(false);
                      }}
                    >
                      Compleate
                    </Butt>
                  </ButtonGroup> */}

<Switch
    checked={status === "Draft"}
    onChange={(checked) => {
        setStatus(checked ? "Draft" : "Compleate");
        setFlag(!checked);
    }}
    checkedChildren="Draft"
    unCheckedChildren="Compleate"
/>
                  <p>Personal lsDetails</p>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      placeholder="First Name"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  
                    {/* <br></br> */}
                    <span style={{ marginLeft: "5px" }}>
                      <input
                        type="text"
                        placeholder="Last Name"
                        value={lastName}
                        onChange={(e) => setLastName(e.target.value)}
                      />
                    </span>
                  </div>
                  <br></br>
                  <div style={{display:"flex"}}>
                  <input
                    type="file"
                    placeholder="Upload Image"
                    onChange={handleChange}
                  
                  />
                  {error && <div style={{ color: "red" }}>{error}</div>}
                  <button onClick={uploadImage} style={{marginLeft:"50px" }}>
                    upload
                  </button>
                  </div>
                  {!validEmail && (
                    <p style={{ color: "red", display: "none" }}>
                      {"please give correct email"}
                    </p>
                  )}{" "}
                  {validEmail && (
                    <p style={{ color: "green" }}>{"correct email"}</p>
                  )}
                  <div style={{ display: "flex" }}>
                    <input
                      type="email"
                      placeholder="Email"
                      value={email}
                      // onChange={(e) => setEmail(e.target.value)}
                      onChange={emailHandler}
                    />

                    <span style={{ marginLeft: "5px" }}>
                      <input
                        type="number"
                        placeholder="+91-0000 0000 00"
                        value={phoneNo}
                        onChange={(e) => setPhoneNo(e.target.value)}
                      />
                    </span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <input
                      type="text"
                      placeholder="Linkedin Link"
                      value={linkedin}
                      onChange={(e) => setLinkedin(e.target.value)}
                    />
                    <span style={{ marginLeft: "5px" }}>
                      <input
                        type="text"
                        placeholder="Github link"
                        value={github}
                        onChange={(e) => setGithub(e.target.value)}
                      />
                    </span>
                  </div>
                  <div style={{ display: "flex" }}>
                    <input
                      type="textarea"
                      placeholder="something about your self "
                      value={perDetails1}
                      onChange={(e) => setPerDetails1(e.target.value)}
                    />
                    <span style={{ marginLeft: "5px" }}>
                      <input
                        type="text"
                        placeholder="hobbies"
                        value={hobbies}
                        onChange={(e) => setHobbies(e.target.value)}
                      />
                    </span>
                  </div>

                  <p>Technical Skills</p>
                  <div style={{ float: "left" }}>
                    <input
                      type="text"
                      placeholder="TechSkill1"
                      value={techSkill1}
                      onChange={(e) => setTechSkill1(e.target.value)}
                    />

                    {/* <InputNumber style={{marginLeft:"50px", backgroundColor:"white"}} min={0} max={100} defaultValue={0} onChange={onProgressChange} /> */}
                    {/* <input
                      type="number"
                      placeholder="scale"
                      style={{ marginLeft: "0px", backgroundColor: "white" }}
                      min={0}
                      max={100}
                      defaultValue={0}
                      onChange={onProgressChange}
                    /> */}

                    <input
                      type="text"
                      placeholder="techSkill 2"
                      value={techSkill2}
                      onChange={(e) => setTechSkill2(e.target.value)}
                    />
                    {/* <input type="number" placeholder="scale" style={{marginLeft:"0px", backgroundColor:"white"}} min={0} max={100} defaultValue={0} onChange={onProgressChange} /> */}

                    <input
                      type="text"
                      placeholder="tech Skill3"
                      value={techSkill3}
                      onChange={(e) => setTechSkill3(e.target.value)}
                    />
                    {/* <input type="number" placeholder="scale" style={{marginLeft:"0px", backgroundColor:"white"}} min={0} max={100} defaultValue={0} onChange={onProgressChange} /> */}
                  </div>
                  <div style={{ float: "left" }}>
                    <p>keyWords</p>

                    <input
                      type="text"
                      placeholder="cvHighlight1"
                      value={cvHeighlits1}
                      onChange={(e) => setCvHeiglist1(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="cvHighlight2"
                      value={cvHeighlits2}
                      onChange={(e) => setCvHeighlits2(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="cvHighlight3"
                      value={cvHeighlits3}
                      onChange={(e) => setCvHeighlits3(e.target.value)}
                    />

                    <input
                      type="text"
                      placeholder="cvHighlight4"
                      value={cvHeighlits4}
                      onChange={(e) => setCvHeighlits4(e.target.value)}
                    />
                  </div>
                  <br></br>
                  <br></br>
                  <textarea
                    style={{ marginLeft: "0px" }}
                    type="textarea"
                    rows="2"
                    cols="41"
                    placeholder="declaration"
                    value={declaration}
                    onChange={(e) => setDeclaration(e.target.value)}
                  />
                </div>
                <br></br>
                <div className="Section">
                  <label>Award/ certificate</label>
                  <Form
                    name="dynamic_form_item"
                    {...formItemLayoutWithOutLabel}
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                  >
                    <Form.List
                      name="names"
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error("At least 1"));
                            }
                            setAward(names);
                          },
                        },
                      ]}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item
                              {...(index === 0
                                ? formItemLayout
                                : formItemLayoutWithOutLabel)}
                              label={index === 0 ? "Awards" : ""}
                              required={false}
                              key={field.key}
                              style={{ marginRight: "-0px" }}
                            >
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input about cerification or awards.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Awards or Certifications"
                                  style={{
                                    width: "60%",
                                  }}
                                />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{
                                width: "163.5%",
                                marginLeft: "-100px",
                              }}
                              icon={<PlusOutlined />}
                            >
                              {/* <PlusOutlined /> */}
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="Submit"
                        style={{ marginLeft: "130px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <br></br>

                {/* ant design for education */}
                <div className="Section">
                  <p>Education details</p>
                  <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                    autoComplete="off"
                  >
                    <Form.List
                      name="users"
                      rules={[
                        {
                          validator: async (_, users) => {
                            if (!users || users.length < 2) {
                              return Promise.reject(new Error("At least 2"));
                            }
                            setEducation(users);
                          },
                        },
                      ]}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                              }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "qualification"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing qualification name",
                                  },
                                ]}
                              >
                                <Input placeholder="qualification Name" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "board"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing board name",
                                  },
                                ]}
                              >
                                <Input placeholder="board Name" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "percentage"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing percentage name",
                                  },
                                ]}
                              >
                                <Input placeholder="percentage Name" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "year"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing year name",
                                  },
                                ]}
                              >
                                <Input placeholder="year Name" />
                              </Form.Item>
                              <MinusCircleOutlined
                                type="danger"
                                onClick={() => remove(name)}
                              ></MinusCircleOutlined>
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                              style={{
                                width: "136.4%",
                                marginLeft: "0px",
                              }}
                            >
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "225px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <br></br>

                {/* for language field */}
                <div className="Section">
                  <p>Language Known</p>
                  <Form
                    form={form}
                    {...defaultFormItemLayout}
                    onFinish={handleFinish}
                  >
                    <DynamicField />
                    <Form.Item>
                      {/* <Button type="primary" htmlType="submit"> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "375px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                <br></br>
                {/* exp details */}
                <div
                  className="Section"
                  //  style={{width:"100%",maxWidth: 500, margin: "0 auto"}}
                >
                  <p>Experience Details</p>

                  <Form onSubmit={handleSubmitt}>
                    {formDataList.map((formData) => (
                      <div key={formData.id}>
                        <Input
                          placeholder="Company Name"
                          value={formData.textInputValue}
                          onChange={(event) =>
                            handleTextInputChange(event, formData.id)
                          }
                        />
                        <br />
                        <Input
                          placeholder="Job Title"
                          value={formData.textSecondInputValue}
                          onChange={(event) =>
                            handleSecondTextInputChange(event, formData.id)
                          }
                        />
                        <br />

                        <Input
                          placeholder="Job Responsibility"
                          value={formData.jobResponsibility}
                          onChange={(event) =>
                            handleJobResponsibilityInputChange(
                              event,
                              formData.id
                            )
                          }
                        />
                        <br />

                        <DatePicker
                          //   value={
                          //   formData.dateFieldValue
                          //     ? moment(formData.dateFieldValue, "YYYY-MM-DD")
                          //     : null
                          // }
                          onChange={(date, dateString) => {
                            console.log(
                              date,
                              dateString,
                              "date and satastring"
                            );
                            handleDateFieldChange(
                              date,
                              dateString,
                              formData.id
                            );
                          }}
                        />

                        <DatePicker
                          disabled={formData.checkboxChecked}
                          // value={
                          //   formData.additionalDateFieldValue
                          //     ? moment(formData.additionalDateFieldValue, "YYYY-MM-DD")
                          //     : null
                          // }
                          onChange={(date, dateString) =>
                            handleAdditionalDateFieldChange(
                              date,
                              dateString,
                              formData.id
                            )
                          }
                        />
                        <br />
                        <Checkbox
                          checked={formData.checkboxChecked}
                          onChange={(event) =>
                            handleCheckboxChangee(event, formData.id)
                          }
                        >
                          I'm Currently Working Here
                        </Checkbox>
                        <br />

                        <MinusCircleOutlined
                          type="danger"
                          onClick={() => handleRemoveField(formData.id)}
                          // onClick={() => handleRemoveField(formData.id)}
                          // <MinusCircleOutlined onClick={() => remove(name)} />
                        ></MinusCircleOutlined>
                        <hr />
                      </div>
                    ))}
                    <Button
                      onClick={handleAddField}
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Field
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form>
                </div>

                <br></br>

                {/* Form submit button */}
                <div className="d-grid gap-2">
                  {/* <Button variant="primary" disabled={image===""} onClick={handleSubmit}> */}
                  <Button variant="primary" onClick={handleSubmit}>
                    update
                  </Button>
                 <Link to = '/about'>
                  <Button>
                    go back
                  </Button>
                  </Link>
                </div>
              </div>
            </div>
            {/* <Ant/> */}
          </Row>
        </Container>
      </>
    );
  } else {
    return (
      <>
        <Container style={{ width: "400px" }}>
          <Row>
            <div className="App">
              <div className="p-4 box">
                {message?.msg && (
                  <Alert
                    variant={message?.error ? "danger" : "success"}
                    dismissible
                    onClose={() => setMessage("")}
                  >
                    {message?.msg}
                  </Alert>
                )}
                <div className="items">
                  <Switch
                  style={{backgroundColor: status === "Draft" ? "red" : "green"}}
    checked={status === "Draft"}
    onChange={(checked) => {
        setStatus(checked ? "Draft" : "Compleate");
        setFlag(!checked);
    }}
    checkedChildren="Draft"
    unCheckedChildren="Compleate"
/>


                  <div>
                    <p>Personal Details</p>
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        placeholder="First Name"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                      />
                      <span style={{ marginLeft: "5px" }}>
                        <input
                          type="text"
                          placeholder="Last Name"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                        />
                      </span>
                    </div>
                    <br></br>
                    <div style={{display:"flex"}}>
                    <input
                      type="file"
                      placeholder="Upload Image"
                      onChange={handleChange}
                    />
                    {error && <div style={{ color: "red" }}>{error}</div>}
                    <button
                      onClick={uploadImage}
                      style={{ marginLeft: "50px" }}
                    >
                      upload
                    </button>
                    </div>
                    <br></br>
                    {!validEmail && (
                      <p style={{ color: "red", display: "none" }}>
                        {"please give correct email"}
                      </p>
                    )}{" "}
                    {validEmail && (
                      <p style={{ color: "green" }}>{"correct email"}</p>
                    )}
                    <div style={{ display: "flex" }}>
                      <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={emailHandler}
                      />

                      <span style={{ marginLeft: "5px" }}>
                        <input
                          type="number"
                          placeholder="+91-0000 0000 00"
                          value={phoneNo}
                          onChange={(e) => setPhoneNo(e.target.value)}
                        />
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="text"
                        placeholder="Linkedin Link"
                        value={linkedin}
                        onChange={(e) => setLinkedin(e.target.value)}
                      />
                      <span style={{ marginLeft: "5px" }}>
                        <input
                          type="text"
                          placeholder="Github link"
                          value={github}
                          onChange={(e) => setGithub(e.target.value)}
                        />
                      </span>
                    </div>
                    <div style={{ display: "flex" }}>
                      <input
                        type="textarea"
                        placeholder="something about your self "
                        value={perDetails1}
                        onChange={(e) => setPerDetails1(e.target.value)}
                      />
                      <span style={{ marginLeft: "5px" }}>
                        <input
                          type="text"
                          placeholder="hobbies"
                          value={hobbies}
                          onChange={(e) => setHobbies(e.target.value)}
                        />
                      </span>
                    </div>
<div className="parentDiv" style={{display:"flex",alignItems:"flex-start"}}>
                    <div style={{  }}>
                    <p>Technical Skills</p>
                      <input
                        type="text"
                        placeholder="techSkill1"
                        value={techSkill1}
                        onChange={(e) => setTechSkill1(e.target.value)}
                      />
{/* 
                      <input
                        type="number"
                        placeholder="scale"
                        style={{ marginLeft: "0px", backgroundColor: "white" }}
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={onProgressChange}
                      /> */}

                      <input
                        type="text"
                        placeholder="techSkill2"
                        value={techSkill2}
                        onChange={(e) => setTechSkill2(e.target.value)}
                      />
                      {/* <input
                        type="number"
                        placeholder="scale"
                        style={{ marginLeft: "0px", backgroundColor: "white" }}
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={onProgressChangee}
                      /> */}

                      <input
                        type="text"
                        placeholder="tech Skill3"
                        value={techSkill3}
                        onChange={(e) => setTechSkill3(e.target.value)}
                      />
                      {/* <input
                        type="number"
                        placeholder="scale"
                        style={{ marginLeft: "0px", backgroundColor: "white" }}
                        min={0}
                        max={100}
                        defaultValue={0}
                        onChange={onProgressChangeee}
                      /> */}
                    </div>
                    <div style={{ }}>
                      <p>keyWords</p>

                      <input
                        type="text"
                        placeholder="cvHighlight1"
                        value={cvHeighlits1}
                        onChange={(e) => setCvHeiglist1(e.target.value)}
                      />


                      <input
                        type="text"
                        placeholder="cvHighlight2"
                        value={cvHeighlits2}
                        onChange={(e) => setCvHeighlits2(e.target.value)}
                      />

                      <input
                        type="text"
                        placeholder="cvHighlight3"
                        value={cvHeighlits3}
                        onChange={(e) => setCvHeighlits3(e.target.value)}
                      />

                      {/* <input
                        type="text"
                        placeholder="cvHighlight4"
                        value={cvHeighlits4}
                        onChange={(e) => setCvHeighlits4(e.target.value)}
                      /> */}
                    </div>
 </div>
                    <br></br>
                    <textarea
                      style={{ marginLeft: "-120px",width:"200%" }}
                      type="textarea"
                      rows="2"
                      cols="41"
                      placeholder="declaration"
                      value={declaration}
                      onChange={(e) => setDeclaration(e.target.value)}
                    />
                  </div>
                </div>
                <br></br>
                <div className="Section">
                  <label>Award/ certificate</label>
                  <Form
                    name="dynamic_form_item"
                    {...formItemLayoutWithOutLabel}
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                  >
                    <Form.List
                      name="names"
                      rules={[
                        {
                          validator: async (_, names) => {
                            if (!names || names.length < 1) {
                              return Promise.reject(new Error("At least 1"));
                            }
                            setAward(names);
                          },
                        },
                      ]}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map((field, index) => (
                            <Form.Item
                              {...(index === 0
                                ? formItemLayout
                                : formItemLayoutWithOutLabel)}
                              label={index === 0 ? "Awards" : ""}
                              required={false}
                              key={field.key}
                              style={{ marginRight: "-0px" }}
                            >
                              <Form.Item
                                {...field}
                                validateTrigger={["onChange", "onBlur"]}
                                rules={[
                                  {
                                    required: true,
                                    whitespace: true,
                                    message:
                                      "Please input about cerification or awards.",
                                  },
                                ]}
                                noStyle
                              >
                                <Input
                                  placeholder="Awards or Certifications"
                                  style={{
                                    width: "60%",
                                  }}
                                />
                              </Form.Item>
                              {fields.length > 1 ? (
                                <MinusCircleOutlined
                                  className="dynamic-delete-button"
                                  onClick={() => remove(field.name)}
                                />
                              ) : null}
                            </Form.Item>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              style={{
                                width: "163.5%",
                                marginLeft: "-100px",
                              }}
                              icon={<PlusOutlined />}
                            >
                              {/* <PlusOutlined /> */}
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="Submit"
                        style={{ marginLeft: "130px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <br></br>

                {/* ant design for education */}
                <div className="Section">
                  <p>Education details</p>
                  <Form
                    name="dynamic_form_nest_item"
                    onFinish={onFinish}
                    style={{
                      maxWidth: 600,
                    }}
                    autoComplete="off"
                  >
                    <Form.List
                      name="users"
                      rules={[
                        {
                          validator: async (_, users) => {
                            if (!users || users.length < 2) {
                              return Promise.reject(new Error("At least 2"));
                            }
                            setEducation(users);
                          },
                        },
                      ]}
                    >
                      {(fields, { add, remove }, { errors }) => (
                        <>
                          {fields.map(({ key, name, ...restField }) => (
                            <Space
                              key={key}
                              style={{
                                display: "flex",
                                marginBottom: 8,
                              }}
                              align="baseline"
                            >
                              <Form.Item
                                {...restField}
                                name={[name, "qualification"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing qualification name",
                                  },
                                ]}
                              >
                                <Input placeholder="qualification Name" />
                              </Form.Item>
                              <Form.Item
                                {...restField}
                                name={[name, "board"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing board name",
                                  },
                                ]}
                              >
                                <Input placeholder="board Name" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "percentage"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing percentage name",
                                  },
                                ]}
                              >
                                <Input placeholder="percentage Name" />
                              </Form.Item>

                              <Form.Item
                                {...restField}
                                name={[name, "year"]}
                                rules={[
                                  {
                                    required: true,
                                    message: "Missing year name",
                                  },
                                ]}
                              >
                                <Input placeholder="year Name" />
                              </Form.Item>
                              <MinusCircleOutlined
                                type="danger"
                                onClick={() => remove(name)}
                              ></MinusCircleOutlined>
                            </Space>
                          ))}
                          <Form.Item>
                            <Button
                              type="dashed"
                              onClick={() => add()}
                              block
                              icon={<PlusOutlined />}
                              style={{
                                width: "136.4%",
                                marginLeft: "0px",
                              }}
                            >
                              Add field
                            </Button>
                            <Form.ErrorList errors={errors} />
                          </Form.Item>
                        </>
                      )}
                    </Form.List>
                    <Form.Item>
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "225px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>
                <br></br>

                {/* for language field */}
                <div className="Section">
                  <p>Language Known</p>
                  <Form
                    form={form}
                    {...defaultFormItemLayout}
                    onFinish={handleFinish}
                  >
                    <DynamicField />
                    <Form.Item>
                      {/* <Button type="primary" htmlType="submit"> */}
                      <Button
                        type="primary"
                        htmlType="submit"
                        style={{ marginLeft: "375px" }}
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Form>
                </div>

                <br></br>
                {/* exp details */}
                <div
                  className="Section"
                  //  style={{width:"100%",maxWidth: 500, margin: "0 auto"}}
                >
                  <p>Experience Details</p>

                  <Form onSubmit={handleSubmitt}>
                    {formDataList.map((formData) => (
                      <div key={formData.id}>
                        <Input
                          placeholder="Company Name"
                          value={formData.textInputValue}
                          onChange={(event) =>
                            handleTextInputChange(event, formData.id)
                          }
                        />
                        <br />
                        <Input
                          placeholder="Job Title"
                          value={formData.textSecondInputValue}
                          onChange={(event) =>
                            handleSecondTextInputChange(event, formData.id)
                          }
                        />
                        <br />

                        <Input
                          placeholder="Job Responsibility"
                          value={formData.jobResponsibility}
                          onChange={(event) =>
                            handleJobResponsibilityInputChange(
                              event,
                              formData.id
                            )
                          }
                        />
                        <br />

                        <DatePicker
                          //   value={
                          //   formData.dateFieldValue
                          //     ? moment(formData.dateFieldValue, "YYYY-MM-DD")
                          //     : null
                          // }
                          onChange={(date, dateString) => {
                            console.log(
                              date,
                              dateString,
                              "date and satastring"
                            );
                            handleDateFieldChange(
                              date,
                              dateString,
                              formData.id
                            );
                          }}
                        />

                        <DatePicker
                          disabled={formData.checkboxChecked}
                          // value={
                          //   formData?.additionalDateFieldValue
                          //     ?moment(formData.additionalDateFieldValue, "YYYY-MM-DD")
                          //     : null
                          //    }
                          
                          onChange={(date, dateString) =>
                            handleAdditionalDateFieldChange(
                              date,
                              dateString,
                              formData.id
                            )
                          }
                        />
                        <br />
                        <Checkbox
                          checked={formData.checkboxChecked}
                          onChange={(event) =>
                            handleCheckboxChangee(event, formData.id)
                          }
                        >
                          I'm Currently Working Here
                        </Checkbox>
                        <br />

                        <MinusCircleOutlined
                          type="danger"
                          onClick={() => handleRemoveField(formData.id)}
                          // onClick={() => handleRemoveField(formData.id)}
                          // <MinusCircleOutlined onClick={() => remove(name)} />
                        ></MinusCircleOutlined>
                        <hr />
                      </div>
                    ))}
                    <Button
                      onClick={handleAddField}
                      type="dashed"
                      block
                      icon={<PlusOutlined />}
                    >
                      Add Field
                    </Button>
                    <br />
                    <br />
                    <Button type="primary" htmlType="submit">
                      Submit
                    </Button>
                  </Form>
                </div>

                <br></br>

                {/* Form submit button */}
                <div className="d-grid gap-2">
                  {/* <Button variant="primary" disabled={image===""} onClick={handleSubmit}> */}
                  <Button variant="primary" onClick={handleSubmit}>
                    Add
                  </Button>
                </div>
              </div>
            </div>
            {/* <Ant/> */}
          </Row>
        </Container>
      </>
    );
  }
};

export default AddBook;
