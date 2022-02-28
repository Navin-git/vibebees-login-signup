import {
  IonContent,
  IonInput,
  IonItem,
  IonLabel,
  IonButton,
} from "@ionic/react";
import "./ExploreContainer.css";
import React, { useState } from "react";

const ExploreContainer = ({ Inputfield }) => {
  //   const { loading, data } = useQuery(LOAD_USERS);
  //   const [users, setUsers] = useState([]);
  //   useEffect(() => {
  //     if (data) {
  //       console.log(data.getAllUsers);
  //     }
  //   }, [data]);

  //   const CREATE_USER_MUTATION = gql`
  //   mutation createUser(${Inputfield.map(
  //     (idata) => `$${idata.name}: String!,`
  //   )}) {
  //     createUser(${Inputfield.map((idata) => `${idata.name}: $${idata.name}`)}) {
  //       id
  //     }
  //   }
  // `;

  //   const [createUser] = useMutation(CREATE_USER_MUTATION);

  let inputinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    inputinitialState[Inputfield[i].name] = "";
  }
  const [input, setinput] = useState(inputinitialState);

  const [seterror] = useState({});

  const [setDataCheck] = useState(false);

  let errorinitialState = {};
  for (let i = 0; i < Inputfield.length; i++) {
    errorinitialState[Inputfield[i].name] = "";
  }
  const [setbackerror] = useState(errorinitialState);

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

  // const CallRestApi = async () => {
  //   setprocess(true);
  //   await axios
  //     .post(path, input)
  //     .then((res) => {
  //       setinput(inputinitialState);
  //       SuccessResponse && SuccessResponse(res);
  //     })
  //     .catch((err) => {
  //       if (err.response) {
  //         ErrorResponse && ErrorResponse(err);
  //       }
  //     });
  //   setprocess(false);
  // };
  // const CallGraphql = async () => {
  //   try {
  //     setprocess(true);
  //     const res = await createUser({
  //       variables: {
  //         ...input,
  //       },
  //     });
  //     SuccessResponse && SuccessResponse(res);
  //   } catch (err) {
  //     ErrorResponse && ErrorResponse(err);
  //   }
  // };
  // useEffect(() => {
  //   if (Object.keys(error).length === 0 && dataCheck) {
  //     // setApiCall(true);
  //     CallRestApi();
  //     CallGraphql();
  //     // createUser({
  //     //   variables: {
  //     //     ...input,
  //     //   },
  //     // });
  //   }
  //   setDataCheck(false);
  //   // eslint-disable-next-line
  // }, [dataCheck, email, username, password, error, process]);
  return (
    <div className="container">
      <IonContent>
        <div className="signin_form_div">
          <form
            onSubmit={Handelsubmit}
            className="signin_form p-10 rounded-lg bg-white"
          >
            {Inputfield.map((data, index) => {
              const { name, value, validation, placeholder, type } = data;
              return (
                <div key={index}>
                  <IonItem className="w-72 ">
                    <IonLabel color="primary" position="floating">
                      {placeholder}
                    </IonLabel>
                    <IonInput
                      type={type}
                      onIonChange={Handelchange}
                      placeholder={placeholder}
                      name={name}
                      value={value}
                      className=""
                    ></IonInput>
                  </IonItem>
                  <p className="signin_validation text-red-500 text-xs ml-4">
                    {validation ? validation : ""}
                  </p>
                </div>
              );
            })}
            <IonButton type="submit" className="signin_button ">
              Submit
            </IonButton>
          </form>
        </div>
      </IonContent>
    </div>
  );
};

export default ExploreContainer;
