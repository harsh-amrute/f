import Joi from "joi";
import { commonValidator,supplyCodeChecks, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MAX_INT_VAL} from "../../../commons";

const SuppCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.WhCode === value) throw new Error('Supplier code and Location code are same');
    return supplyCodeChecks(value,helper);

}

export const MOQSchema = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).messages(generateCommonMessages('WhCode')),
    spc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator).required().messages(generateCommonMessages('SupplierCode')),
    mq:Joi.number().integer().min(0).messages({'number.unsafe':`MOQ should be less than ${MAX_INT_VAL}`}),

}).preferences(defaultJOIOptions)

export const MOQSchemaDelete = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    spc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator).required().messages(generateCommonMessages('SupplierCode')),
}).preferences(defaultJOIOptions)
