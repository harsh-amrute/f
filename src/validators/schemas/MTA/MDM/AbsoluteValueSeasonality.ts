import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH} from "../../../commons";

export const AbsoluteValueSeasonalitySchema = Joi.object({
    sc:Joi.string().empty().invalid(null).max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    sd:Joi.string(),
    ed:Joi.string(),
    tn:Joi.number().integer(),
    bd:Joi.number().allow(null)

}).preferences(defaultJOIOptions)