import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MIN_DECIMAL_VAL,MAX_NAME_LENGTH,MAX_DECIMAL_VAL,CommonSchema} from "../../../commons";

export const SKUSchema = Joi.object({
    sc:Joi.string().empty().invalid(null).max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    sd:Joi.string().empty().max(MAX_NAME_LENGTH).invalid(null),
    ec:Joi.number().empty().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).invalid(null),
    wt:Joi.number().empty().greater(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).invalid(null),
    vm:Joi.number().empty().greater(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).invalid(null),
    ...CommonSchema

}).preferences(defaultJOIOptions)
