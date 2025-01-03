import Joi from "joi";
import { commonValidator,supplyCodeChecks, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MAX_INT_VAL} from "../../../commons";

const SuppCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.WhCode === value) throw new Error('Supplier code and Location code are same');
    return supplyCodeChecks(value,helper);

}

export const SOBSchema = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    spc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator).messages(generateCommonMessages('SupplierCode')),
    sb:Joi.number().integer().min(1).max(100).messages({'number.unsafe':`SOB should be within 1 to 100`,'number.min':"SOB should be within 1 to 100",'number.max':"SOB should be within 1 to 100"}),

}).preferences(defaultJOIOptions)

export const SOBSchemaDelete = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    sb:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator)
}).preferences(defaultJOIOptions)
