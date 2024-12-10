import Joi from "joi";
import { commonValidator, generateCommonMessages,defaultJOIOptions,MAX_CODE_LENGTH,MIN_DECIMAL_VAL,MAX_NAME_LENGTH,MAX_DECIMAL_VAL,CommonSchema} from "../../../commons";

const MIN_RLT_VALUE = 3;
const MIN_RCP_VALUE = 3;
const MIN_GCP_VALUE = 3;

const SKULocationMessages = (key:string)=>({
    "any.rlt":"RLT value should be greater than or equal to " + MIN_RLT_VALUE,
    "any.rcp":"RCP value should be greater than or equal to " + MIN_RCP_VALUE,
    "any.gcp":"RCP value should be greater than or equal to " + MIN_GCP_VALUE,
    "number.unsafe":`${key} should be less than 90071992547409924`

})

const ParentWhCodeValidator = (value:any,helper:any)=>{

    if(helper.prefs.context.wc === value) throw new Error('Source location code and destination location code are same');
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
    sd:Joi.string().empty().max(MAX_NAME_LENGTH),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    wd:Joi.string().empty().max(MAX_NAME_LENGTH),
    pwc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(ParentWhCodeValidator).required().messages({...generateCommonMessages('ParentWhCode')}),
    pd:Joi.string(),
    n:Joi.number().integer(),
    mn:Joi.number().integer(),
    rlt:Joi.number().integer().min(1).max(MAX_DECIMAL_VAL).custom(RLTValidator).messages(SKULocationMessages('RLT')),
    rcp:Joi.number().integer().max(MAX_DECIMAL_VAL).custom(RCPValidator).messages(SKULocationMessages('RCP')),
    gcp:Joi.number().integer().max(MAX_DECIMAL_VAL).custom(GCPValidator).messages(SKULocationMessages('GCP')),
    ocp:Joi.number().integer().min(1),
    moc:Joi.number().integer().min(1),
    ps:Joi.number().integer().min(1),
    st:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).messages({'number.unsafe':`Modified Spike Threshold should be less than 90071992547409924`}),
    dst:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).messages({'number.unsafe':`DefaultSpikeThreshold should be less than 90071992547409924`}),
    pt:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).messages({'number.unsafe':`Modified PSO Threshold should be less than 90071992547409924`}),
    dpt:Joi.number().min(MIN_DECIMAL_VAL).max(MAX_DECIMAL_VAL).messages({'number.unsafe':`Default PSO Threshold should be less than 90071992547409924`}),
    npr:Joi.number(),
    frf:Joi.string().valid("fg", "rm").insensitive(), //make this case insensitive
    da:Joi.string().valid("yes", "no", "y", "n", 1, 0, "1", "0").insensitive().default(1),
    // StockPercentForRationing:Joi.number().integer().min(0).max(100).default(0),
    // NormPercentReservation:Joi.number().integer().min(0).max(100).default(0),
    ...CommonSchema

}).preferences(defaultJOIOptions)

export const SKULocationSchemaDelete = Joi.object({
    sc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('SKUCode')),
    wc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(commonValidator).required().messages(generateCommonMessages('WhCode')),
    pwc:Joi.string().empty().max(MAX_CODE_LENGTH).custom(ParentWhCodeValidator).required().messages({...generateCommonMessages('ParentWhCode')}),
}).preferences(defaultJOIOptions)