import { useState, useEffect } from 'react';
import { ColorsMTO } from '../../Common/Colors';
import {
    MainContainer,
    Box,
    Main,
} from '../MaterialCoverage/styles';
import MTOMaterialSO from '../../../../../components/VectorFLOW/commons/MTO/MaterialSOBox/MTOMaterialSO';
import { mapOrderDetails, calculatePercentage, DetailsObj } from './CommonFunc';

interface FutureCovProps {
    data: any,
    handleToggleComponent: any,
    setDetailDataObj: (data: DetailsObj) => void
}

const FutureCov = ({ data: SOData, handleToggleComponent, setDetailDataObj }: FutureCovProps) => {
    // const [SOData, setSOData] = useState<string[]>(SOData);
    const [totalOrderCount2, setTotalOrdeerCount2] = useState<number>(0);
    const [totalOrderCount3, setTotalOrdeerCount3] = useState<number>(0);
    const [totalOrderCount4, setTotalOrdeerCount4] = useState<number>(0);

    // const [isSubPageOpen, setToggleSubPage] = useState<boolean>(false)


    const [BRYNkOrdCunt, setBRYNkOrdCunt] = useState<number>(0);
    const [BRYNkCustCunt, setBRYNkCustCunt] = useState<number>(0);
    const [BRYNkOrdVal, setBRYNkOrderVal] = useState<number>(0);
    const [BRYSrtDt, setBRYSrtDt] = useState<string>('');
    const [BRYEndDt, setBRYEndDt] = useState<string>('');

    const [secBlockOrdCnt, setSecBlockOrdCnt] = useState<number>(0);
    const [secBlockCustCnt, setSecBlockCustCnt] = useState<number>(0);
    const [secOrderVal, setsecOrderVal] = useState<number>(0);
    const [secSrtDt, setSecSrtDt] = useState<string>('');
    const [secEndDt, setsecEndDt] = useState<string>('');

    const [thrdBlockOrdCnt, setthrdBlockOrdCnt] = useState<number>(0);
    const [thrdBlockCustCnt, setthrdBlockCustCnt] = useState<number>(0);
    const [thrdOrderVal, setthrdOrderVal] = useState<number>(0);
    const [thrdSrtDt, setthrdSrtDt] = useState<string>('');
    const [thrdEndDt, setthrdEndDt] = useState<string>('');

    const [frthBlockOrdCnt, setfrthBlockOrdCnt] = useState<number>(0);
    const [frthBlockCustCnt, setfrthBlockCustCnt] = useState<number>(0);
    const [frthOrderVal, setfrthdOrderVal] = useState<number>(0);
    const [frthSrtDt, setfrthSrtDt] = useState<string>('');
    const [frthEndDt, setfrthEndDt] = useState<string>('');

    const [fifthBlockOrdCnt, setfifthBlockOrdCnt] = useState<number>(0);
    const [fifthBlockCustCnt, setfifthBlockCustCnt] = useState<number>(0);
    const [fifthOrderVal, setfifthdOrderVal] = useState<number>(0);
    const [fifthSrtDt, setfifthSrtDt] = useState<string>('');
    const [fifthEndDt, setfifthEndDt] = useState<string>('');

    const [sxthBlockCustCnt, setsxthBlockCustCnt] = useState<number>(0);
    const [sxthBlockOrdCnt, setsxthBlockOrdCnt] = useState<number>(0);
    const [sxthdOrderVal, setsxthdOrderVal] = useState<number>(0);
    const [sxthSrtDt, setsxthSrtDt] = useState<string>('');
    const [sxthEndDt, setsxthEndDt] = useState<string>('');

    const [svthBlockCustCnt, setsvthBlockCustCnt] = useState<number>(0);
    const [svthBlockOrdCnt, setsvthBlockOrdCnt] = useState<number>(0);
    const [svthdOrderVal, setsvthdOrderVal] = useState<number>(0);
    const [svthSrtDt, setsvthSrtDt] = useState<string>('');
    const [svthEndDt, setsvthEndDt] = useState<string>('');

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
        const totalOrdCOunt2: any = calculatePercentage(SOData, "Blue", "", "", "", 2);
        setTotalOrdeerCount2(totalOrdCOunt2);
        const totalOrdCOunt3: any = calculatePercentage(SOData, "Blue", "", "", "", 3);
        setTotalOrdeerCount3(totalOrdCOunt3);
        const totalOrdCOunt4: any = calculatePercentage(SOData, "Blue", "", "", "", 4);
        setTotalOrdeerCount4(totalOrdCOunt4);

        const firstBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 2);

        setBRYNkCustCunt(firstBlock.cusCunt);
        setBRYNkOrdCunt(firstBlock.ordCunt);
        setBRYNkOrderVal(firstBlock.totalCunt);
        setBRYSrtDt(firstBlock.stdt);
        setBRYEndDt(firstBlock.endt);

        const secondBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 2);
        setSecBlockCustCnt(secondBlock.cusCunt);
        setSecBlockOrdCnt(secondBlock.ordCunt);
        setsecOrderVal(secondBlock.totalCunt);
        setSecSrtDt(secondBlock.stdt);
        setsecEndDt(secondBlock.endt);

        const thirdBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 2);
        setthrdBlockCustCnt(thirdBlock.cusCunt);
        setthrdBlockOrdCnt(thirdBlock.ordCunt);
        setthrdOrderVal(thirdBlock.totalCunt);
        setthrdSrtDt(thirdBlock.stdt);
        setthrdEndDt(thirdBlock.endt);

        const frthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 3);
        setfrthBlockCustCnt(frthBlock.cusCunt);
        setfrthBlockOrdCnt(frthBlock.ordCunt);
        setfrthdOrderVal(frthBlock.totalCunt);
        setfrthSrtDt(frthBlock.stdt);
        setfrthEndDt(frthBlock.endt);

        const fifthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 3);
        setfifthBlockCustCnt(fifthBlock.cusCunt);
        setfifthBlockOrdCnt(fifthBlock.ordCunt);
        setfifthdOrderVal(fifthBlock.totalCunt);
        setfifthSrtDt(fifthBlock.stdt);
        setfifthEndDt(fifthBlock.endt);

        const sxthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 3);
        setsxthBlockCustCnt(sxthBlock.cusCunt);
        setsxthBlockOrdCnt(sxthBlock.ordCunt);
        setsxthdOrderVal(sxthBlock.totalCunt);
        setsxthSrtDt(sxthBlock.stdt);
        setsxthEndDt(sxthBlock.endt);

        const svnthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "NK", 4);
        setsvthBlockCustCnt(svnthBlock.cusCunt);
        setsvthBlockOrdCnt(svnthBlock.ordCunt);
        setsvthdOrderVal(svnthBlock.totalCunt);
        setsvthSrtDt(svnthBlock.stdt);
        setsvthEndDt(svnthBlock.endt);

        const egthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "PK", 4);
        setegthBlockCustCnt(egthBlock.cusCunt);
        setegthBlockOrdCnt(egthBlock.ordCunt);
        setegthdOrderVal(egthBlock.totalCunt);
        setegthSrtDt(egthBlock.stdt);
        setegthEndDt(egthBlock.endt);

        const nthBlock: any = mapOrderDetails(SOData, "Blue", "", "", "FK", 4);
        setnthBlockCustCnt(nthBlock.cusCunt);
        setnthBlockOrdCnt(nthBlock.ordCunt);
        setnthhdOrderVal(nthBlock.totalCunt);
        setnthSrtDt(nthBlock.stdt);
        setnthEndDt(nthBlock.endt);
    }

    // useEffect(() => {

    //     setSOData(SOData?.data?.data)

    // }, [SOData])

    useEffect(() => {
        loadInitialData();
    }, [SOData])

    const handleToggle = (c1: any, c2: any, c3: any, kit: string, S: string, E: string) => {
        setDetailDataObj({ c1, c2, c3, kit, S, E })
        // setToggleSubPage(true);
        handleToggleComponent(true);
    }

    return (
        <Main>
            {/**1st row */}

            <MainContainer>
                <Box
                    data-testid="btn_navigate"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "2")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={BRYSrtDt + "-" + BRYEndDt + " Days"}
                        orderCount={BRYNkOrdCunt}
                        cutCount={BRYNkCustCunt}
                        orderValue={BRYNkOrdVal}
                        percent={BRYNkOrdCunt / totalOrderCount2}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "2")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={secSrtDt + "-" + secEndDt + " Days"}
                        orderCount={secBlockOrdCnt}
                        cutCount={secBlockCustCnt}
                        orderValue={secOrderVal}
                        percent={secBlockOrdCnt / totalOrderCount2}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "2")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={thrdSrtDt + "-" + thrdEndDt + " Days"}
                        orderCount={thrdBlockOrdCnt}
                        cutCount={thrdBlockCustCnt}
                        orderValue={thrdOrderVal}
                        percent={thrdBlockOrdCnt / totalOrderCount2}
                    />
                </Box>
            </MainContainer>



            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "3")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={frthSrtDt + "-" + frthEndDt + " Days"}
                        orderCount={frthBlockOrdCnt}
                        cutCount={frthBlockCustCnt}
                        orderValue={frthOrderVal}
                        percent={frthBlockOrdCnt / totalOrderCount3}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "3")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={fifthSrtDt + "-" + fifthEndDt + " Days"}
                        orderCount={fifthBlockOrdCnt}
                        cutCount={fifthBlockCustCnt}
                        orderValue={fifthOrderVal}
                        percent={fifthBlockOrdCnt / totalOrderCount3}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "3")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={sxthSrtDt + "-" + sxthEndDt + " Days"}
                        orderCount={sxthBlockOrdCnt}
                        cutCount={sxthBlockCustCnt}
                        orderValue={sxthdOrderVal}
                        percent={sxthBlockOrdCnt / totalOrderCount3}
                    />

                </Box>
            </MainContainer>

            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "NK", "0", "4")}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={svthSrtDt + "-" + svthEndDt + " Days"}
                        orderCount={svthBlockOrdCnt}
                        cutCount={svthBlockCustCnt}
                        orderValue={svthdOrderVal}
                        percent={svthBlockOrdCnt / totalOrderCount4}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "PK", "0", "4")}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={egthSrtDt + "-" + egthEndDt + " Days"}
                        orderCount={egthBlockOrdCnt}
                        cutCount={egthBlockCustCnt}
                        orderValue={egthdOrderVal}
                        percent={egthBlockOrdCnt / totalOrderCount4}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={() => handleToggle(ColorsMTO.Blue.label, "", "", "FK", "0", "4")}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue.code, c2: null, c3: null }}
                        height={"96px"}
                        text={nthSrtDt + "-" + nthEndDt + " Days"}
                        orderCount={nthBlockOrdCnt}
                        cutCount={nthBlockCustCnt}
                        orderValue={nthhdOrderVal}
                        percent={nthBlockOrdCnt / totalOrderCount4}
                    />

                </Box>

            </MainContainer>

        </Main>
    )
}

export default FutureCov