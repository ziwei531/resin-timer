import React from 'react';
import Upper from './components/upper-part';
import Lower from './components/lower-part';
import Input from './components/input';

function App() {
  console.log("%cThanks for using this application :)","color: black; font-size: 50px; background-color: #d9cad9;");
  console.log("%cGithub: https://github.com/ziwei531","color: black; font-size: 20px; background-color: #d9cad9;");
  
  return (
    <>
      <Upper />
      <Lower />
      <Input />
    </>
  );
}

export default App;
