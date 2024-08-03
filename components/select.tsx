import React from 'react'
import Select from "react-select";


const options = [
  { value: "coffee", label: "Coffee" },
  { value: "apple", label: "Apple" },
  { value: "carrot", label: "Carrot" },
];

const Temp = () => {
    return <Select options={options} onChange={(data)=>{
        console.log(data)
    }}/>;
}

export default Temp