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
