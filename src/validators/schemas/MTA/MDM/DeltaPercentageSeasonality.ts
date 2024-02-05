import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH} from "../../../commons";

export const DeltaPercentageSeasonalitySchema = Joi.object({
    sc:Joi.string().empty().invalid(null).max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    sd:Joi.string(),
    ed:Joi.string(),
    dnp:Joi.number().integer().min(0).max(100),
    ulc:Joi.number().integer(),
    bd:Joi.number()

}).preferences(defaultJOIOptions)