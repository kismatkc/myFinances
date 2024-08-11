
import React, { useMemo } from 'react';
import CreatableSelect from "react-select/creatable";

// Define a type alias for the option structure
type OptionType = {
  label: string;
  value: string ;
};

// Define the props for the Select component
type SelectProps = {
  options: OptionType[];
  value: OptionType;
  // onSelect: (newValue: SingleValue<OptionType>, actionMeta: ActionMeta<OptionType>) => void;
  onSelect: ({ label, value }: OptionType) => void;
  onCreateAccount: ({ name }: { name: string }) => void;
  placeholder: string;
  disabled: boolean;
};

const Select = ({ options, value, onSelect,onCreateAccount,placeholder,disabled }: SelectProps) => {
  const formattedValue = useMemo(()=>{
  return options.find((item) => item.value === value.value)
  },[value,options])


  return (
    <CreatableSelect
      value={formattedValue}
      options={options}
      className="text-sm 
      h-10"
      styles= {
      {
        control:(base)=>({
          ...base,
          borderColor: "#e2e8f0",
          ":hover": {
            borderColor: "#e2e8f0",
          }
        })
        
      }
      }
      onChange={(change )=>{
if(change){
// onSelect(change.value)
onSelect(change)
}


      }}
      onCreateOption={(name)=>{
        onCreateAccount({name})
      }}
      placeholder={placeholder}
      isDisabled={disabled}
    />
  );
};

export default Select;
