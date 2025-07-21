import { useRef } from 'react'

const useColDef = () => {
    const colDefMap = useRef<any>(new Map())
    const groupedColDefsRef = useRef<any>(null);


    const getColDef = (response : any) =>{
        response.data.data?.forEach((row : any) =>{
            colDefMap.current.set(row.cc , { hd: row.hd, scc: row.scc })
        })
    
    }

    const getGroupedColDef = (response: any) => {
        const HeaderData = response?.data?.data || [];

        const headersData = HeaderData.map((group: any) => ({
            cc: group.cc,
            ch: group.ch.map((row: any) => ({
                hd: row.hd,
                scc: row.scc,
                groupHeaderKey: `${group.cc}-${row.cc}`
            }))
        }));

        groupedColDefsRef.current = headersData;
    }

    return {
        getColDef,
        colDefMap,
        getGroupedColDef, 
        groupedColDefsRef
    }
}

export default useColDef