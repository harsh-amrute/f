import Joi from "joi";

export const BUFFER_VALIDATION_SCHEMA = Joi.object({
  bsz: Joi.number().integer().min(1).max(364).required().messages({
    "number.base": "Buffer Size must be a valid number.",
    "number.min": "Buffer Size must be at least {#limit}.",
    "number.max": "Buffer size cannot exceed for over a year.",
    "any.required": "Enter the Buffer Size!",
  }),

  slt: Joi.number().integer().min(0).max(364).required().messages({
    "number.base": "SLT must be a valid number.",
    "number.min": "SLT must be at least {#limit}.",
    "number.max": "SLT must be at most {#limit}.",
    "any.required": "SLT cannot be empty!",
  }),

  mlt: Joi.number().integer().min(0).max(364).required().messages({
    "number.base": "MLT must be a valid number.",
    "number.min": "MLT must be at least {#limit}.",
    "number.max": "MLT must be at most {#limit}.",
    "any.required": "MLT cannot be empty!",
  }),

  bt: Joi.string().required().messages({
    "string.base": "Enter the Buffer Type!",
    "any.required": "Enter the Buffer Type!",
  }),

  bcd: Joi.string().required().messages({
    "string.base":"Enter a valid Buffer Code!",
    "any.required": "Enter a valid Buffer Code!",
  }),

  bd: Joi.string().required().messages({
    "string.base":"Enter a valid Buffer Description!",
    "any.required": "Enter a valid Buffer Description!",
  }),

  ib: Joi.alternatives()
    .try(Joi.boolean(), Joi.string().valid("true", "false"))
    .required()
    .messages({
      "alternatives.types": "Is Blue must be either true or false!", 
      "boolean.base": "Is Blue must be either true or false!",
      "string.base": "Is Blue must be either true or false!",
      "any.only": "Is Blue must be either true or false!",
      "any.required": "Is Blue is required!",
    }),

  iv: Joi.boolean().allow(null).default(false),

  editable: Joi.any().optional(),
  
  err : Joi.object({
    error: Joi.string().allow("").optional(), 
    warning: Joi.string().allow("").optional(),
  }).optional()
  
  
});


export const CCR_VALIDATION_SCHEMA = Joi.object({

  cnm: Joi.string().required().messages({
    "string.base":"CCR name cannot be empty!",
    "any.required": "CCR name cannot be empty!",
  }),

  cgid: Joi.string().required().messages({
    "string.base":"CCR group cannot be empty!",
    "any.required": "Choose a valid ccrgroup from the dropdown!",
  }),

  cpd: Joi.number().min(1).required().messages({
    "number.base":"CCR Capacity Per Day must be a number!",
    "number.min": "CCR Capacity Per Day should be greater than 0!",
    "any.required": "CCR Capacity Per Day cannot be empty!",
  }),

  cwl: Joi.number().min(1).required().messages({
    "number.base":"CCR Capacity Workload (cwl) must be a number!",
    "any.required": "CCR Capacity Workload (cwl) cannot be empty!",
    "number.min": "CCR Capacity Workload (cwl) should be greater than 0!",
  }),

  dp: Joi.string().required().messages({
    "string.base":"Department cannot be empty!",
    "any.required": "Choose a valid department from the dropdown!",
  }),

  pl: Joi.string().required().messages({
    "string.base":"Plant cannot be empty!",
    "any.required": "Choose a valid plant from the dropdown!",
  }),

  rb: Joi.number().min(0).max(1).required().messages({
    "number.base":"CCR Resource Buffer must be a number!",
    "number.min": "CCR Resource Buffer (rb) should be a value between 0 and 1!",
    "number.max": "CCR Resource Buffer (rb) should be a value between 0 and 1!",
    "any.required": "CCR Resource Buffer (rb) is required!",
  }),

  sh: Joi.number()
    .required()
    .messages({ 
    "number.base":"Scheduling horizon must be a number!","any.required": "Scheduling horizon cannot be empty!" }),

  whpd: Joi.number()
    .min(1)
    .required()
    .messages({
      "number.base":"Working hours Per Day must be a number!",
      "any.required": "Working hours Per Day cannot be empty!",
      "number.min": "Working hours Per Day should be greater than 0!",
    }),
  ccd: Joi.string().required().messages({
    "string.base":"CCR Code cannot be empty!",
    "any.required": "CCR Code is required!"
    }),

  err : Joi.object({
    error: Joi.string().allow("").optional(), 
    warning: Joi.string().allow("").optional(),
  }).optional(),

  cid: Joi.any().default(null),
  fh: Joi.any().default(null),
  a1: Joi.any().default(null),
  a2: Joi.any().default(null),
  a3: Joi.any().default(null),
  a4: Joi.any().default(null),
  a5: Joi.any().default(null),
  a6: Joi.any().default(null),
  a7: Joi.any().default(null),
  a8: Joi.any().default(null),
  a9: Joi.any().default(null),
  a10: Joi.any().default(null),
  iv: Joi.boolean().allow(null).default(false),
});

