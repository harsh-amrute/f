import axios from "axios";
import { useEffect, useState } from "react";
import { Container, QuickFilterHeader } from "./styles"

import VFMasterCard from "../../commons/VFMasterCard/VFMasterCard";
import VFMasterFieldSearch from "../../commons/VFMasterFieldSearch/VFMasterFieldSearch";
import ButtonOutlineStatus from "~/components/commons/ButtonOutline/button";


const ModifyRecords = ()=>{
    
    const[isLoading,setIsLoading] = useState<boolean>(true)
    const [data,setData] = useState<any>([])
    const [selectedFields,setSelectedFields] = useState([])
    const [options,setOptions] = useState( [
        {
            value:'SKU Name',
            label:'SKU Name'
        },
        {
            value:'Location Name',
            label:'Location Name'
        }
    ])

    const dataArray =[
        {
            label:"SKU",
        },
        {
            label:"Discount Period",
        },
        {
            label:"IST Yield",
        },
        {
            label:"Grouping",
        },
        {
            label:"Deployment",
        },
        {
            label:"SKULocation",
        },
        {
            label:"Pivot Variant",
        },
        {
            label:"MOQ",
        },
        {
            label:"SOB",
        },
        {
            label:"Contact",
        },
        {
            label:"Location",
        },
        {
            label:"Seasonality",
        },
        {
            label:"Seasonality-Retail",
        },
        {
            label:"Location Priority",
        },
        {
            label:"Location Capacity",
        },
        {
            label:"Phase-In Phase-Out",
        },
        {
            label:"Buffer",
        },
        {
            label:"CCR",
        }
    ]


    useEffect(()=>{
        const getData = async()=>{
            
            const response =  await axios.get('https://3c8e9192-79db-40d7-b728-b29784f572de.mock.pstmn.io/api/user/all-master')
            setData(response.data.data)
            setIsLoading(false)
            
        }
        getData()
        
    },[])

    if(isLoading){
        return <p>Loading...</p>
    }


    return(
        <Container >
            <Container style={{flexDirection:'row',gap:'44px'}}>
                <VFMasterFieldSearch value={selectedFields} setValue={setSelectedFields} options={options} placeholder={'Select'} handleListChild={()=>console.log("")} maxToShow={3} backgroundColor={'#FFFFFF'} />
                <Container style={{flexDirection:'row'}}>
                    <QuickFilterHeader>
                        Quick Filters -
                    </QuickFilterHeader>
                    <Container style={{flexDirection:'row',flexWrap:'wrap',maxWidth:'900px',gap:'10px'}}>
                        {dataArray.map((i,index)=>{
                            return(
                                <ButtonOutlineStatus
                                    status={false}
                                    text={i.label}
                                    onChange={()=>console.log('s')}
                                    icon=''
                                    key={index}
                                />
                            )
                        })}
                    </Container>
                </Container>
            </Container>
            <Container style={{flexDirection:'row',gap:'30px',marginTop:'46px'}}>
            {data.map((item:any)=>{
                return <VFMasterCard data={item} key={item.id} selectedFields={selectedFields.map((s:any)=>s.value)}/>
            })}

            </Container>
        </Container>
    )
}

export default ModifyRecords;