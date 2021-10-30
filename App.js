/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import { BtnActionSheet } from './src/BtnActionSheet';

const App = (props) => {
  const data = [
    "A",
    "B",
    "C"
  ]
  const onChoseBtn = (index) => {
    console.log("index", index)
  }
  return (
    <BtnActionSheet  title={"bjbjbjb"} data={data} onChoseBtn={onChoseBtn} />
  );
};


export default App;
