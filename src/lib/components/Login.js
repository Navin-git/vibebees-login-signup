import React, { useState } from "react";
import { useEffect } from "react";

import { useQuery, gql } from "@apollo/client";
import { LOAD_USERS } from "../GraphQL/Queries";

import { useMutation } from "@apollo/client";
// import "./styles/index.css";

import "./styles/login.css";

import { IonInput, IonItem, IonLabel, IonButton } from "@ionic/react";
import { Link } from "react-router-dom";

const Login = ({
  Inputfield,
  axios,
  path,
  SuccessResponse,
  ErrorResponse,
  type,
}) => {
  const { data } = useQuery(LOAD_USERS);
  useEffect(() => {
    if (data) {
      console.log(data.getAllUsers);
    }
  }, [data]);

  const CREATE_USER_MUTATION = gql`
  mutation createUser(${Inputfield.map(
    (idata) => `$${idata.name}: String!,`
  )}) {
    createUser(${Inputfield.map((idata) => `${idata.name}: $${idata.name}`)}) {
      id
    }
  }
`;

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  let inputinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    inputinitialState[Inputfield[i].name] = "";
  }
  const [input, setinput] = useState(inputinitialState);

  const [error, seterror] = useState({});

  const [dataCheck, setDataCheck] = useState(false);
  const [process, setprocess] = useState(false);

  let errorinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    errorinitialState[Inputfield[i].name] = "";
  }
  const [backerror, setbackerror] = useState(errorinitialState);

  const { username, email, password } = input;

  const Handelchange = (e) => {
    const { name, value } = e.target;
    setbackerror(errorinitialState);
    setinput((pre) => {
      return {
        ...pre,
        [name]: value,
      };
    });
  };

  const Validation = (data) => {
    const errors = {};
    Inputfield.map((idata) => {
      if (!data[idata.name] && idata.require) {
        errors[idata.name] = `${idata.name} Field is required`;
      } else if (idata.name && data[idata.name].length < idata.character) {
        errors[
          idata.name
        ] = `${idata.name} must be atleast ${idata.character} characters`;
      } else if (
        idata.name === "email" &&
        !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data[idata.name])
      ) {
        errors[idata.name] = "Invalid email address";
      }
      return errors;
    });

    return errors;
  };
  const Handelsubmit = (e) => {
    e.preventDefault();
    seterror(Validation(input));
    setDataCheck(true);
  };

  const CallRestApi = async () => {
    setprocess(true);
    await axios
      .post(path, input)
      .then((res) => {
        setinput(inputinitialState);
        SuccessResponse && SuccessResponse(res);
      })
      .catch((err) => {
        if (err.response) {
          ErrorResponse && ErrorResponse(err);
        }
      });
    setprocess(false);
  };
  const CallGraphql = async () => {
    try {
      setprocess(true);
      const res = await createUser({
        variables: {
          ...input,
        },
      });
      SuccessResponse && SuccessResponse(res);
      setprocess(false);
    } catch (err) {
      ErrorResponse && ErrorResponse(err);
      setprocess(false);
    }
  };
  useEffect(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      CallRestApi();
      CallGraphql();
    }
    setDataCheck(false);
    // eslint-disable-next-line
  }, [dataCheck, email, username, password, error, process]);

  return (
    <div className="signin_form_div">
      <div className="signin_logo">
        <img
          src={"https://www.logodesign.net/images/nature-logo.png"}
          alt="Students"
          className="signin_img"
        />
      </div>
      {/* <div className="signin_img_div ">
            <img
              src={"https://cdn.wallpapersafari.com/52/91/UNaJbL.jpg"}
              alt="Students"
              className="signin_img"
            />
          </div> */}
      <form onSubmit={Handelsubmit} className="signin_form">
        <h1 className="signin_heading">
          {type === "signup" ? "Sign Up" : "sign In"}
        </h1>
        {type === "signin" ? (
          <div className="have_account">
            Dont have an account?<Link to={"/signin"}> Sign Up</Link>
          </div>
        ) : (
          <div className="have_account">
            Already have an account?<Link to={"/signin"}> Sign In</Link>
          </div>
        )}
        {Inputfield.map((data, index) => {
          const { name, placeholder, type } = data;
          return (
            <div key={index}>
              <IonItem className="w-72 ">
                <IonLabel
                  color={`${
                    error[name] || backerror[name] ? "danger" : "primary"
                  }`}
                  className="signin_label"
                  position="floating"
                >
                  {placeholder}
                </IonLabel>
                <IonInput
                  type={type}
                  onIonChange={Handelchange}
                  placeholder={placeholder}
                  name={name}
                  value={input[name]}
                  className="signin_input"
                ></IonInput>
              </IonItem>
              {error[name] && (
                <div className="signin_validation ">
                  <p> {error[name]}</p>
                  <div className="signin_validation_arrow "></div>
                </div>
              )}
              {backerror[name] && (
                <div className="signin_validation">
                  <p> {backerror[name]}</p>
                  <div className="signin_validation_arrow"></div>
                </div>
              )}
            </div>
          );
        })}
        <IonButton
          disabled={process && true}
          type="submit"
          className="signin_button "
        >
          Submit
        </IonButton>
      </form>
    </div>
  );
};
export default Login;
