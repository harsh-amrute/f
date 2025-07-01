import { useRef } from 'react'

const useColDef = () => {
    const colDefMap = useRef<any>(new Map())
    const getColDef = (response : any) =>{
        response.data.data?.forEach((row : any) =>{
            colDefMap.current.set(row.cc , { hd: row.hd, scc: row.scc })
        })
    
    }
    return {
        getColDef,
        colDefMap
    }
}

export default useColDef