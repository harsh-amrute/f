import {useEffect, useState} from 'react';
import { InputTypes } from '../VectorFlow/Pages/MTO/Common/Enum';
import { findUniqueKeysAndValues, getDynamicAttributes, getKeyName } from '../helpers/utils';
import { filterAttributes, staticHeaderConfig } from '../VectorFlow/Pages/MTO/Common/VFCommonFilter/Constants';
import { FilterState } from '../VectorFlow/types/MTO';

const useFilter=(filterData: any, page: any)=>{
    const [multiFilter, setMultiFilter]= useState<any>({})
    
    const onFilterRemove = (parentId:string, filterId:any, value:any) => {
        const updatedMultiFilter = { ...multiFilter };
       const updatedFilters = updatedMultiFilter[parentId as keyof FilterState]?.filters || [];

       for(let i = 0; i < updatedFilters?.length; i++){
            const { attributeName } = updatedFilters[i];
            if(attributeName === filterId){
                updatedFilters[i].value = updatedFilters[i]?.value?.filter((val: any) => { 
                    const newVal =val.value || val.id;
                    if(newVal !== value){
                        return val;
                    }
                });
            }
       }

       updatedMultiFilter[parentId as keyof FilterState].filters = [...updatedFilters];
       
        setMultiFilter(updatedMultiFilter);
        return updatedMultiFilter
    };

    useEffect(()=>{

        if(filterData && Object.keys(filterData)?.length){

        const updatedFilterAttributes: any = {
            customer: [...filterAttributes.customer, ...getDynamicAttributes( filterData?.hdrkeymap?.cattr)],
            resource: [...filterAttributes.resource],
            order: [...filterAttributes.order, ...getDynamicAttributes(filterData?.hdrkeymap?.lattr), ...getDynamicAttributes(filterData?.hdrkeymap?.oattr)], 
            major: [...filterAttributes.major]
        };

        const filterOptionsConfig = findUniqueKeysAndValues(filterData);

        const routes = filterOptionsConfig?.route?.map((r: any) => r.id) || [];
        const { ccrs, ccrgroups, mappings, dept } = filterData || {};
        const department: any = [];
        const ccr: any = [];
        const ccrGrp: any = [];
        const mjr: any = [];
        let min: any = [];

        for(let i = 0; i < mappings.length; i++){
            const { rid, ccrid, grpid, deptid } = mappings[i];
            if(routes.includes(rid)){
                if(dept[deptid]?.nm && !(department.includes(dept[deptid]?.nm))){
                    department.push({id: deptid, label :dept[deptid]?.nm})
                }
                if(ccrs[ccrid]?.nm && !(ccr.includes(ccrs[ccrid]?.nm))){
                    ccr.push({id: ccrid, label: ccrs[ccrid]?.nm})
                }
                if(ccrgroups[grpid]?.nm && !(ccrGrp.includes(ccrgroups[grpid]?.nm))){
                    ccrGrp.push({id: grpid, label: ccrgroups[grpid]?.nm})
                }
            }
        }

        for(let i = 0; i < filterOptionsConfig?.majid?.length; i++){
            const mjrid = filterOptionsConfig?.majid[i].id;
            if(filterData?.mjar[mjrid]?.name && !mjr.includes(filterData?.mjar[mjrid]?.name)){
                mjr.push({id: mjrid, label: filterData?.mjar[mjrid]?.name});
                const minors = filterData?.mjar[mjrid]?.min?.map((reason: any) => ({ id: reason.id, label: reason.name}));
                min = [...min, ...minors];
            }
        }

        filterOptionsConfig.majid = mjr;
        filterOptionsConfig.minid = min;
        filterOptionsConfig.deptid = department;
        filterOptionsConfig.grpid = ccrGrp;
        filterOptionsConfig.ccrid = ccr;
        console.log(filterOptionsConfig, 'FILTER CONFIG');
        const filterObjects: FilterState = {}

        if(page?.mjr){
            filterObjects['major'] = {
                id: "mjr",
                label: "Major Reason & Minor Reason ",
                filters: updatedFilterAttributes?.major?.map((key: any) => ({
                    type: staticHeaderConfig[key]?.type || InputTypes.MultiSelect,
                    name: staticHeaderConfig[key]?.name ,
                    attributeName: key,
                    operator: '',
                    value: '',
                    options: filterOptionsConfig[key]
                }))
            }
        }
        if(page?.or){
            filterObjects["orders"] = {
                id: "odr",
                label: "Order Details Filter",
                filters: updatedFilterAttributes?.order?.map((key: any) => ({
                    type: staticHeaderConfig[key]?.type || InputTypes.MultiSelect,
                    name: staticHeaderConfig[key]?.name || (getKeyName(filterData?.hdrkeymap?.lattr, key) || getKeyName(filterData?.hdrkeymap?.oattr, key)),
                    attributeName: key,
                    operator: '',
                    value: key === 'ms' ?  filterData?.system_type?.map((type: any) => ({ id: type, label: type })) : [],
                    options: key === 'ms' ?  filterData?.system_type?.map((type: any) => ({ id: type, label: type })): filterOptionsConfig[key]
                })).filter((fil: any) => filterAttributes.order.includes(fil.attributeName) || ((getKeyName(filterData?.hdrkeymap.lattr, fil.attributeName) === fil.name) || (getKeyName(filterData?.hdrkeymap.oattr, fil.attributeName) === fil.name)))
            }
        }
        if(page?.res){
            filterObjects["resources"] = {
                id: "res",
                label: "Resources Filter",
                filters: updatedFilterAttributes?.resource?.map((key: any) => ({
                    type: staticHeaderConfig[key]?.type || InputTypes.MultiSelect,
                    name: staticHeaderConfig[key]?.name,
                    attributeName: key,
                    operator: '',
                    value: '',
                    options: filterOptionsConfig[key]
                }))
            }
        }
        if(page?.cus){
            filterObjects["customers"] = {
                id: "cus",
                label: "Customer Filter",
                filters: updatedFilterAttributes?.customer?.map((key: any) =>  ({
                    type: staticHeaderConfig[key]?.type || InputTypes.MultiSelect,
                    name: staticHeaderConfig[key]?.name || getKeyName(filterData?.hdrkeymap?.cattr, key),
                    attributeName: key,
                    operator: '',
                    value: '',
                    options: filterOptionsConfig[key]
                })).filter((fil: any) => filterAttributes.customer.includes(fil.attributeName) || (getKeyName(filterData?.hdrkeymap.cattr, fil.attributeName) === fil.name))
            }
        }
        setMultiFilter(filterObjects);
    }

    },[filterData])
        
           

    return{
        state:multiFilter,
        setState:setMultiFilter,
        onFilterRemove:onFilterRemove
    }

}

export default useFilter