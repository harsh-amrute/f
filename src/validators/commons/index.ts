import Joi from "joi";

export const IsNumeric = (val:any) => {
    return !isNaN(parseFloat(val)) && isFinite(val);
}

export const isInteger = (x:any) => {
    return (IsNumeric(x)) && (x % 1 === 0) && Number.isInteger(x);
}

export const IsNullOrEmpty  = (data:any) => {
    let result = false;
    if (data === undefined || data === false || data === null || data === '' || data.toString().toLowerCase() === "null")
        result = true;
    return result;
}

export const IsInputHasComma = (data:any) => {
    let result = false;
    if (data.includes(','))
        result = true;
    return result;
}

export const IsInputHasPipe = (data:any) => {
    let result = false;
    if (data.includes('|'))
        result = true;
    return result;
}

export const defaultJOIOptions = {
    abortEarly:false,
    allowUnknown:true
}
export const generateCommonMessages = (key:string) => {
    return {
        'any.pipe':`${key} has pipe`,
        'any.comma':`${key} has comma`,
        'any.commapipe':`${key} has comma and pipe`
    }
}

export const commonValidator = (value:any,helper:any)=>{

    if(IsInputHasPipe(value) && IsInputHasPipe(value)) return helper.error('any.commapipe');
    if(IsInputHasComma(value)) return helper.error('any.comma');
    if(IsInputHasPipe(value)) return helper.error('any.pipe');

}

export const MAX_CUSTOM_ATTRIBUTES_COUNT = 15;
export const MAX_CODE_LENGTH = 50;
export const MAX_NAME_LENGTH = 125;
export const MAX_CUSTOM_ATTRIBUTE_LENGTH = 50;
export const MAX_DECIMAL_VAL = 99999999.99;
export const MIN_DECIMAL_VAL = 0;

export const CommonSchema = {
    C1:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C2:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C3:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C4:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C5:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C6:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C7:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C8:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C9:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C10:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C11:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C12:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C13:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C14:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH),
    C15:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH)
}