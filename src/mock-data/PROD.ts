export const prodPlanningMock: any = {
    header: [
        {
            key: 'plnm',   // string
            value:  'Plant' // string
        },
        {
            key: 'dpnm',  // string
            value:  'Department'   // string
        },
        {
            key: 'gnm',    // string
            value:  'CCR Group' // string
        },
        {
            key: 'cnm',   // string
            value:  'CCR Name'  // string
        },
        {
            key: 'fol', // string
            value:  'FOL ( in days )'   // string
        },
    ],
    data: [
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 4.24       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 4.24       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 4       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 2.4       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 0.12       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 1.0       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 4.24       // number -> ( 0 to 5)
        },
        {
            plnm: 'plant1',    // string
            dpnm: 'dept1',     // string
            gnm: 'Loom Type',  // string
            cnm: 'TL 1',    //string
            fol: 4.24       // number -> ( 0 to 5)
        },
        
    ]
};

export const estDueDateRMAvailable: any = {
    productionBuffer: 7,   // number (in days)  
    mostLoadedCCR: 'TL3',  // string
    EarliestReadinessDate: 'Nov- Week 1'   // string
}

export const estDueDateRMNotAvailable: any = {
    procurementBuffer: 7,    // number (in days)
    productionBuffer: 7,    // number (in days)
    mostLoadedCCR: 'TL3',   // string
    EarliestReadinessDate: 'Nov- Week 2'   // string
}

export const APIMock = {
    'ccrData': [
      {
        'cid': 1, 
        'plid': 2,
        'plnm': 'plant name 2',
        'dpid': 1,
        'dpnm': 'dept 01',
        'gid': 1,
        'gnm': 'CCR Group 1',
        'cnm': 'ccr_01_Name',
        'fol': 4.5,
        'it': [
          'ItemType1',
          'ItemType2',
          'ItemType3'
        ]
      },
      {
        'cid': 2,
        'plid': 3,
        'plnm': 'plant name 3',
        'dpid': 3,
        'dpnm': 'dept 03',
        'gid': 2,
        'gnm': 'CCR Group 2',
        'cnm': 'ccr_02_Name',
        'fol': 6,
        'it': [
          'ItemType4',
          'ItemType5',
          'ItemType6'
        ]
      }
    ],
    'bufferData': {
      'ItemType2': {
        'proc_size': 20,
        'prod_size': 10
      },
      'ItemType4': {
        'proc_size': 20,
        'prod_size': 10
      },
      'ItemType1': {
        'proc_size': 20,
        'prod_size': 12
      },
      'ItemType3': {
        'proc_size': 9,
        'prod_size': 10
      },
      'ItemType5': {
        'proc_size': 9,
        'prod_size': 12
      }
    }
  }
