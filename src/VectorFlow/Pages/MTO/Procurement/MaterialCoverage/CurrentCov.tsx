import  { useEffect, useState } from 'react';
import {
    MainContainer,
    Box,
    Main,
} from './styles';
import { calculatePercentage, mapOrderDetails } from './CommonFunc';
import { ColorsMTO } from '../../Common/Colors';
import MTOMaterialSO from '../../../../../components/VectorFLOW/commons/MTO/MaterialSOBox/MTOMaterialSO';
import { useDispatch } from 'react-redux';
import { SAVE_ANALYTICS_DATA } from '../../../../../redux/actions/MTO/index'

interface CurrentCovProps {
    handleToggleComponent: any

}


const CurrentCov = ({ handleToggleComponent }: CurrentCovProps) => {
    const dispatch = useDispatch();

    const [isSubPageOpen, setToggleSubPage] = useState<boolean>(false)
    const [totalOrderCount, setTotalOrdeerCount] = useState<number>(0);

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

    const [egthBlockCustCnt, setegthBlockCustCnt] = useState<number>(0);
    const [egthBlockOrdCnt, setegthBlockOrdCnt] = useState<number>(0);
    const [egthdOrderVal, setegthdOrderVal] = useState<number>(0);

    const [nthBlockCustCnt, setnthBlockCustCnt] = useState<number>(0);
    const [nthBlockOrdCnt, setnthBlockOrdCnt] = useState<number>(0);
    const [nthhdOrderVal, setnthhdOrderVal] = useState<number>(0);



    const loadInitialData = () => {
        const firstBlock: any = mapOrderDetails("Black", "Red", "Yellow", "NK", 0);
        const totalOrdCunt: any = calculatePercentage("Black", "Red", "Yellow", "Green");
        setTotalOrdeerCount(totalOrdCunt);

        setBRYNkCustCunt(firstBlock.cusCunt);
        setBRYNkOrdCunt(firstBlock.ordCunt);
        setBRYNkOrderVal(firstBlock.totalCunt);

        const secondBlock: any = mapOrderDetails("Black", "Red", "Yellow", "PK", 0);
        setSecBlockCustCnt(secondBlock.cusCunt);
        setSecBlockOrdCnt(secondBlock.ordCunt);
        setsecOrderVal(secondBlock.totalCunt);

        const thirdBlock: any = mapOrderDetails("Black", "Red", "Yellow", "FK", 0);
        setthrdBlockCustCnt(thirdBlock.cusCunt);
        setthrdBlockOrdCnt(thirdBlock.ordCunt);
        setthrdOrderVal(thirdBlock.totalCunt);

        const frthBlock: any = mapOrderDetails("Green", "", "", "NK", 0);
        setfrthBlockCustCnt(frthBlock.cusCunt);
        setfrthBlockOrdCnt(frthBlock.ordCunt);
        setfrthdOrderVal(frthBlock.totalCunt);

        const fifthBlock: any = mapOrderDetails("Green", "", "", "PK", 0);
        setfifthBlockCustCnt(fifthBlock.cusCunt);
        setfifthBlockOrdCnt(fifthBlock.ordCunt);
        setfifthdOrderVal(fifthBlock.totalCunt);

        const sxthBlock: any = mapOrderDetails("Green", "", "", "FK", 0);
        setsxthBlockCustCnt(sxthBlock.cusCunt);
        setsxthBlockOrdCnt(sxthBlock.ordCunt);
        setsxthdOrderVal(sxthBlock.totalCunt);

        const svnthBlock: any = mapOrderDetails("Blue", "", "", "NK", 1);
        setsvthBlockCustCnt(svnthBlock.cusCunt);
        setsvthBlockOrdCnt(svnthBlock.ordCunt);
        setsvthdOrderVal(svnthBlock.totalCunt);

        const egthBlock: any = mapOrderDetails("Blue", "", "", "PK", 1);
        setegthBlockCustCnt(egthBlock.cusCunt);
        setegthBlockOrdCnt(egthBlock.ordCunt);
        setegthdOrderVal(egthBlock.totalCunt);

        const nthBlock: any = mapOrderDetails("Blue", "", "", "FK", 1);
        setnthBlockCustCnt(nthBlock.cusCunt);
        setnthBlockOrdCnt(nthBlock.ordCunt);
        setnthhdOrderVal(nthBlock.totalCunt);
    }

    useEffect(() => {
        loadInitialData();
        setAnalyticalData();
    }, [])

    const setAnalyticalData = () => {
        const blackCount = mapOrderDetails("Black", "", "", "", 4)
        const redCount = mapOrderDetails("Red", "", "", "", 4)
        const yellowCount = mapOrderDetails("Yellow", "", "", "", 4)
        const greenCount = mapOrderDetails("Green", "", "", "", 4)
        const blueCount = mapOrderDetails("Blue", "", "", "", 4)
        const TotalCountObj = {
            "Black": {
                "color": ColorsMTO.Black,
                "order": blackCount,
            },
            "Red": {
                "color": ColorsMTO.Red,
                "order": redCount,
            },
            "Yellow": {
                "color": ColorsMTO.Yellow,
                "order": yellowCount,
            },
            "Green": {
                "color": ColorsMTO.Green,
                "order": greenCount,
            },
            "Blue": {
                "color": ColorsMTO.Blue,
                "order": blueCount,
            }
        }
        dispatch(SAVE_ANALYTICS_DATA(TotalCountObj))
    }

    const handleToggle = () => {
        setToggleSubPage(true);
        handleToggleComponent(isSubPageOpen);
    }



    return (
        <Main>
            {/**1st row */}
            <MainContainer>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }}
                        height={"24px"}
                        text={""}
                        orderCount={BRYNkOrdCunt}
                        cutCount={BRYNkCustCunt}
                        orderValue={BRYNkOrdVal}
                        percent={BRYNkOrdCunt/totalOrderCount}
                    />
                </Box>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }}
                        height={"24px"}
                        text={""}
                        orderCount={secBlockCustCnt}
                        cutCount={secBlockOrdCnt}
                        orderValue={secOrderVal}
                        percent={secBlockCustCnt/totalOrderCount}
                    />
                </Box>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Full  Kit"}
                        colors={{ c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }}
                        height={"24px"}
                        text={""}
                        orderCount={thrdBlockCustCnt}
                        cutCount={thrdBlockOrdCnt}
                        orderValue={thrdOrderVal}
                        percent={thrdBlockCustCnt/totalOrderCount}
                    />
                </Box>
            </MainContainer>



            <MainContainer>
                {/** 1st Box */}
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Green, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={frthBlockCustCnt}
                        cutCount={frthBlockOrdCnt}
                        orderValue={frthOrderVal}
                        percent={frthBlockCustCnt/totalOrderCount}
                    />

                </Box>

                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Green, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={fifthBlockCustCnt}
                        cutCount={fifthBlockOrdCnt}
                        orderValue={fifthOrderVal}
                        percent={fifthBlockCustCnt/totalOrderCount}
                    />

                </Box>

                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Green, c2: null, c3: null }}
                        height={"48px"}
                        text={""}
                        orderCount={sxthBlockCustCnt}
                        cutCount={sxthBlockOrdCnt}
                        orderValue={sxthdOrderVal}
                        percent={sxthBlockCustCnt/totalOrderCount}
                    />

                </Box>
            </MainContainer>


            <div style={{
                width: "95%",
                border: `1px dashed ${ColorsMTO.LightGrey}`,
                color: ColorsMTO.White,
                marginBottom: '20px'
            }}>
            </div>

            <MainContainer>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"7-14 days"}
                        orderCount={svthBlockCustCnt}
                        cutCount={svthBlockOrdCnt}
                        orderValue={svthdOrderVal}
                        percent={30/100}
                    />

                </Box>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"7-14 days"}
                        orderCount={egthBlockCustCnt}
                        cutCount={egthBlockOrdCnt}
                        orderValue={egthdOrderVal}
                        percent={30/100}
                    />

                </Box>
                <Box onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"7-14 days"}
                        orderCount={nthBlockCustCnt}
                        cutCount={nthBlockOrdCnt}
                        orderValue={nthhdOrderVal}
                        percent={40/100}
                    />

                </Box>
            </MainContainer>

        </Main>
    )
}

export default CurrentCov