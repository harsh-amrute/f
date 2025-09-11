import {useState,useEffect,useCallback} from 'react'
import VFTable from "../../VectorFLOW/commons/VFTable"
import { TableWrapper } from "../UserURLsDrawer/styles"
import {  Skeleton } from "../../commons/styled"
import { notifyError } from '../../../helpers/notify'
import { useGetAdminPermissions } from '../../../VectorFlow/Services/MTA/MDM'
import { useSelector } from 'react-redux'
import { RootState } from '../../../redux/store/store'

export const getProductColumns = (envConfig: any) => [
    { colId: "id", field: "id", headerName: "ID" },
    { colId: "productHierarchy1", field: "product_hierarchy_1", headerName: envConfig['PRODUCT_PERMISSION_L1'] },
    { colId: "productHierarchy2", field: "product_hierarchy_2", headerName: envConfig['PRODUCT_PERMISSION_L2'] },
    { colId: "productHierarchy3", field: "product_hierarchy_3", headerName: envConfig['PRODUCT_PERMISSION_L3'] },
];

export const getLocationColumns = (envConfig: any) => [
    { colId: "id", field: "id", headerName: "ID" },
    { colId: "locationHierarchy1", field: "location_heirarchy_1", headerName: envConfig['LOCATION_PERMISSION_L1'] },
    { colId: "locationHierarchy2", field: "location_heirarchy_2", headerName: envConfig['LOCATION_PERMISSION_L2'] },
    { colId: "locationHierarchy3", field: "location_heirarchy_3", headerName: envConfig['LOCATION_PERMISSION_L3'] },
];


const ViewPermissions = (props:{permissionType: string})=>{
    const {  permissionType } = props
    const [rowData,setRowData] = useState<Array<any>>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [hasData, setHasData] = useState<boolean>(true);


    const { mutateAsync: getPermissions } = useGetAdminPermissions();
    const EnvConfig = useSelector((state:RootState) =>state.mta.EnvConfig);
    // const PRODUCT_PERMISSION_L1 = EnvConfig['PRODUCT_PERMISSION_L1'];   
    // const PRODUCT_PERMISSION_L2 = EnvConfig['PRODUCT_PERMISSION_L2'];   
    // const PRODUCT_PERMISSION_L3 = EnvConfig['PRODUCT_PERMISSION_L3'];
    
    // const LOCATION_PERMISSION_L1 = EnvConfig['LOCATION_PERMISSION_L1']; 
    // const LOCATION_PERMISSION_L2 = EnvConfig['LOCATION_PERMISSION_L2']; 
    // const LOCATION_PERMISSION_L3 = EnvConfig['LOCATION_PERMISSION_L3']; 

    const getPermissionsData = useCallback(async(type: string)=>{
        setIsLoading(true);
        try{

            const result = await getPermissions();

            let data;
            if (type === 'Product_Permissions') {
                data = result?.data?.product;
            } else if (type === 'Location_Permissions') {
                data = result?.data?.location;
            }
            setRowData(data || []);
            setHasData(data && data.length > 0);
        }catch(error:any){
            console.error(error);
            notifyError("Server Went Unresponsive");
            setRowData([]);
            setHasData(false);
        }finally{
            setIsLoading(false);
        }
    },[getPermissions])

    useEffect(()=>{

        getPermissionsData(permissionType);
    },[permissionType, getPermissionsData])

    // const productColumns = [
    //     { colId: "id", field: "id" },
    //     { colId: "product_hierarchy_1", field: "product_hierarchy_1", headerName:PRODUCT_PERMISSION_L1 },
    //     { colId: "product_hierarchy_2", field: "product_hierarchy_2", headerName:PRODUCT_PERMISSION_L2 },
    //     { colId: "product_hierarchy_3", field: "product_hierarchy_3", headerName:PRODUCT_PERMISSION_L3 },
    // ];

    // const locationColumns = [
    //     { colId: "id", field: "id" ,headerName:"id"},
    //     { colId: "location_heirarchy_1", field: "location_heirarchy_1", headerName:LOCATION_PERMISSION_L1},
    //     { colId: "location_heirarchy_2", field: "location_heirarchy_2", headerName:LOCATION_PERMISSION_L2},
    //     { colId: "location_heirarchy_3", field: "location_heirarchy_3", headerName:LOCATION_PERMISSION_L3},
    // ];
    const productColumns = getProductColumns(EnvConfig);
    const locationColumns = getLocationColumns(EnvConfig);
    const columnDefs = permissionType === 'Product_Permissions' ? productColumns : locationColumns;


    if(isLoading){
        return (
            <Skeleton style={{height:400,width:'100%'}}/>
        )
    }

    if (!hasData) {
        return (
            <div style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <p>No {permissionType === 'Product_Permissions' ? 'Product' : 'Location'} Permissions Found</p>
            </div>
        )
    }

    return(
        <TableWrapper>
            <VFTable 
                defaultColDef={{
                    flex:1,
                    cellStyle:{ 'text-align':'center' }
                }}
                rowHeight={50}
                height="600px"
                rowData={rowData}
                columnDefs={columnDefs}
            />
        </TableWrapper>
    )
}

export default ViewPermissions
