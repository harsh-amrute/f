import { AgCartesianSeriesOptions, AgChartOptions } from 'ag-charts-community'
import { useEffect, useState } from 'react'
import VFCapsule from '../../../../../../components/VectorFLOW/commons/VFCapsule'
import VFInfoToolTip from '../../../../../../components/VectorFLOW/commons/VFInfoToolTip'
import VFRangeSlider from '../../../../../../components/VectorFLOW/commons/VFRangeSlider'
import SplitGraphContainer from '../../../Common/SplitGraphContainer'
import { SCChartHeaderContainer, SCChartMainContainer, CapsuleWrapper, SCChartSliderContainer, BMTrendWrapper } from './styles'
import MTOActionToolBar from '../../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar'
import { useGetBMTrendsData } from '../../../../../Services/MTO/Production/InsightsAndTrends/BMTrends'

interface TooltipValuesProps {
    countArr: number[];
    perArr: number[];
    actBtn: ActBtn;
}

type ActBtn = {
    label: string;
    value: string;
};

type BufferTrendData = {
    dt: string;
    b?: number;
    r?: number;
    g?: number;
    y?: number;
    bl?: number;
    w?: number;
};

const BMTrends = () => {

    const [horizonDays, setHorizondays] = useState(14);
    const [actBtn, setActBtn] = useState({
        label: "Absolute Value",
        value: 'Absolute Value'
    });
    const [bmTrendData, setBMTrendData] = useState<BufferTrendData[]>([]);
    const { data } = useGetBMTrendsData() || {};
    const [numericData, setNumericData] = useState<BufferTrendData[]>(filterDataByDaysGap(bmTrendData, 0, horizonDays, false));
    const [hideChart1, toggleChart1] = useState(false);
    const [rowData, setRowData] = useState(numericData)

    const colors = [
        { label: 'Black', value: 'black', key: 'b' },
        { label: 'Red', value: 'red', key: 'r' },
        { label: 'Yellow', value: 'yellow', key: 'y' },
        { label: 'Green', value: 'green', key: 'g' },
        { label: 'Blue', value: 'blue', key: 'bl' },
        { label: 'White', value: 'gray', key: 'w' },
    ];

    function filterDataByDaysGap(buffData: BufferTrendData[], numberOfDaysGap: number, horizonDays: number, isPer: boolean): BufferTrendData[] {
        const filteredData: (BufferTrendData[]) = [];
        const data = (isPer) ? convertToPercentage(buffData) : buffData;
        let currentDate = new Date(data[0]?.dt?.split('-')?.reverse()?.join('-')); // Convert dd-mm-yyyy to yyyy-mm-dd

        filteredData.push(data[0]);

        for (let i = 1; i < ((horizonDays < data.length) ? horizonDays : data.length); i++) {
            const prevDate = new Date(data[i]?.dt?.split('-')?.reverse()?.join('-'));

            const diffInDays = (prevDate.getTime() + currentDate.getTime()) / (1000 * 60 * 60 * 24);

            if (diffInDays >= numberOfDaysGap) {
                filteredData.push(data[i]);
                currentDate = prevDate;
            }
        }

        return filteredData?.reverse();
    }


    function convertToPercentage(data: BufferTrendData[]): BufferTrendData[] {
        return data.map(entry => {
            let total = 0;
            if (entry?.b) {
                total += entry?.b;
            }
            if (entry?.r) {
                total += entry?.r;
            }
            if (entry?.g) {
                total += entry?.g;
            }
            if (entry?.y) {
                total += entry?.y;
            }
            if (entry?.w) {
                total += entry?.w;
            }
            if (entry?.bl) {
                total += entry?.bl;
            }

            if (total === 0) {
                return entry
            }

            return {
                dt: entry?.dt,
                b: entry?.b ? ((entry?.b / total) * 100) : 0,
                r: entry?.r ? ((entry?.r / total) * 100) : 0,
                g: entry?.g ? ((entry?.g / total) * 100) : 0,
                y: entry?.y ? ((entry?.y / total) * 100) : 0,
                bl: entry?.bl ? ((entry?.bl / total) * 100) : 0,
                w: entry?.w ? ((entry?.w / total) * 100) : 0,
            };
        });

    }

    function TooltipRenderer({ datum, xKey }: any) {

        let countArr = [];
        let perArr = [];

        function convertToPercentageArray(absoluteValues: number[]) {
            const total = absoluteValues.reduce((sum, value) => sum + value, 0);

            // If the total is 0, to avoid division by zero, we can return an array of 0 percentages.
            if (total === 0) {
                return absoluteValues.map(() => 0);
            }

            const percentageValues = absoluteValues.map(value => (value / total) * 100);
            // console.log("percentValue", percentageValues)
            return percentageValues;
        }

        if (actBtn.label === 'Absolute Value') {
            countArr = [datum['b'], datum['r'], datum['y'], datum['g'], datum['bl'], datum['w']]
            perArr = convertToPercentageArray(countArr);
        }
        else {
            perArr = [datum['b'], datum['r'], datum['y'], datum['g'], datum['bl'], datum['w']];
            let reqData = null;
            countArr = [0, 0, 0, 0, 0, 0];

            bmTrendData.forEach(element => {
                if (element.dt === datum['dt']) {
                    reqData = element;
                    countArr = [reqData?.b, reqData?.r, reqData?.y, reqData?.g, reqData?.bl, reqData?.w]
                }
            });
        }

        const getToolTipValues = ({ countArr, perArr, actBtn }: TooltipValuesProps) => {
            let values = '';
            for (let i = 0; i < colors?.length; i++) {
                values += `<tr key=${i}>
                <tr><td style="padding: 5px; background-color: #6C696A;"><div style="display: flex; align-items: center;"><div style="margin-right: 10px; height: 3px; width: 15px; background-color: ${colors[i]?.value}"></div>${colors[i]?.label}</div></td>
                    ${actBtn.label === 'Percentage' ? (
                        `<td style={{ padding: '5px', backgroundColor: '#6C696A' }}>
                            ${Math.round(perArr[i])}%
                        </td>`
                    ) : (
                        `<td style={{ padding: '5px', backgroundColor: '#6C696A' }}>
                            ${countArr[i]}
                        </td>`
                    )}
                </tr>`;
            }
            return values;
        };

        return `
        <div style="background:#6C696A" >
        <div  style=" color: white; padding-top: 10px; padding-bottom:4px;background-color: #6C696A; display: flex; justify-content: center; align-items: center">
            ${datum[xKey]}
        </div>
        <div style="color: white; background-color: #6C696A; padding: 10px">
            <table style="width: 100%; color: white; border-collapse: collapse;">
                <thead style="border-bottom: 1px dashed white; border-top: 1px dashed white">
                    <tr>
                        <th style="padding: 5px;  background-color: #6C696A; text-align: left; width: 120px"></th>
                        <th style="font-size: 8px; padding: 5px;  background-color: #6C696A; text-align: left;">${actBtn?.label === 'Percentage' ? 'Percentage' : 'Count'}</th>
                    </tr>
                </thead>
                <tbody>
                    ${getToolTipValues({ countArr, perArr, actBtn })}
                </tbody>
            </table>
        </div>
        </div>`;
    }

    const getSeriesData = () => {
        const series: AgCartesianSeriesOptions[] = [];
        for (let i = 0; i < colors?.length; i++) {

            series?.push({
                type: "line",
                xKey: "dt",
                yKey: `${colors[i]?.key}`,
                yName: `${colors[i]?.label}`,
                stroke: `${colors[i]?.value}`,
                strokeWidth: 3,
                marker: {
                    fill: `${colors[i]?.value}`,
                    stroke: `${colors[i]?.value}`
                },
                tooltip: {

                    renderer: TooltipRenderer

                }
            },)

        }
        return series;
    }

    const options: AgChartOptions = {
        axes: [
            {

                type: "category",
                position: 'bottom',
                label: {
                    fontSize: 8,
                    autoRotate: false,
                    fontWeight: 'bold',
                    color: 'black'
                },
                gridLine: {
                    enabled: false
                }
            },
            {
                title: { text: `${actBtn?.label === 'Percentage' ? "Percentage of Orders" : "Count of Orders"}`, fontSize: 10, spacing: 3 },
                type: "number",
                line: { enabled: true },
                position: 'left',
                label: {
                    formatter: function (params) {
                        return (params.value) + ((actBtn.label === 'Percentage') ? '%' : '');
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
        series: [...getSeriesData()],
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
        'This graph shows the trend of BM penetration in Black, Red, Green and Yellow.'
    ]

    const handleSubmitClick = () => {
        setNumericData(filterDataByDaysGap(bmTrendData, 0, horizonDays, (actBtn.label === 'Percentage')));
        // console.log("this is the converted numeric dat, ", numericData);
    }

    const updateGraphState = async () => {
        if (actBtn.label === 'Percentage') {

            setActBtn({
                label: "Absolute Value",
                value: 'Absolute Value'
            })
            setNumericData(bmTrendData);
            setNumericData(filterDataByDaysGap(numericData, 0, horizonDays, true));
            setNumericData(filterDataByDaysGap(bmTrendData, 0, horizonDays, (actBtn.label !== 'Percentage')));
        }
        else {
            setActBtn({
                label: "Percentage",
                value: 'Percentage'
            })
            setNumericData(convertToPercentage(bmTrendData))
            setNumericData(filterDataByDaysGap(numericData, 0, horizonDays, false));

            setNumericData(filterDataByDaysGap(bmTrendData, 0, horizonDays, (actBtn.label !== 'Percentage')));

        }

    }

    const colDef =
        [
            {
                field: 'dt',
                colId: 'dt',
                headerName: 'Date',
                initialWidth: 200
            },
            {
                field: 'b',
                colId: 'b',
                headerName: 'Black',
                initialWidth: 200

            },
            {
                field: 'r',
                colId: 'r',
                headerName: 'Red',
                initialWidth: 200

            }
            ,
            {
                field: 'g',
                colId: 'g',
                headerName: 'Green',
                initialWidth: 200

            }
            ,
            {
                field: 'y',
                colId: 'y',
                headerName: 'Yellow',
                initialWidth: 200

            }
            ,
            {
                field: 'bl',
                colId: 'bl',
                headerName: 'Blue',
                initialWidth: 200
            },
            {
                field: 'w',
                colId: 'w',
                headerName: 'White',
                initialWidth: 200
            }
        ]


    const [chartLoading, setChartLoading] = useState(true);
    const [tableLoading, setTableLoading] = useState(true);

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
                        > <b>Select Horizon: </b></label>
                        <VFRangeSlider
                            showTriangle={false}
                            min={1}
                            max={90}
                            milestones={[0, 14, 30, 60, 90]}
                            strictMode={false}
                            width={200}
                            defaultValue={horizonDays}
                            handleChange={(e) => setHorizondays(e)}
                            labelValueFormatter={(value: number) => value > 1 ? `${value} Days` : `${value} Day`}
                        />
                        <div>
                            {/* <VFButtonOutline themeUi={user.user.theme_ui} onClick={handleSubmitClick} width={120} disabled={false} style={{fontSize:'15px',height:'42px',fontWeight:500}}>
                                        Submit
                                    </VFButtonOutline> */}
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
                        <CapsuleWrapper style={{ zoom: 1, padding: '4px' }}>
                            <VFCapsule
                                activeBtn={actBtn}
                                capsules={[

                                    {
                                        label: "Percentage",
                                        value: 'Percentage'
                                    },
                                    {
                                        label: "Absolute Value",
                                        value: 'Absolute Value'
                                    }
                                ]}
                                handleClick={() => updateGraphState()}


                            />
                        </CapsuleWrapper>
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

    const formatDate = (date: Date): string => {
        const day = String(date.getDate()).padStart(2, '0');
        const month = String(date.getMonth() + 1).padStart(2, '0');
        const year = date.getFullYear();
        return `${day}-${month}-${year}`;
    }

    const convertToGraphData = (apiData: any) => {
        const startDate = formatDate(new Date());
        const numDays = 90;
        const updatedData: BufferTrendData[] = [];
        const dateParts = startDate?.split('-');
        const date = new Date(`${dateParts[2]}-${dateParts[1]}-${dateParts[0]}`); // Convert to YYYY-MM-DD

        for (let i = 0; i < numDays; i++) {
            const day = formatDate(date);
            let entry: any = {
                'dt': day,
                'b': 0,
                'r': 0,
                'g': 0,
                'y': 0,
                'bl': 0,
                'w': 0,
            };
            const newDate = day?.split('-')?.reverse()?.join('-');
            if (apiData[newDate]) {
                if (apiData[newDate]?.B) {
                    entry = { ...entry, b: apiData[newDate]?.B || 0 }
                }
                if (apiData[newDate]?.R) {
                    entry = { ...entry, r: apiData[newDate]?.R || 0 }
                }
                if (apiData[newDate]?.G) {
                    entry = { ...entry, g: apiData[newDate]?.G || 0 }
                }
                if (apiData[newDate]?.Y) {
                    entry = { ...entry, y: apiData[newDate]?.Y || 0 }
                }
                if (apiData[newDate]?.W) {
                    entry = { ...entry, w: apiData[newDate]?.W || 0 }
                }
                if (apiData[newDate]?.Bl) {
                    entry = { ...entry, bl: apiData[newDate]?.Bl || 0 }
                }
            }

            updatedData.push(entry);
            date.setDate(date.getDate() - 1);
        }
        // setData(apiData?.data?.data?.data);
        console.log(updatedData, 'UPDATED ')
        setBMTrendData(updatedData);
        setNumericData(filterDataByDaysGap(updatedData, 0, horizonDays, false));
    }

    useEffect(() => {
        if (numericData) {
            setRowData(numericData);
        }
    }, [numericData]);

    useEffect(() => {
        if (data?.data?.data) {
            convertToGraphData(data?.data?.data);
        }
    }, [data])

    return (
        <BMTrendWrapper>
            <MTOActionToolBar comp={'BMTrends'} />
            <SplitGraphContainer
                tableLoading={tableLoading}
                chartLoading={chartLoading}
                setTableLoading={setTableLoading}
                setChartLoading={setChartLoading}
                data={numericData}
                rowData={rowData}
                graphTitle={`Overall BM Trend (${numericData[0]?.dt} - ${numericData[numericData?.length - 1]?.dt} )`}
                tableTitle={`Overall BM Trend (${numericData[0]?.dt} - ${numericData[numericData?.length - 1]?.dt} )`}
                options={options}
                colDef={colDef}
                header={generateHeader}
                hideChart={hideChart1}
                toggleChart={toggleChart1}
                TooltipRenderer={TooltipRenderer}
                chartHeight={50}
            />
        </BMTrendWrapper>
    )
}

export default BMTrends