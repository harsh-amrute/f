import VFModalCard from "../VFModalCard"
import { ColDef } from 'ag-grid-enterprise'; 
import { AgGridReact } from "ag-grid-react";
import { useUserData } from "../../../../context";
import {ButtonWrapper, AgGridWrapper, AgContainer} from './styles'
import VFButtonOutline from "../VFButtonOutline";
import './styles.css'
import { useDispatch } from 'react-redux';
import { TOGGLE_NORM_CHANGE_HISTORY_TABLE } from "../../../../redux/actions/MTA";
interface NormChangeHistoryTableProps {
    data:any
    onGoBack?:()=>void
}

const NormChangeHistoryTable = (props : NormChangeHistoryTableProps)=> {

    const {user} = useUserData()
    const themeUi=user?.user?.theme_ui;
    const dispatch = useDispatch();

    const {
        data
    } = props

    const CustomHeader = ({headerName}: any) => {
        return <div style={{ fontSize: "16px", display: "flex", alignItems: "center", textAlign:'center', justifyContent:'center' }}>{headerName}</div>; 
      };

      
    // const rowData = [
    //     { col1: '21 June', col2: '2', col3: '3', col4:'stockout has occured today.stockout done today and ready for the next stock to be delieverd,'},
    //     { col1: '22 June', col2: '3', col3: '4',col4:'stockout has occured today'},
    //   ];
    const columnDefs:ColDef[] = [
        { headerName: 'Change Date', field: 'nCD', colId:'nCD' , minWidth:150,flex:1, cellStyle: {fontSize: '14px',alignItems:'center', display:'flex', justifyContent:'center'},headerComponent: ()=> <CustomHeader headerName="Change Date"/>},
        { headerName: 'Old Norm', field: 'olN', colId:'olN', minWidth:110,flex:1, cellStyle: {fontSize: '14px',alignItems:'center', display:'flex', justifyContent:'center'},headerComponent: ()=> <CustomHeader headerName="Old Norm"/> },
        { headerName: 'New Norm', field: 'nN', colId:'nN',minWidth:120 ,flex:1, cellStyle: {fontSize: '14px',alignItems:'center', display:'flex', justifyContent:'center'}, headerComponent: ()=> <CustomHeader headerName="New Norm"/>},
        { headerName: 'Reason', field: 'rsn', colId:'rsn',minWidth:290, flex:2,cellRenderer: 'wrapTextCellRenderer',autoHeight: true,resizable: false,sortable: true, wrapText: true , cellStyle: {wordBreak: "normal",fontSize: '14px', lineHeight:'20px', alignItems:'center', display:'flex', textAlign:'left'}, headerComponent: ()=> <CustomHeader headerName="Reason"/> },
    ];

    return(
        <>
        <VFModalCard openModal={true} closeModal={()=>dispatch(TOGGLE_NORM_CHANGE_HISTORY_TABLE(false))} headerText={'Norm Change History'} headerIcon={''} closeIcon={'/assets/img/VectorFLOW/NMS/close-white.svg'} paddingLeftAndRight={0} headerBgColor={'black'}  headerTextColor={'white'} backgroundColor={'f4f4f4'} data-testid="vfmultifilter-img" >
            <AgContainer>
                <AgGridWrapper>
                    <div className="ag-theme-alpine "  style={{ height: '200px', width:'700px',textAlign:'center' }}>  
                        <AgGridReact
                        rowData={data}
                        columnDefs={columnDefs}
                    />
                     </div>
                 </AgGridWrapper> 
            </AgContainer>
            <ButtonWrapper>
                <VFButtonOutline themeUi={themeUi} onClick={()=>dispatch(TOGGLE_NORM_CHANGE_HISTORY_TABLE(false))} width={125}>Go Back!</VFButtonOutline>
            </ButtonWrapper>
        </VFModalCard>
        </>
    )
}

export default NormChangeHistoryTable