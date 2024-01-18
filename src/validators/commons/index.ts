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
    allowUnknown:true,

}
export const generateCommonMessages = (key:string) => {
    return {
        'any.pipe':`${key} has pipe`,
        'any.comma':`${key} has comma`,
        'any.commapipe':`${key} has comma and pipe`
    }
}

export const commonValidator = (value:any,helper:any)=>{

    if(IsInputHasComma(value) && IsInputHasPipe(value)) return helper.error('any.commapipe');
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
    c1:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c2:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c3:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c4:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c5:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c6:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c7:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c8:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c9:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c10:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c11:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c12:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c13:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c14:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow(''),
    c15:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('')
}