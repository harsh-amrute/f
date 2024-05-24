export interface PPField {
    jf: string
    cp: number
    hdr: string
    vs: boolean
    ca: string
    val: string
}

export interface PPDataPayload {
    filters: any[]
    paginationParameter: {
        pageNumber: number,
        recordsPerPage: number
    }
}

