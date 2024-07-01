import { useEffect, useState } from 'react';
import {
    MainContainer,
    Box,
    Main,
} from './styles';
import { calculatePercentage, mapOrderDetails, DetailsObj } from './CommonFunc';
import { ColorsMTO } from '../../Common/Colors';
import MTOMaterialSO from '../../../../../components/VectorFLOW/commons/MTO/MaterialSOBox/MTOMaterialSO';
import { useDispatch } from 'react-redux';
import { SAVE_ANALYTICS_DATA } from '../../../../../redux/actions/MTO/index';

interface CurrentCovProps {
    data: any,
    handleToggleComponent: any,
    setDetailDataObj: (data: DetailsObj) => void
}

const CurrentCov = ({ data: SOData, handleToggleComponent, setDetailDataObj }: CurrentCovProps) => {
   
    const dispatch = useDispatch();
    const [totalOrderCount, setTotalOrdeerCount] = useState<number>(0);
    const [totalBlueOrdCount, setTotalBlueOrdCunt] = useState<number>(0);

    const [BRYNkOrdCunt, setBRYNkOrdCunt] = useState<number>(0);
    const [BRYNkCustCunt, setBRYNkCustCunt] = useState<number>(0);
    const [BRYNkOrdVal, setBRYNkOrderVal] = useState<number>(0);

    const [secBlockOrdCnt, setSecBlockOrdCnt] = useState<number>(0);
    const [secBlockCustCnt, setSecBlockCustCnt] = useState<number>(0);
    const [secOrderVal, setsecOrderVal] = useState<number>(0);

    const [thrdBlockOrdCnt, setthrdBlockOrdCnt] = useState<number>(0);
    const [thrdBlockCustCnt, setthrdBlockCustCnt] = useState<number>(0);
    const [thrdOrderVal, setthrdOrderVal] = useState<number>(0);

    const [frthBlockOrdCnt, setfrthBlockOrdCnt] = useState<number>(0);
    const [frthBlockCustCnt, setfrthBlockCustCnt] = useState<number>(0);
    const [frthOrderVal, setfrthdOrderVal] = useState<number>(0);

    const [fifthBlockOrdCnt, setfifthBlockOrdCnt] = useState<number>(0);
    const [fifthBlockCustCnt, setfifthBlockCustCnt] = useState<number>(0);
    const [fifthOrderVal, setfifthdOrderVal] = useState<number>(0);

    const [sxthBlockCustCnt, setsxthBlockCustCnt] = useState<number>(0);
    const [sxthBlockOrdCnt, setsxthBlockOrdCnt] = useState<number>(0);
    const [sxthdOrderVal, setsxthdOrderVal] = useState<number>(0);

    const [svthBlockCustCnt, setsvthBlockCustCnt] = useState<number>(0);
    const [svthBlockOrdCnt, setsvthBlockOrdCnt] = useState<number>(0);
    const [svthdOrderVal, setsvthdOrderVal] = useState<number>(0);
    const [svthSrtDt, setSvthSrtDt] = useState<string>('');
    const [svthEndDt, setSvthEndDt] = useState<string>('');

    const [egthBlockCustCnt, setegthBlockCustCnt] = useState<number>(0);
    const [egthBlockOrdCnt, setegthBlockOrdCnt] = useState<number>(0);
    const [egthdOrderVal, setegthdOrderVal] = useState<number>(0);
    const [egthSrtDt, setegthSrtDt] = useState<string>('');
    const [egthEndDt, setegthEndDt] = useState<string>('');

    const [nthBlockCustCnt, setnthBlockCustCnt] = useState<number>(0);
    const [nthBlockOrdCnt, setnthBlockOrdCnt] = useState<number>(0);
    const [nthhdOrderVal, setnthhdOrderVal] = useState<number>(0);
    const [nthSrtDt, setnthSrtDt] = useState<string>('');
    const [nthEndDt, setnthEndDt] = useState<string>('');


    const loadInitialData = () => {

        const totalOrdCunt: any = calculatePercentage(SOData, ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, ColorsMTO.Green.label, 0);
        setTotalOrdeerCount(totalOrdCunt);

        const totalBlueOrdCount: any = calculatePercentage(SOData, ColorsMTO.Blue.label, ColorsMTO.White.label, "", "", 1);
        setTotalBlueOrdCunt(totalBlueOrdCount)

        const firstBlock: any = mapOrderDetails(SOData, ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "NK", 0);
        setBRYNkCustCunt(firstBlock.cusCunt);
        setBRYNkOrdCunt(firstBlock.ordCunt);
        setBRYNkOrderVal(firstBlock.totalCunt);

        const secondBlock: any = mapOrderDetails(SOData, ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "PK", 0);
        setSecBlockCustCnt(secondBlock.cusCunt);
        setSecBlockOrdCnt(secondBlock.ordCunt);
        setsecOrderVal(secondBlock.totalCunt);

        const thirdBlock: any = mapOrderDetails(SOData, ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "FK", 0);
        setthrdBlockCustCnt(thirdBlock.cusCunt);
        setthrdBlockOrdCnt(thirdBlock.ordCunt);
        setthrdOrderVal(thirdBlock.totalCunt);

        const frthBlock: any = mapOrderDetails(SOData, ColorsMTO.Green.label, "", "", "NK", 0);
        setfrthBlockCustCnt(frthBlock.cusCunt);
        setfrthBlockOrdCnt(frthBlock.ordCunt);
        setfrthdOrderVal(frthBlock.totalCunt);

        const fifthBlock: any = mapOrderDetails(SOData, ColorsMTO.Green.label, "", "", "PK", 0);
        setfifthBlockCustCnt(fifthBlock.cusCunt);
        setfifthBlockOrdCnt(fifthBlock.ordCunt);
        setfifthdOrderVal(fifthBlock.totalCunt);

        const sxthBlock: any = mapOrderDetails(SOData, ColorsMTO.Green.label, "", "", "FK", 0);
        setsxthBlockCustCnt(sxthBlock.cusCunt);
        setsxthBlockOrdCnt(sxthBlock.ordCunt);
        setsxthdOrderVal(sxthBlock.totalCunt);

        const svnthBlock: any = mapOrderDetails(SOData, ColorsMTO.Blue.label, ColorsMTO.White.label, "", "NK", 1);
        setsvthBlockCustCnt(svnthBlock.cusCunt);
        setsvthBlockOrdCnt(svnthBlock.ordCunt);
        setsvthdOrderVal(svnthBlock.totalCunt);
        setSvthSrtDt(svnthBlock.stdt);
        setSvthEndDt(svnthBlock.endt)

        const egthBlock: any = mapOrderDetails(SOData, ColorsMTO.Blue.label, ColorsMTO.White.label, "", "PK", 1);
        setegthBlockCustCnt(egthBlock.cusCunt);
        setegthBlockOrdCnt(egthBlock.ordCunt);
        setegthdOrderVal(egthBlock.totalCunt);
        setegthSrtDt(egthBlock.stdt)
        setegthEndDt(egthBlock.endt)

        const nthBlock: any = mapOrderDetails(SOData, ColorsMTO.Blue.label, ColorsMTO.White.label, "", "FK", 1);
        setnthBlockCustCnt(nthBlock.cusCunt);
        setnthBlockOrdCnt(nthBlock.ordCunt);
        setnthhdOrderVal(nthBlock.totalCunt);
        setnthSrtDt(nthBlock.stdt)
        setnthEndDt(nthBlock.endt)
    }

    // useEffect(() => {
    //     setSOData(data?.data?.data)
    // }, [data])

    useEffect(() => {
        loadInitialData();
        setAnalyticalData();
    }, [SOData])

    const setAnalyticalData = () => {
        // const totalOrdCnt
        // let totalCustCnt;
        // let totalOrderVal;

        const blackCount:any = mapOrderDetails(SOData, ColorsMTO.Black.label, "", "", "", 0)
        const redCount:any = mapOrderDetails(SOData, ColorsMTO.Red.label, "", "", "", 0)
        const yellowCount:any = mapOrderDetails(SOData, ColorsMTO.Yellow.label, "", "", "", 0)
        const greenCount:any = mapOrderDetails(SOData, ColorsMTO.Green.label, "", "", "", 0)
        const blueCount:any = mapOrderDetails(SOData, ColorsMTO.Blue.label, ColorsMTO.White.label, "", "", 1); 

        // totalOrdCnt = blackCount.ordCunt + redCount.ordCunt + yellowCount.ordCunt + greenCount.ordCunt + blueCount.ordCunt;
        // console.log('<>',totalCustCnt)
        const TotalCountObj = {
            "Order": [
                { ...blackCount, color: ColorsMTO.Black.code, },
                { ...redCount, color: ColorsMTO.Red.code },
                { ...yellowCount, color: ColorsMTO.Yellow.code },
                { ...greenCount, color: ColorsMTO.Green.code },
                { ...blueCount, color: ColorsMTO.Blue.code }
            ]
        }
        dispatch(SAVE_ANALYTICS_DATA(TotalCountObj))
    }

    const handleToggle = (c1: any, c2: any, c3: any, kit: string, S: string, E: string) => {

        setDetailDataObj({ c1, c2, c3, kit, S, E })
        // setToggleSubPage(true);
        handleToggleComponent(true);
    }

    function formatDate(start: any, end: any) {
        // if (start !== 0 || end !== 0) {
          return start + "-" + end + " Days";
        // }
      }      
      

    return (
        <Main>
            {/**1st row */}
            <MainContainer>
                <Box
                    data-testid="btn_navigate"
                    onClick={() => handleToggle(ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "NK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Black.code, c2: ColorsMTO.Red.code, c3: ColorsMTO.Yellow.code }}
                        height={"24px"}
                        text={""}
                        orderCount={BRYNkOrdCunt}
                        cutCount={BRYNkCustCunt}
                        orderValue={BRYNkOrdVal}
                        percent={BRYNkOrdCunt / totalOrderCount}
                    />
                </Box>
                <Box onClick={() => handleToggle(ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "PK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Black.code, c2: ColorsMTO.Red.code, c3: ColorsMTO.Yellow.code }}
                        height={"24px"}
                        text={""}
                        orderCount={secBlockOrdCnt}
                        cutCount={secBlockCustCnt}
                        orderValue={secOrderVal}
                        percent={secBlockOrdCnt / totalOrderCount}
                    />
                </Box>
                <Box onClick={() => handleToggle(ColorsMTO.Black.label, ColorsMTO.Red.label, ColorsMTO.Yellow.label, "FK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Full  Kit"}
                        colors={{ c1: ColorsMTO.Black.code, c2: ColorsMTO.Red.code, c3: ColorsMTO.Yellow.code }}
                        height={"24px"}
                        text={""}
                        orderCount={thrdBlockOrdCnt}
                        cutCount={thrdBlockCustCnt}
                        orderValue={thrdOrderVal}
                        percent={thrdBlockOrdCnt / totalOrderCount}
                    />
                </Box>
            </MainContainer>



            <MainContainer>
                {/** 1st Box */}
                <Box onClick={() => handleToggle(ColorsMTO.Green.label, "", "", "NK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Green.code, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={frthBlockOrdCnt}
                        cutCount={frthBlockCustCnt}
                        orderValue={frthOrderVal}
                        percent={frthBlockCustCnt / totalOrderCount}
                    />

                </Box>

                <Box onClick={() => handleToggle(ColorsMTO.Green.label, "", "", "PK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Green.code, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={fifthBlockOrdCnt}
                        cutCount={fifthBlockCustCnt}
                        orderValue={fifthOrderVal}
                        percent={fifthBlockCustCnt / totalOrderCount}
                    />

                </Box>

                <Box onClick={() => handleToggle(ColorsMTO.Green.label, "", "", "FK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Green.code, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={sxthBlockOrdCnt}
                        cutCount={sxthBlockCustCnt}
                        orderValue={sxthdOrderVal}
                        percent={sxthBlockCustCnt / totalOrderCount}
                    />

                </Box>
            </MainContainer>


            <div style={{
                width: "95%",
                border: `1px dashed ${ColorsMTO.LightGrey.code}`,
                color: ColorsMTO.White.code,
                marginBottom: '20px'
            }}>
            </div>

            <MainContainer >
                <Box onClick={() => handleToggle(ColorsMTO.Blue.label, ColorsMTO.White.label, "", "NK", svthSrtDt, svthEndDt)}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={formatDate(svthSrtDt, svthEndDt)}
                        orderCount={svthBlockOrdCnt}
                        cutCount={svthBlockCustCnt}
                        orderValue={svthdOrderVal}
                        percent={svthBlockOrdCnt / totalBlueOrdCount}
                    />

                </Box>
                <Box onClick={() => handleToggle(ColorsMTO.Blue.label, ColorsMTO.White.label, "", "PK", egthSrtDt, egthEndDt)}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={formatDate(egthSrtDt, egthEndDt)}
                        orderCount={egthBlockOrdCnt}
                        cutCount={egthBlockCustCnt}
                        orderValue={egthdOrderVal}
                        percent={egthBlockCustCnt / totalBlueOrdCount}
                    />

                </Box>
                <Box onClick={() => handleToggle(ColorsMTO.Blue.label, ColorsMTO.White.label, "", "FK", nthSrtDt, nthEndDt)}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={formatDate(nthSrtDt, nthEndDt)}
                        orderCount={nthBlockOrdCnt}
                        cutCount={nthBlockCustCnt}
                        orderValue={nthhdOrderVal}
                        percent={nthBlockOrdCnt / totalBlueOrdCount}
                    />

                </Box>
            </MainContainer>

        </Main>
    )
}

export default CurrentCov