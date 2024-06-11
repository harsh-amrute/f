import React, { useState } from 'react';
import {
    BPRDailyAnalyticsHeader,
    BPRDailyAnalyticsContainer,
    BPRDailyAnalyticsTableCell,
    BPRDailyAnalyticsTableContainer,
    BPRDailyAnalyticsTableHeader,
    BPRDailyAnalyticsTableHeaderContainer,
    BPRDailyAnalyticsTableRow,
    BPRDailyAnalyticsTableRowContainer,
    BPRDailyAnalyticsWrapper,
    BPRDailyAnalyticsTableCellHeader,
} from './styles';
import { useSelector } from 'react-redux';
import { RootState } from '../../../../../redux/store/store';


const AnalyticalScreen = () => {
    //AnalyticsData
    const options = useSelector((state: RootState) => state.mto.AnalyticsData);
    console.log(options)

   

    const [rowData] = useState([
        {
            headerName: '',
        },
        {
            headerName: 'No Of Orders'
        },
        {
            headerName: 'No Of Customers'
        },
        {
            headerName: 'Total Order Value'
        },
    ])

    if(!options.Order){
        return null
    }


    return (
        <BPRDailyAnalyticsWrapper>
            <BPRDailyAnalyticsContainer>
                <BPRDailyAnalyticsHeader>
                    Analytics
                </BPRDailyAnalyticsHeader>

                <BPRDailyAnalyticsTableContainer>
                    <BPRDailyAnalyticsTableHeaderContainer style={{borderTop:'1px white solid',borderBottom:'1px dashed white'}}>
                        {rowData.map((data) => {
                            return (
                                <BPRDailyAnalyticsTableHeader>
                                    {data.headerName}
                                </BPRDailyAnalyticsTableHeader>
                            )
                        })
                        }
                    </BPRDailyAnalyticsTableHeaderContainer>
                    <BPRDailyAnalyticsTableRowContainer>
                        
                            {options.Order.map((o:any)=>{
                                return(
                                    <BPRDailyAnalyticsTableRow style={{
                                        height:30,
                                        boxShadow:'none',
                                        backgroundColor:'transparent',
                                        borderBottom:'1px white solid',
                                        borderRadius:0
                                    }}>
                                        {
                                            o.color==='#355FD3'
                                            ?
                                            <BPRDailyAnalyticsTableCell>
                                            <div style={{height:20,width:20,background:'linear-gradient(148deg, rgba(252,252,252,1) 0%, rgba(56,118,255,1) 71%, rgba(56,118,255,1) 100%)'}}>

                                            </div>
                                                
                                            </BPRDailyAnalyticsTableCell>
                                            :
                                            <BPRDailyAnalyticsTableCell>
                                            <div style={{height:20,width:20,backgroundColor:o.color}}>

                                            </div>
                                                
                                            </BPRDailyAnalyticsTableCell>
                                        }
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader style={{color:'white'}}>
                                                {o.ordCunt}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader  style={{color:'white'}}>
                                            {o.cusCunt}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader  style={{color:'white'}} >
                                            {o.totalCunt}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                    </BPRDailyAnalyticsTableRow>
                                )
                            })}
                            <BPRDailyAnalyticsTableRow style={{
                                        height:30,
                                        boxShadow:'none',
                                        backgroundColor:'black',
                                        
                                        borderRadius:0
                                    }}>
                                        
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader style={{color:'white'}}>
                                                Total
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader style={{color:'white'}}>
                                                {1688}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader  style={{color:'white'}}>
                                            {1678}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                        <BPRDailyAnalyticsTableCell>
                                            <BPRDailyAnalyticsTableCellHeader  style={{color:'white'}} >
                                            {150.1}
                                            </BPRDailyAnalyticsTableCellHeader>
                                            
                                        </BPRDailyAnalyticsTableCell>
                                    </BPRDailyAnalyticsTableRow>
                       
                    </BPRDailyAnalyticsTableRowContainer>
                </BPRDailyAnalyticsTableContainer>
               

            </BPRDailyAnalyticsContainer>
        </BPRDailyAnalyticsWrapper >

    )


}

export default AnalyticalScreen