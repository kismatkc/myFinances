import React from 'react'

import CreatableSelect from "react-select/creatable"

type selectProps = {
  value: string | { label: string; value: string };
  options: { label: string; value: string }[];

 
};



const Select = ({value,options}: selectProps) => {


  return <CreatableSelect value={value} options={options} />;
}

export default Select;




// export default Select

// import React from 'react';
// import CreatableSelect from 'react-select/creatable';

// interface Option {
//   label: string;
//   value: string;
// }

// interface Props {
//   options: Option[];
//   value: string;
//   onChange: (value: string) => void;
// }

// const Select: React.FC<Props> = ({ options, value, onChange }) => {
//   // Convert string value to option for react-select
//   const selectedOption = options.find(option => option.value === value) || { label: value, value };

//   return (
//     <CreatableSelect
//       options={options}
//       value={selectedOption}
//       onChange={newValue => onChange(newValue ? (newValue as Option).value : '')}
//       isClearable
//     />
//   );
// };


