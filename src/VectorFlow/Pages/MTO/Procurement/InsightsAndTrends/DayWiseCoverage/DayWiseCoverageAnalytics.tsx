import React from 'react'
import { useSelector } from 'react-redux'
import { AnalyticsCol, AnalyticsRow, AnalyticsTable } from './style.css'

const DaywiseCoverageAnalytics = () => {

  const data = useSelector((state: any) => state.mto.DaywiseCoverageAnalytics)

  console.log(data);
  if(!data){
    return <></>
  }
  
  return (
<table className={AnalyticsTable}>
<thead>
<tr className={AnalyticsRow}>
<td className={AnalyticsCol}>Analytics</td>
</tr>
<tr className={AnalyticsRow}>
<td className={AnalyticsCol}>Months</td>
<td className={AnalyticsCol}>No of Green</td>
<td className={AnalyticsCol}>No of Red</td>
<td className={AnalyticsCol}>% of Green</td>
        </tr>
      </thead>
      <tbody>
      {data.map((row: any, index: number)=>{
        return ( <tr key={index} className={AnalyticsRow}>
        <td className={AnalyticsCol}>{row[0]}</td>
        <td className={AnalyticsCol}>{row[1]}</td>
        <td className={AnalyticsCol}>{row[2]}</td>
        <td className={AnalyticsCol}>{row[3]}%</td>
        </tr>)
      })}
      {/* <AnalyticsRow>
          <AnalyticsCol>Jun</AnalyticsCol>
          <AnalyticsCol>10</AnalyticsCol>
          <AnalyticsCol>10</AnalyticsCol>
          <AnalyticsCol>50%</AnalyticsCol>
        </AnalyticsRow>
        <AnalyticsRow>
          <AnalyticsCol>Jul</AnalyticsCol>
          <AnalyticsCol>10</AnalyticsCol>
          <AnalyticsCol>0</AnalyticsCol>
          <AnalyticsCol>100%</AnalyticsCol>
        </AnalyticsRow>
        <AnalyticsRow>
          <AnalyticsCol>Aug</AnalyticsCol>
          <AnalyticsCol>10</AnalyticsCol>
          <AnalyticsCol>10</AnalyticsCol>
          <AnalyticsCol>50%</AnalyticsCol>
        </AnalyticsRow> */}
      </tbody>
    </table>
  )
}

export default DaywiseCoverageAnalytics