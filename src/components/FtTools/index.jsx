import React from 'react';
import { Checkbox } from 'antd';


function Customcheckbox(props) {
    return (
        <div>
            <Checkbox onChange={(e) => { props.handleChange(e.target.checked) }} name={props.name} checked={props.checked} />
            <label htmlFor={props.name}> {props.label}</label>
            <a id="downloadAnchorElem" />
        </div>)
}


export default Customcheckbox;