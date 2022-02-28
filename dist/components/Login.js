"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.regexp.exec.js");

require("core-js/modules/es.regexp.test.js");

require("core-js/modules/es.promise.js");

var _react = _interopRequireWildcard(require("react"));

var _client = require("@apollo/client");

var _Queries = require("../GraphQL/Queries");

require("./styles/login.css");

var _react2 = require("@ionic/react");

var _reactRouterDom = require("react-router-dom");

var _templateObject;

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); enumerableOnly && (symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; })), keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = null != arguments[i] ? arguments[i] : {}; i % 2 ? ownKeys(Object(source), !0).forEach(function (key) { _defineProperty(target, key, source[key]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)) : ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _taggedTemplateLiteral(strings, raw) { if (!raw) { raw = strings.slice(0); } return Object.freeze(Object.defineProperties(strings, { raw: { value: Object.freeze(raw) } })); }

const Login = _ref => {
  let {
    Inputfield,
    axios,
    path,
    SuccessResponse,
    ErrorResponse,
    type
  } = _ref;
  const {
    data
  } = (0, _client.useQuery)(_Queries.LOAD_USERS);
  (0, _react.useEffect)(() => {
    if (data) {
      console.log(data.getAllUsers);
    }
  }, [data]);
  const CREATE_USER_MUTATION = (0, _client.gql)(_templateObject || (_templateObject = _taggedTemplateLiteral(["\n  mutation createUser(", ") {\n    createUser(", ") {\n      id\n    }\n  }\n"])), Inputfield.map(idata => "$".concat(idata.name, ": String!,")), Inputfield.map(idata => "".concat(idata.name, ": $").concat(idata.name)));
  const [createUser] = (0, _client.useMutation)(CREATE_USER_MUTATION);
  let inputinitialState = {};

  for (let i = 0; i < Inputfield.length; i++) {
    inputinitialState[Inputfield[i].name] = "";
  }

  const [input, setinput] = (0, _react.useState)(inputinitialState);
  const [error, seterror] = (0, _react.useState)({});
  const [dataCheck, setDataCheck] = (0, _react.useState)(false);
  const [process, setprocess] = (0, _react.useState)(false);
  let errorinitialState = {};

  for (let i = 0; i < Inputfield.length; i++) {
    errorinitialState[Inputfield[i].name] = "";
  }

  const [backerror, setbackerror] = (0, _react.useState)(errorinitialState);
  const {
    username,
    email,
    password
  } = input;

  const Handelchange = e => {
    const {
      name,
      value
    } = e.target;
    setbackerror(errorinitialState);
    setinput(pre => {
      return _objectSpread(_objectSpread({}, pre), {}, {
        [name]: value
      });
    });
  };

  const Validation = data => {
    const errors = {};
    Inputfield.map(idata => {
      if (!data[idata.name] && idata.require) {
        errors[idata.name] = "".concat(idata.name, " Field is required");
      } else if (idata.name && data[idata.name].length < idata.character) {
        errors[idata.name] = "".concat(idata.name, " must be atleast ").concat(idata.character, " characters");
      } else if (idata.name === "email" && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(data[idata.name])) {
        errors[idata.name] = "Invalid email address";
      }

      return errors;
    });
    return errors;
  };

  const Handelsubmit = e => {
    e.preventDefault();
    seterror(Validation(input));
    setDataCheck(true);
  };

  const CallRestApi = async () => {
    setprocess(true);
    await axios.post(path, input).then(res => {
      setinput(inputinitialState);
      SuccessResponse && SuccessResponse(res);
    }).catch(err => {
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
        variables: _objectSpread({}, input)
      });
      SuccessResponse && SuccessResponse(res);
      setprocess(false);
    } catch (err) {
      ErrorResponse && ErrorResponse(err);
      setprocess(false);
    }
  };

  (0, _react.useEffect)(() => {
    if (Object.keys(error).length === 0 && dataCheck) {
      CallRestApi();
      CallGraphql();
    }

    setDataCheck(false); // eslint-disable-next-line
  }, [dataCheck, email, username, password, error, process]);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "signin_form_div"
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "signin_logo"
  }, /*#__PURE__*/_react.default.createElement("img", {
    src: "https://www.logodesign.net/images/nature-logo.png",
    alt: "Students",
    className: "signin_img"
  })), /*#__PURE__*/_react.default.createElement("form", {
    onSubmit: Handelsubmit,
    className: "signin_form"
  }, /*#__PURE__*/_react.default.createElement("h1", {
    className: "signin_heading"
  }, type === "signup" ? "Sign Up" : "sign In"), type === "signin" ? /*#__PURE__*/_react.default.createElement("div", {
    className: "have_account"
  }, "Dont have an account?", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/signin"
  }, " Sign Up")) : /*#__PURE__*/_react.default.createElement("div", {
    className: "have_account"
  }, "Already have an account?", /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, {
    to: "/signin"
  }, " Sign In")), Inputfield.map((data, index) => {
    const {
      name,
      placeholder,
      type
    } = data;
    return /*#__PURE__*/_react.default.createElement("div", {
      key: index
    }, /*#__PURE__*/_react.default.createElement(_react2.IonItem, {
      className: "w-72 "
    }, /*#__PURE__*/_react.default.createElement(_react2.IonLabel, {
      color: "".concat(error[name] || backerror[name] ? "danger" : "primary"),
      className: "signin_label",
      position: "floating"
    }, placeholder), /*#__PURE__*/_react.default.createElement(_react2.IonInput, {
      type: type,
      onIonChange: Handelchange,
      placeholder: placeholder,
      name: name,
      value: input[name],
      className: "signin_input"
    })), error[name] && /*#__PURE__*/_react.default.createElement("div", {
      className: "signin_validation "
    }, /*#__PURE__*/_react.default.createElement("p", null, " ", error[name]), /*#__PURE__*/_react.default.createElement("div", {
      className: "signin_validation_arrow "
    })), backerror[name] && /*#__PURE__*/_react.default.createElement("div", {
      className: "signin_validation"
    }, /*#__PURE__*/_react.default.createElement("p", null, " ", backerror[name]), /*#__PURE__*/_react.default.createElement("div", {
      className: "signin_validation_arrow"
    })));
  }), /*#__PURE__*/_react.default.createElement(_react2.IonButton, {
    disabled: process && true,
    type: "submit",
    className: "signin_button "
  }, "Submit")));
};

var _default = Login;
exports.default = _default;