export const CALENDAR_VALIDATION_SCHEMA = Joi.object({
  dow: Joi.array()
  .items(
    Joi.object({
      id: Joi.number().allow(null).messages({
        "number.base": "Id must be a number",
      }),
      mn: Joi.string().allow('').messages({
        "string.base": "Month type must be a string",
      }),
      md: Joi.string().allow('').messages({
        "string.base": "Month day must be a string",
      }),
    })
  )
  .optional(),

  plnm: Joi.string().required().optional().messages({
    "string.base": "Plant name cannot be empty!",
    "any.required": "Plant name cannot be empty!",
    "string.empty": "Plant name cannot be empty!",
  }),

  rb: Joi.string().valid("Once", "Weekly", "Monthly").optional().messages({
    "string.base": "Recurrence cannot be empty!",
    "any.required": "Recurrence cannot be empty!",
    "any.only": "Recurrence must be either Once, Weekly, or Monthly!",
  }),

  hid: Joi.any().optional(),

  rd : Joi.number().allow('').max(4).optional().messages({
    "number.base": "Repeat duration must be a number!",
    "number.max": "Repeat duration cannot exceed {#limit}.",
    "any.required": "Repeat duration cannot be empty!",
  }),

  ccr: Joi.string().required().optional().messages({
    "string.base": "CCR cannot be empty!",
    "string.empty": "CCR cannot be empty!",
    "any.required": "CCR cannot be empty!",
  }),
  
  ccr_id: Joi.array().items(Joi.number()).optional().messages({
    "string.base": "CCR Id cannot be empty!",
    "any.required": "CCR Id cannot be empty!",
  }),
 
  dsc: Joi.string().required().max(100).messages({
    "string.base": "Title cannot be empty!",
    "any.required": "Title cannot be empty!",
    "string.max": "Title cannot exceed 100 characters!",
    "string.empty": "Title cannot be empty!",
  }),

  sd: Joi.date()
    .required()
    .messages({
      "date.base": "Start date cannot be empty!",
      "any.required": "Start date cannot be empty!",
      "date.less": "Start date must be less than End date!",
    }),
  
  ed: Joi.date()
    .required()
    .greater(Joi.ref("sd"))
    .messages({
      "date.base": "End date cannot be empty!",
      "any.required": "End date cannot be empty!",
      "date.greater": "End date must be greater than Start date!",
    }),
  
  iwd: Joi.boolean().required().messages({
    "boolean.base": "Is Working Day must be either true or false!",
    "any.required": "Is Working Day is required!",

  }),

  plid: Joi.number().optional().messages({
    "number.base": "Plant Id cannot be empty!",
    "any.required": "Plant Id cannot be empty!",
  }),

  err: Joi.object({
    error: Joi.string().allow("").optional(),
    warning: Joi.string().allow("").optional(),
  }),

  ia: Joi.boolean().default(false).optional(),
  iu: Joi.boolean().default(false).optional(),
  id: Joi.boolean().default(false).optional(),

});


// export const POOGI_VALIDATION_SCHEMA = Joi.object({
//   plnm: Joi.string().min(1).required().messages({
//     'string.empty': 'Plant name cannot be empty!',
//     'any.required': 'Plant name cannot be empty!',
//   }),

//   majdsc: Joi.string().allow('', null).when('mindsc', {
//     is: Joi.string().min(1), 
//     then: Joi.string().min(1).required().messages({
//       'string.empty': 'State the major reason to which the minor reason belongs!',
//       'any.required': 'State the major reason to which the minor reason belongs!',
//     }),
//   }).messages({
//     'string.empty': 'Major reason description cannot be empty!',
//     'any.required': 'Major reason description cannot be empty!',
//   }),

//   mindsc: Joi.string().allow('', null).when('majdsc', {
//     is: Joi.string().min(1),
//     then: Joi.string().min(1).required().messages({
//       'string.empty': 'Each major reason must have at least one minor reason!',
//       'any.required': 'Each major reason must have at least one minor reason!',
//     }),
//   }),

//   majcd : Joi.string(),

//   mincd : Joi.string(),

//   err : Joi.object({
//     error: Joi.string().allow("").optional(), 
//     warning: Joi.string().allow("").optional(),
//   }).optional(),

// });