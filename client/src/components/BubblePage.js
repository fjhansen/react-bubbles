import React, { useState, useEffect } from "react";
import axios from "axios";
import { axiosWithAuth } from '../utils/api'
import Bubbles from "./Bubbles";
import ColorList from "./ColorList";

const BubblePage = () => {
  const [colorList, setColorList] = useState([]);

    useEffect(() => {
      axiosWithAuth()
      .get('/api/colors')
      .then(result => setColorList(result.data))
      .catch(error => console.log('ERR BP.JS :',error))
    },[]) // wooooo colors!!!!!!!!!

    

  return (
    <>
      <ColorList colors={colorList} updateColors={setColorList} />
      <Bubbles colors={colorList} />
    </>
  );
};

export default BubblePage;
