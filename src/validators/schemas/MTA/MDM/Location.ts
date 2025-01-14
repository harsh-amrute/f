import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MAX_NAME_LENGTH,CommonSchema,commonValidatorWithSeperator} from "../../../commons";

export const LocationSchema = Joi.object({
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    wd:Joi.string().empty().max(MAX_NAME_LENGTH),
    l:Joi.string().empty().max(50).custom(commonValidatorWithSeperator).required().messages(generateCommonMessages('Logistics Location')),
    lc:Joi.string().empty().max(50).custom(commonValidator).required().messages(generateCommonMessages('Location Type')),
    ...CommonSchema

}).preferences(defaultJOIOptions)

export const LocationSchemaDelete = Joi.object({
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode'))
}).preferences(defaultJOIOptions)
