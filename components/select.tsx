
import React, { useMemo } from 'react';
import CreatableSelect from "react-select/creatable";
import {SingleValue,ActionMeta}  from "react-select"
// Define a type alias for the option structure
type OptionType = {
  label: string;
  value: string ;
};

// Define the props for the Select component
type SelectProps = {
  options: OptionType[];
  value: string;
  // onSelect: (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
  onSelect: (input: string )=> void
  onCreateAccount: ({name}: {name: string})=> void
};

const Select = ({ options, value, onSelect,onCreateAccount }: SelectProps) => {
  const formattedValue = useMemo(()=>{
  return options.find((item) => item.value === value) || { label: "", value: "" };
},[value,options])

useMemo
  return (
    <CreatableSelect
      value={formattedValue}
      options={options}
      onChange={(change )=>{
if(change){
onSelect(change.value)
}


      }}
      onCreateOption={(name)=>{
        onCreateAccount({name})
      }}
    />
  );
};

export default Select;
