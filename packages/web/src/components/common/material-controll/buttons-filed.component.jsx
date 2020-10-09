import { MenuItem,ButtonGroup,Button,Popper,Grow,Paper,MenuList,ClickAwayListener } from "@material-ui/core";
import { ArrowDropDown as ArrowDropDownIcon } from '@material-ui/icons';
import { useField } from "formik";
import React, { Fragment } from "react";
import FormHelperText from '@material-ui/core/FormHelperText';


const M1Buttons = ({items,label,labelStyle,containerStyle,isToggle,toggleTrueProp,...props})=>{
    const [field, meta, { setValue }] = useField(props);
    const errorText = meta.touched && meta.error ? meta.error : "";

    const handleValue = (value,isToggle)=>{
        if(isToggle && toggleTrueProp){
            return value.toLowerCase().includes(toggleTrueProp) ;

        }else if(isToggle){
            return value.toLowerCase().includes('y') 
        }
        return value;
    }

    const handleVariant = (value,item,isToggle)=>{
        if(isToggle && toggleTrueProp && value === item.toLowerCase().includes(toggleTrueProp))return 'contained';
        if(isToggle &&  !toggleTrueProp && value === item.toLowerCase().includes('y'))return 'contained';
        else if (value === item)return 'contained';
        else return '';

    }
    return (
        <Fragment>
        <span className={labelStyle}>{label}</span>
        <ButtonGroup  color="primary" className={containerStyle}>
        {items && items.map((item,idx)=>(
            <Button key={idx} variant={handleVariant(field.value,item,isToggle)} onClick={()=>setValue(handleValue(item,isToggle))}>{item}</Button> 
          ))}
        </ButtonGroup>
        {errorText && <FormHelperText error={true}>{errorText}</FormHelperText>}
        
        </Fragment>
    )
}

export default M1Buttons;