import { Input, Tooltip } from 'antd';
import React, { useEffect, useState } from 'react';

const formatNumber = (value) => new Intl.NumberFormat().format(value);

const NumericInput = (props) => {
  const { value, onChange } = props;

  const handleChange = (e) => {
    const { value: inputValue } = e.target;
    const reg = /^-?\d*(\.\d*)?$/;

    if (reg.test(inputValue) || inputValue === '' || inputValue === '-') {
      onChange(inputValue);
    }
  }; // '.' at the end or only '-' in the input box.

  const handleBlur = () => {
    let valueTemp = value;

    if (value.charAt(value.length - 1) === '.' || value === '-') {
      valueTemp = value.slice(0, -1);
    }

    onChange(valueTemp.replace(/0*(\d+)/, '$1'));
  };

  const title = value ? (
    <span className="numeric-input-title">{value !== '-' ? formatNumber(Number(value)) : '-'}</span>
  ) : (
    ''
  );
  return (
    <Tooltip trigger={['focus']} title={title} placement="topLeft" overlayClassName="numeric-input">
      <Input
        {...props}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder="Input a number"
        maxLength={1}
      />
      
    </Tooltip>
  );
};

const Customtextbox = (props) => {
  
  const [value, setValue] = useState('');
  

//   if(value>3){
//       alert(`Invalid input : ${value}. Input should be less than 4.`);
//       setValue(null);
//   }
  console.log(value)
  function onChangeRugShare(e){
     
      setValue(e);
      props.handleChange(e)
  

  }
  useEffect(()=>{ 
      if(value>3){
      alert(`Invalid input : ${value}. Input should be less than 4.`);
   }
    }, [value])
  return (
  <>
      <div>
          
    <NumericInput
      style={{
        width: 120,
      }}
      value={value}
      onChange= {(e) => onChangeRugShare(e)}/>
      <label htmlFor={props.name}> {props.label}</label>
    </div>
      </>
  );
};

export default Customtextbox;