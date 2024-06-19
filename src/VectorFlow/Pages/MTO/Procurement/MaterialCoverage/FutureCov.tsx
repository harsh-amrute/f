import { useState, useEffect } from 'react';
import { ColorsMTO } from '../../Common/Colors';
import {
    MainContainer,
    Box,
    Main,
} from '../MaterialCoverage/styles';
import MTOMaterialSO from '../../../../../components/VectorFLOW/commons/MTO/MaterialSOBox/MTOMaterialSO';
import { mapOrderDetails, calculatePercentage, DetailsObj } from './CommonFunc';
import { useGetSOSummaydetails } from '../../../../Services/MTO/Procurement/MaterialCoverage/index';

interface FutureCovProps {
    handleToggleComponent: any,
    setDetailDataObj: (data: DetailsObj) => void
}

const FutureCov = ({ handleToggleComponent, setDetailDataObj }: FutureCovProps) => {
    const [SOData, setSOData] = useState<string[]>([]);
    const { data, /*isLoading, refetch*/ } = useGetSOSummaydetails();
    const [totalOrderCount, setTotalOrdeerCount] = useState<number>(0);

    const [isSubPageOpen, setToggleSubPage] = useState<boolean>(false)


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
        const totalOrdCunt: any = calculatePercentage(SOData, "Blue", "", "", "");
        setTotalOrdeerCount(totalOrdCunt);

        const firstBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 2);
        setBRYNkCustCunt(firstBlock.cusCunt);
        setBRYNkOrdCunt(firstBlock.ordCunt);
        setBRYNkOrderVal(firstBlock.totalCunt);

        const secondBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 2);
        setSecBlockCustCnt(secondBlock.cusCunt);
        setSecBlockOrdCnt(secondBlock.ordCunt);
        setsecOrderVal(secondBlock.totalCunt);

        const thirdBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 2);
        setthrdBlockCustCnt(thirdBlock.cusCunt);
        setthrdBlockOrdCnt(thirdBlock.ordCunt);
        setthrdOrderVal(thirdBlock.totalCunt);

        const frthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 3);
        setfrthBlockCustCnt(frthBlock.cusCunt);
        setfrthBlockOrdCnt(frthBlock.ordCunt);
        setfrthdOrderVal(frthBlock.totalCunt);

        const fifthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 3);
        setfifthBlockCustCnt(fifthBlock.cusCunt);
        setfifthBlockOrdCnt(fifthBlock.ordCunt);
        setfifthdOrderVal(fifthBlock.totalCunt);

        const sxthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 3);
        setsxthBlockCustCnt(sxthBlock.cusCunt);
        setsxthBlockOrdCnt(sxthBlock.ordCunt);
        setsxthdOrderVal(sxthBlock.totalCunt);

        const svnthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 4);
        setsvthBlockCustCnt(svnthBlock.cusCunt);
        setsvthBlockOrdCnt(svnthBlock.ordCunt);
        setsvthdOrderVal(svnthBlock.totalCunt);

        const egthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 4);
        setegthBlockCustCnt(egthBlock.cusCunt);
        setegthBlockOrdCnt(egthBlock.ordCunt);
        setegthdOrderVal(egthBlock.totalCunt);

        const nthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 4);
        setnthBlockCustCnt(nthBlock.cusCunt);
        setnthBlockOrdCnt(nthBlock.ordCunt);
        setnthhdOrderVal(nthBlock.totalCunt);
    }

    useEffect(() => {

        setSOData(data?.data?.data)

    }, [data])

    useEffect(() => {
        loadInitialData();
    }, [SOData])

    const handleToggle = (c1: any, c2: any, c3: any, kit: string, S: string, E: string) => {
        setDetailDataObj({ c1, c2, c3, kit, S, E })
        setToggleSubPage(true);
        handleToggleComponent(isSubPageOpen);
    }

    return (
        <Main>
            {/**1st row */}

            <MainContainer>
                <Box
                    data-testid="btn_navigate"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 day"}
                        orderCount={BRYNkOrdCunt}
                        cutCount={BRYNkCustCunt}
                        orderValue={BRYNkOrdVal}
                        percent={BRYNkOrdCunt / totalOrderCount}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 days"}
                        orderCount={secBlockOrdCnt}
                        cutCount={secBlockCustCnt}
                        orderValue={secOrderVal}
                        percent={secBlockOrdCnt / totalOrderCount}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 days"}
                        orderCount={thrdBlockOrdCnt}
                        cutCount={thrdBlockCustCnt}
                        orderValue={thrdOrderVal}
                        percent={thrdBlockOrdCnt / totalOrderCount}
                    />
                </Box>
            </MainContainer>



            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={frthBlockOrdCnt}
                        cutCount={frthBlockCustCnt}
                        orderValue={frthOrderVal}
                        percent={frthBlockOrdCnt / totalOrderCount}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={fifthBlockOrdCnt}
                        cutCount={fifthBlockCustCnt}
                        orderValue={fifthOrderVal}
                        percent={fifthBlockOrdCnt / totalOrderCount}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={sxthBlockOrdCnt}
                        cutCount={sxthBlockCustCnt}
                        orderValue={sxthdOrderVal}
                        percent={sxthBlockOrdCnt / totalOrderCount}
                    />

                </Box>
            </MainContainer>

            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={svthBlockOrdCnt}
                        cutCount={svthBlockCustCnt}
                        orderValue={svthdOrderVal}
                        percent={svthBlockOrdCnt / totalOrderCount}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={egthBlockOrdCnt}
                        cutCount={egthBlockCustCnt}
                        orderValue={egthdOrderVal}
                        percent={egthBlockOrdCnt / totalOrderCount}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "0")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={nthBlockOrdCnt}
                        cutCount={nthBlockCustCnt}
                        orderValue={nthhdOrderVal}
                        percent={nthBlockOrdCnt / totalOrderCount}
                    />

                </Box>

            </MainContainer>

        </Main>
    )
}

export default FutureCov