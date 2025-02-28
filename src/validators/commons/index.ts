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
        'any.pipe':`"${key}" should not contain pipe`,
        'any.comma':`"${key}" should not contain comma`,
        'any.commapipe':`"${key}" should not contain comma and pipe`,
        'any.onlySpecialCharacters': `"${key}" should not contain only special characters`,
        'any.specialCharacters': `"${key}" cannot contain special characters`,
        'any.empty': `"${key}" should not be empty`,
        'string.base': `"${key}" should not be empty`,
        'string.max': `"${key}" should be less than or equal to 50 characters`
    }
}

export const specialCharacterValidator = (data:any,pattern:any) => {
    let result = false;
    if (!pattern.test(data)) {
        result = true;
        return result;
    }
    return result;
}

export const commonValidator = (value:any,helper:any)=>{

    if(IsInputHasComma(value) && IsInputHasPipe(value)) return helper.error('any.commapipe');
    if(IsInputHasComma(value)) return helper.error('any.comma');
    if(IsInputHasPipe(value)) return helper.error('any.pipe');

}

export const DescriptorValidator = (value:any,helper:any)=>{
    const pattern = /[a-zA-Z0-9]/
    if(specialCharacterValidator(value,pattern)) return helper.error('any.onlySpecialCharacters');
    if(IsInputHasPipe(value)) return helper.error('any.pipe');
}

export const commonValidatorWithSeperator = (value:any,helper:any)=>{
    const pattern = /[a-zA-Z0-9]/
    if(specialCharacterValidator(value,pattern)) return helper.error('any.onlySpecialCharacters');
    if(IsInputHasComma(value) && IsInputHasPipe(value)) return helper.error('any.commapipe');
    if(IsInputHasComma(value)) return helper.error('any.comma');
    if(IsInputHasPipe(value)) return helper.error('any.pipe');
}

export const supplyCodeChecks = (value:any,helper:any)=>{
    const pattern = /^[a-zA-Z0-9- ]*$/
    if(specialCharacterValidator(value,pattern)) return helper.error('any.specialCharacters');
    if(IsInputHasComma(value) && IsInputHasPipe(value)) return helper.error('any.commapipe');
    if(IsInputHasComma(value)) return helper.error('any.comma');
    if(IsInputHasPipe(value)) return helper.error('any.pipe');
}

const pipeCheckValidator = (value:any, helper:any) => {
    if (IsInputHasPipe(value)) {
        return helper.error('any.pipe');
    }
    return value; 
};

export const MAX_CUSTOM_ATTRIBUTES_COUNT = 15;
export const MAX_CODE_LENGTH = 50;
export const MAX_NAME_LENGTH = 125;
export const MAX_CUSTOM_ATTRIBUTE_LENGTH = 50;
export const MAX_DECIMAL_VAL = 100000000;
export const MIN_DECIMAL_VAL = 0;
export const MAX_INT_VAL = 100000000;

export const CommonSchema = {
    c1:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null).custom(pipeCheckValidator).messages(generateCommonMessages("c1")),
    c2:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null).custom(pipeCheckValidator).messages(generateCommonMessages("c2")),
    c3:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null).custom(pipeCheckValidator).messages(generateCommonMessages("c3")),
    c4:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null).custom(pipeCheckValidator).messages(generateCommonMessages("c4")),
    c5:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null).custom(pipeCheckValidator).messages(generateCommonMessages("c5")),
    c6:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c7:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c8:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c9:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c10:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c11:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c12:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c13:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c14:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null),
    c15:Joi.string().max(MAX_CUSTOM_ATTRIBUTE_LENGTH).allow('',null)
}