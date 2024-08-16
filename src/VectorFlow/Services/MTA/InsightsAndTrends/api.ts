/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
export namespace InsightsAndTrendsService{
export const getAvaialabilityTrend = async (body:{horison:number}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AvailabilityTrend`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilityLoc = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilityLoc`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilitySku = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilitySku`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getAvailabilityAgeing = async (body:{horison:number}) => {
    //console.log(horizon);
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AvailabilityAgeing`,body,{
      
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionLoc = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionLoc`, body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionPie = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionPie`, body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionSKUs = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionSKUs`, body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionAgeing = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionAgeing`, body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
  export const getExcessInventorySku = async (body:{horison:number}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ExcessInventorySku`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getExcessInventoryValue = async (body:{horison:number}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ExcessInventoryValue`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilityGridView = async (body:any) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilityGridViewData`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
}