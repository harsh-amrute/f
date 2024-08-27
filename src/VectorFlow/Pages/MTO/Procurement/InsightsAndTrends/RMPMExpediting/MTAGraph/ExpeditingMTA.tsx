import { AgChartOptions } from 'ag-charts-community'
import { useEffect, useState } from 'react'
import VFInfoToolTip from '../../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFRangeSlider from '../../../../../../../VectorFlow/Pages/MTO/Common/VFRangeSlider'
import { SCChartHeaderContainer, SCChartMainContainer, SCChartSliderContainer } from '../../styles'
import SplitGraphContainer from '../../../../../../../VectorFlow/Pages/MTO/Common/SplitGraphContainer';
import { useGetRMExpeditingData } from '../../../../../../Services/MTO/Production/InsightsAndTrends/RMPMExpediting/index';
import moment from 'moment'

interface SupplierData {
    [key: string]: {
        [key: string]: number;
    };
}
interface Product {
    rn: string;  // Product ID
    c: number;   // Value for the product ID
}

interface Result {
    sn: string;
    rc: number;
    tt: Product[];  // Array of product objects with rn and c
}

const ExpeditingMTA = ({ date }: { isMTO: boolean, date: string }) => {
    let RMPMExpeditionOBj = {}
    const [chartLoading, setChartLoading] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);
    const [horizonDays, setHorizondays] = useState(14);

    const { mutateAsync: getRMPMExpedition } = useGetRMExpeditingData()
    const [numericData, setNumericData] = useState<any>();

    useEffect(() => {
        getOnLoadData();
    }, [])


    const transformSupplierData = (data: SupplierData): Result[] => {
        // Initialize an empty array to store the result
        const result: Result[] = [];
        // Loop through each supplier in the data
        for (const supplier in data) {
            // Calculate the sum of values for each supplier
            const total = Object.values(data[supplier]).reduce((acc, value) => acc + value, 0);
            // Push the result in the desired format

            // Create the tt array, which contains objects with rn and c for each product
            const tt = Object.entries(data[supplier]).map(([productId, value]) => ({
                rn: productId,
                c: value,
            }));

            // Push the result in the desired format
            result.push({
                sn: supplier,
                rc: total,
                tt: tt,  // Add array of product details
            });
        }
        // Sort the result array in descending order based on 'rn'
        result.sort((a, b) => b.rc - a.rc);

        return result;
    };

    const getOnLoadData = async () => {
        RMPMExpeditionOBj = {
            'horizon': '14',
            'val': 'all'
        }
        const someData = await getRMPMExpedition(RMPMExpeditionOBj);
        const xAxisValue = transformSupplierData(someData?.data?.data?.supplier);
        setNumericData(xAxisValue)
    }




    const TooltipRenderer = ({ datum }: any) => {

        return `
        <div style="background:#000; border-radius:3px; color:#fff; padding:8px">
            ${datum.tt.map((item: { rn: string; c: number }) => `
                <div style="width: 100%; display: flex; justify-content: space-between; padding: 5px 0;">
                    <div style="text-align: left;">${item.rn} :</div>
                    <div style="text-align: right;">${item.c}</div>
                </div>
            `).join('')}
            <hr style="border: 1px dashed"/>
            <div>No. Of Orders : ${datum.rc}</div>
        </div>
    `;
    }



    const options: AgChartOptions = {
        axes: [
            {
                title: { text: 'Supplier Name', fontSize: 10, spacing: 20 },
                type: "category",
                position: 'bottom',
                label: {
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }
            },
            {
                title: { text: "No. Of Impacted Orders", fontSize: 10, spacing: 3 },
                type: "number",
                line: { enabled: true },
                position: 'left',
                label: {
                    formatter: function (params) {
                        return (params.value);
                    },
                    fontSize: 8,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }

            }
        ],
        series: [
            {
                type: 'bar',
                xKey: "sn",
                yKey: "rc",
                fill: 'Grey',
                yName: "No of Impacted Orders",
                tooltip: {
                    renderer: TooltipRenderer
                }

            }

        ],
        legend: {
            position: 'bottom',
            item: {
                label: {
                    fontSize: 10,
                    fontFamily: 'Roboto',
                    fontWeight: 'normal'

                },
                marker: {
                    size: 14,
                    shape: 'square'
                },
                line: {
                    strokeWidth: 12
                }
            }

        }
    };

    const graph1 = [
        'The graph highlights the suppliers based on their impact on timely release of orders'
    ]
    const getRMHorizonBasedData = async () => {
        //setNumericData(null)
        RMPMExpeditionOBj = {
            'horizon': horizonDays,
            'val': 'supplier'
        }
        const someData = await getRMPMExpedition(RMPMExpeditionOBj);
        const xAxisValue = transformSupplierData(someData?.data?.data?.supplier);
        setNumericData(xAxisValue)
    }

    const handleSubmitClick = () => {
        //setNumericData();
        getRMHorizonBasedData();
    }

    const handleSliderChange = (val: any) => {
        setHorizondays(val)
    }


    const [hideChart1, toggleChart1] = useState(false);

    const colDef =
        [
            {
                field: 'sn',
                colId: 'sn',
                headerName: 'Suplier Name',
                initialWidth: 200
            },
            {
                field: 'rc',
                colId: 'rc',
                headerName: 'Impacted Order',
                initialWidth: 200

            },

        ]
    // const [rowData, setRowData] = useState(data)
    const rowData = numericData;


    const generateHeader = () => {
        return (
            <>
                <SCChartMainContainer style={{ zoom: 1, width: '100%' }}>
                    <SCChartSliderContainer style={{ zoom: 0.75, marginTop: '6px' }}>
                        <label style={{
                            fontStyle: "normal",
                            fontVariant: "normal",
                            fontWeight: 400,
                            fontSize: 15,
                            fontFamily: "Roboto",
                            paddingLeft: '10px'
                        }}
                        > <b>Select Horizon (in days): </b></label>
                        <VFRangeSlider
                            style={{ paddingTop: '13px' }}
                            showTriangle={false}
                            min={1}
                            max={90}
                            milestones={[0, 30, 60, 90]}
                            strictMode={false}
                            width={200}
                            defaultValue={horizonDays}
                            handleChange={(e) => handleSliderChange(e)}
                            labelValueFormatter={(value: number) => value.toString()}
                        />
                        <div>
                            <img

                                style={{ cursor: 'pointer' }}
                                src="/assets/img/Group 627.svg"
                                height={40}
                                width={50}
                                onClick={() => handleSubmitClick()}
                            />
                        </div>


                    </SCChartSliderContainer>
                    <SCChartHeaderContainer>
                        <div style={{ marginLeft: 30, marginBottom: '-5px' }}>
                            <VFInfoToolTip infoList={graph1} />
                        </div>
                        <div onClick={() => { toggleChart1(!hideChart1) }} style={{ marginLeft: 10, marginBottom: '-5px', marginRight: '10px' }}>
                            <img src='/assets/img/VectorFLOW/BPR/minimize.svg' height={13} width={13} color={"#CCCCCC"} />
                        </div>
                    </SCChartHeaderContainer>
                </SCChartMainContainer>
            </>

        )
    }

    return (
        <div style={{ height: "100%", display: 'flex', justifyContent: 'left', marginLeft: '10px' }}>



            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={numericData}
                rowData={rowData}
                graphTitle={`Top 10 Suppliers Impacting Orders With Release Date In Selected Horizon ( ${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')})`}
                tableTitle={`Top 10 Suppliers Impacting Orders With Release Date In Selected Horizon ( ${moment(date).format('D MMM YYYY')} - ${moment(date).add(horizonDays, 'days').format('D MMM YYYY')})`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                graphType={3}
            />
        </div>
    )
}

export default ExpeditingMTA