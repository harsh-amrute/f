import { useRef } from 'react';

const useColDef = () => {
    const groupedColDefsRef = useRef<any>(null);

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
    getGroupedColDef, 
    groupedColDefsRef    
  };
};

export default useColDef;






