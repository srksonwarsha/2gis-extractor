// import logo from './logo.svg';
import './App.css';
// import Form from './component/Form';
import Form from './Component/Form'

import { SnackbarProvider } from 'notistack';


import i18next from "i18next";
import { useTranslation } from "react-i18next";

function App() {
  return (
    <SnackbarProvider maxSnack={3}>
    <div className="App">
    <Form />
    </div>
    </SnackbarProvider>
  );
}

export default App;
