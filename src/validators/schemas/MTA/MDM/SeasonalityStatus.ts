import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MAX_NAME_LENGTH,MAX_DECIMAL_VAL} from "../../../commons";

const MIN_RLT_VALUE = 3;

const RLTValidator = (value:any,helper:any)=>{
    if (value < MIN_RLT_VALUE) {
        return helper.warn('any.rlt');
    }
    return value;
}

const SeasonalityStatusMessages = {
    "any.rlt":"RLT value should be greater than or equal to " + MIN_RLT_VALUE,
}


export const SeasonalityStatusSchema = Joi.object({
    sc:Joi.string().empty().invalid(null).max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    wd:Joi.string().empty().max(MAX_NAME_LENGTH),
    sd:Joi.string(),
    ed:Joi.string(),
    tn:Joi.number().integer(),
    rlt:Joi.number().integer().custom(RLTValidator).messages(SeasonalityStatusMessages),
    dnp:Joi.number().integer().min(0).max(100).messages({'number.unsafe':`DeltaNormPercentage should be less than 90071992547409924`}),
    nn:Joi.number().integer(),
    onm:Joi.number().integer(),
    ulc:Joi.number().integer(),
    bd:Joi.number().integer(),
    tp:Joi.string(),
    sts:Joi.string(),
    cmt:Joi.string(),
    skd:Joi.string().empty().max(MAX_NAME_LENGTH)
}).preferences(defaultJOIOptions)
