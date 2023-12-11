import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MIN_DECIMAL_VAL,MAX_NAME_LENGTH,MAX_DECIMAL_VAL,CommonSchema} from "../../../commons";

export const SKUSchema = Joi.object({
    SKUCode:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    SKUName:Joi.string().empty().max(MAX_NAME_LENGTH),
    ElephantOrderCapping:Joi.number().empty().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    Weight:Joi.number().empty().greater(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    Volume:Joi.number().empty().greater(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    ...CommonSchema

}).preferences(defaultJOIOptions)
