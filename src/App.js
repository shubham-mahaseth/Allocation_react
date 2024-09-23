import Routing from "./routing";
import TrnType from "../src/Components/TRNTYPE";
import React, { useEffect } from 'react';
import proxima360 from "../src/Assets/icons/proxima360.png";
import { UserProvider } from "./Pages/Auth/UserDetails";
function App() {
  // useEffect(() => {
  //   document.title = 'Proxima360';
  // },[]);
  TrnType()
  return (
    <UserProvider>
      <Routing />
    </UserProvider>
  );
}

export default App;
