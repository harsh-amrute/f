/* eslint-disable @typescript-eslint/no-namespace */
import axios from 'axios';
export namespace InsightsAndTrendsService{
export const getAvaialabilityTrend = async (body:{horison:number}) => {
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AvailabilityTrend`,body,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilityLoc = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilityLoc`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilitySku = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilitySku`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getAvailabilityAgeing = async (body:{horison:number}) => {
    //console.log(horizon);
    return await axios.post(process.env.REACT_APP_VF_API_HOST + `/AvailabilityAgeing`,body,{
      
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionLoc = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionLoc`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionPie = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionPie`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionSKUs = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionSKUs`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getDBMNormSuggestionAgeing = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/DBMNormSuggestionAgeing`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getExcessInventorySku = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/ExcessInventorySku`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getExcessInventoryValue = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/ExcessInventoryValue`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
  export const getChronicUnavailabilityGridView = async () => {
    return await axios.get(process.env.REACT_APP_VF_API_HOST + `/ChronicUnavailabilityGridViewData`,{
      headers: { 'Content-Type': 'application/json' }
    })
  }
 
}