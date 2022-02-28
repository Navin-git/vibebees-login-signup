import { Redirect, Route } from "react-router-dom";
import {
  IonApp,
  IonContent,
  IonRouterOutlet,
  setupIonicReact,
} from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";

/* Core CSS required for Ionic components to work properly */
import "@ionic/react/css/core.css";

/* Basic CSS for apps built with Ionic */
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";

/* Optional CSS utils that can be commented out */
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";

/* Theme variables */
import "./theme/variables.css";

import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  HttpLink,
  from,
} from "@apollo/client";
import { onError } from "@apollo/client/link/error";
// import { Login } from "./lib";
import Login from "vibebees-ionic-auth/dist/components/Login";

const errorLink = onError(({ graphqlErrors, networkError }) => {
  if (graphqlErrors) {
    graphqlErrors.map(({ message, location, path }) => {
      alert(`Graphql error ${message}`);
      return null;
    });
  }
});

const link = from([
  errorLink,
  new HttpLink({ uri: "https://api.spacex.land/graphql/" }),
]);

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link: link,
});

setupIonicReact();
const Inputfield = [
  {
    name: "username",
    placeholder: "Username",
    type: "text",
    character: 4,
    require: true,
  },
  {
    name: "email",
    placeholder: "Email",
    type: "text",
    require: true,
  },
  {
    name: "phone",
    placeholder: "Phone",
    type: "number",
    require: true,
    character: 10,
  },
  {
    name: "password",
    placeholder: "Password",
    type: "password",
    character: 8,
    require: true,
  },
];

const App = () => (
  <ApolloProvider client={client}>
    <IonApp>
      <IonReactRouter>
        <IonRouterOutlet>
          <Route exact path="/home">
            <IonContent fullscreen className="container">
              <div className="signin_form_comp">
                <Login Inputfield={Inputfield} type="signup" />
              </div>
            </IonContent>
          </Route>
          <Route exact path="/">
            <Redirect to="/home" />
          </Route>
        </IonRouterOutlet>
      </IonReactRouter>
    </IonApp>
  </ApolloProvider>
);

export default App;
