import {useState,useEffect,useCallback} from 'react'
import VFTable from "../../VectorFLOW/commons/VFTable"
import { TableWrapper } from "../UserURLsDrawer/styles"
import { useUserData } from "../../../context"
import { SecondaryButton, Skeleton } from "../../commons/styled"
import { notifyError } from '../../../helpers/notify'
// Import the necessary permission hook
import { useGetAdminPermissions } from '../../../VectorFlow/Services/MTA/MDM'

// The permissionType prop determines which data to fetch and display.
const ViewURLs = (props:{onEdit:(data:any)=>void, permissionType: string})=>{
    const { onEdit, permissionType } = props
    const {user} = useUserData()
    const themeUi = user.user.theme_ui
    const [rowData,setRowData] = useState<Array<any>>([])
    const [isLoading,setIsLoading] = useState<boolean>(true)
    const [hasData, setHasData] = useState<boolean>(true);


    // Use a single hook and handle the data fetching logic dynamically.
    const { mutateAsync: getPermissions } = useGetAdminPermissions();

    const getPermissionsData = useCallback(async(type: string)=>{
        setIsLoading(true);
        try{
            // Call the shared hook to get the permissions data.
            const result = await getPermissions();
console.log("RESULT",result);

            let data;
            if (type === 'Product_Permissions') {
                data = result?.data?.product;
            } else if (type === 'Location_Permissions') {
                // Assuming the key for location data is 'locationPermissions'.
                // If this is different, you'll need to update it here.
                data = result?.data?.location;
                console.log("DATAAAAAA",data);
                
            }
            // Now, set the rowData directly with the extracted array.
            setRowData(data || []);
            setHasData(data && data.length > 0);
        }catch(error:any){
            console.error(error);
            notifyError("Server Went Unresponsive");
            setRowData([]); // Clear data on error
            setHasData(false);
        }finally{
            setIsLoading(false);
        }
    },[getPermissions])

    useEffect(()=>{

        getPermissionsData(permissionType);
    },[permissionType, getPermissionsData])

    // Define column definitions conditionally
    const productColumns = [
        { colId: "id", field: "id" },
        { colId: "product_hierarchy_1", field: "product_hierarchy_1" },
        { colId: "product_hierarchy_2", field: "product_hierarchy_2" },
        { colId: "product_hierarchy_3", field: "product_hierarchy_3" },
    ];

    const locationColumns = [
        { colId: "id", field: "id" },
        // Corrected typo in field names to match server response
        { colId: "location_heirarchy_1", field: "location_heirarchy_1" },
        { colId: "location_heirarchy_2", field: "location_heirarchy_2" },
        { colId: "location_heirarchy_3", field: "location_heirarchy_3" },
    ];
    const columnDefs = permissionType === 'Product_Permissions' ? productColumns : locationColumns;
console.log("COLDEF",columnDefs);

    if(isLoading){
        return (
            <Skeleton style={{height:400,width:'100%'}}/>
        )
    }

    // New conditional rendering logic
    if (!hasData) {
        return (
            <div style={{height: 400, display: 'flex', alignItems: 'center', justifyContent: 'center'}}>
                <p>No {permissionType === 'Product_Permissions' ? 'Product' : 'Location'} Permissions Found</p>
            </div>
        )
    }
console.log("ROW DATA",rowData);

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

export default ViewURLs
