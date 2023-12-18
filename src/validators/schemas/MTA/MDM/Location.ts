import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MAX_NAME_LENGTH,CommonSchema} from "../../../commons";

export const LocationSchema = Joi.object({
    SrNo:Joi.string(),
    WhCode:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    WhName:Joi.string().empty().max(MAX_NAME_LENGTH),
    LogisticsLocation:Joi.string().empty().max(MAX_NAME_LENGTH),
    ...CommonSchema

}).preferences(defaultJOIOptions)
