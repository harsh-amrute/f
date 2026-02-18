import { useSelector } from 'react-redux';
import { AnalyticsCol, AnalyticsRow, AnalyticsTable,  headerRow,
    headerCell,
    bodyRow,
    cell,
    cellRight,
    totalRow,
    totalCell,
   } from '../../../Procurement/InsightsAndTrends/DayWiseCoverage/style.css';


const ResourceUtilAnalytics = () => {

    const data = useSelector((state: any) => state.mto.ResourceUtilAnalytics)


    if (data === null || data === undefined || data.type === undefined || data.type === null) {
        return null;
    }



    if (data?.type === 'wip') {

        return (
            <table className={AnalyticsTable} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
                <thead>
                    <tr className={headerRow}>
                    <th className={headerCell}  style={{ display: 'flex', justifyContent: 'center' }}>WIP Analytics</th>
                    </tr>
                    <hr />
                </thead>
                <tbody>
                    <tr className={bodyRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>Over Limit</td>
                    <td className={cellRight}>{data.ol}</td>

                    </tr>
                    <tr className={bodyRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>Under Limit</td>
                    <td className={cellRight}>{data.ul}</td>

                    </tr>
                    <hr />
                    <tr className={bodyRow} style={{ background: 'black', display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>Total</td>
                    <td className={cellRight}>{data.ol + data.ul}</td>

                    </tr>



                </tbody>
            </table>
        )

    }
    else if (data?.type === 'util') {
        return (
            <table className={AnalyticsTable} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center' }} >
      <thead>
        <tr className={headerRow}>
          <th className={headerCell} colSpan={2}>
            WIP Analytics
          </th>
        </tr>
      </thead>
                <tbody>
                    <tr className={AnalyticsRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>{'<60%'}</td>
                        <td className={cellRight}>{data.sixty}</td>

                    </tr>
                    <tr className={AnalyticsRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>{'60% - 80%'}</td>
                        <td className={cellRight}>{data.sixeight}</td>

                    </tr>
                    <tr className={AnalyticsRow} style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>{'>80%'}</td>
                        <td className={cellRight}>{data.eight}</td>
                    </tr>
                    <hr />
                    <tr className={AnalyticsRow} style={{ background: 'black', display: 'flex', justifyContent: 'space-between' }}>
                    <td className={cell}>Total</td>
                        <td className={cellRight}>{data.sixty + data.eight + data.sixeight}</td>

                    </tr>



                </tbody>
            </table>
        )
    }

    return null;


}

export default ResourceUtilAnalytics