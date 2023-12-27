import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MIN_DECIMAL_VAL,MAX_NAME_LENGTH,MAX_DECIMAL_VAL,CommonSchema} from "../../../commons";

const MIN_RLT_VALUE = 3;
const MIN_RCP_VALUE = 3;
const MIN_GCP_VALUE = 3;

const SKULocationMessages = {
    "any.rlt":"RLT value should be greater than or equal to " + MIN_RLT_VALUE,
    "any.rcp":"RCP value should be greater than or equal to " + MIN_RCP_VALUE,
    "any.gcp":"RCP value should be greater than or equal to " + MIN_GCP_VALUE
}

const ParentWhCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.WhCode === value) throw new Error('Source location code and destination location code are same');
    return commonValidator(value,helper);

}

const RLTValidator = (value:any,helper:any)=>{
    if (value < MIN_RLT_VALUE) {
        return helper.warn('any.rlt');
    }
    return value;
}

const RCPValidator = (value:any,helper:any)=>{
    if (value < MIN_RCP_VALUE) {
        return helper.warn('any.rcp');
    }
    return value;
}

const GCPValidator = (value:any,helper:any)=>{
    if (value < MIN_GCP_VALUE) {
        return helper.warn('any.gcp');
    }
    return value;
}

export const SKULocationSchema = Joi.object({
    SrNo:Joi.string(),
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    sn:Joi.string().empty().max(MAX_NAME_LENGTH),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    ln:Joi.string().empty().max(MAX_NAME_LENGTH),
    pwc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(ParentWhCodeValidator).required().messages({...generateCommonMessages('ParentWhCode')}),
    pln:Joi.string(),
    n:Joi.number().integer(),
    mn:Joi.number().integer(),
    rlt:Joi.number().integer().custom(RLTValidator).messages(SKULocationMessages),
    rcp:Joi.number().integer().custom(RCPValidator).messages(SKULocationMessages),
    gcp:Joi.number().integer().custom(GCPValidator).messages(SKULocationMessages),
    ocp:Joi.number().integer().min(1),
    moc:Joi.number().integer().min(1),
    ps:Joi.number().integer().min(1),
    st:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    DefaultSpikeThreshold:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    DefaultPSOThreshold:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL),
    FGRMFlag:Joi.string().valid("fg", "rm"),
    DBMActive:Joi.string().valid("yes", "no", "y", "n", "1", "0"),
    StockPercentForRationing:Joi.number().integer().min(0).max(100),
    NormPercentReservation:Joi.number().integer().min(0).max(100),
    ...CommonSchema

}).preferences(defaultJOIOptions)