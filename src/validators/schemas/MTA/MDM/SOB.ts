import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,} from "../../../commons";

const SuppCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.WhCode === value) throw new Error('Supplier code and Location code are same');
    return commonValidator(value,helper);

}

export const SOBSchema = Joi.object({
    SrNo:Joi.string(),
    SKUCode:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    WhCode:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    SuppCode:Joi.string().empty().max(MAX_CODE_LENGTH).custom(SuppCodeValidator),
    SOB:Joi.number().min(0.00).max(100.00)

}).preferences(defaultJOIOptions)
