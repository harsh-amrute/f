import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,} from "../../../commons";

const SuppCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.WhCode === value) throw new Error('Supplier code and Location code are same');
    return commonValidator(value,helper);

}

export const SOBSchema = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    spc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator).messages(generateCommonMessages('SupplierCode')),
    sb:Joi.number().min(0.00).max(100.00)

}).preferences(defaultJOIOptions)

export const SOBSchemaDelete = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    sb:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator)
}).preferences(defaultJOIOptions)
