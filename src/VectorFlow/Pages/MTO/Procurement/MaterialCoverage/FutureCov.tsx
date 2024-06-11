import React, { useState, useEffect } from 'react';
import { ColorsMTO } from '../../Common/Colors';
import {
    MainContainer,
    Box,
    Main,
} from '../MaterialCoverage/styles';
import MTOMaterialSO from '../../../../../components/VectorFLOW/commons/MTO/MaterialSOBox/MTOMaterialSO';
import { mapOrderDetails } from './CommonFunc';

interface FutureCovProps {
    handleToggleComponent: any

}

const FutureCov = ({ handleToggleComponent }: FutureCovProps) => {
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
        const firstBlock: any = mapOrderDetails("Blue", "", "", "NK", 2);
        setBRYNkCustCunt(firstBlock.cusCunt);
        setBRYNkOrdCunt(firstBlock.ordCunt);
        setBRYNkOrderVal(firstBlock.totalCunt);

        const secondBlock: any = mapOrderDetails("Blue", "", "", "PK", 2);
        setSecBlockCustCnt(secondBlock.cusCunt);
        setSecBlockOrdCnt(secondBlock.ordCunt);
        setsecOrderVal(secondBlock.totalCunt);

        const thirdBlock: any = mapOrderDetails("Blue", "", "", "FK", 2);
        setthrdBlockCustCnt(thirdBlock.cusCunt);
        setthrdBlockOrdCnt(thirdBlock.ordCunt);
        setthrdOrderVal(thirdBlock.totalCunt);

        const frthBlock: any = mapOrderDetails("Blue", "", "", "NK", 3);
        setfrthBlockCustCnt(frthBlock.cusCunt);
        setfrthBlockOrdCnt(frthBlock.ordCunt);
        setfrthdOrderVal(frthBlock.totalCunt);

        const fifthBlock: any = mapOrderDetails("Blue", "", "", "PK", 3);
        setfifthBlockCustCnt(fifthBlock.cusCunt);
        setfifthBlockOrdCnt(fifthBlock.ordCunt);
        setfifthdOrderVal(fifthBlock.totalCunt);

        const sxthBlock: any = mapOrderDetails("Blue", "", "", "FK", 3);
        setsxthBlockCustCnt(sxthBlock.cusCunt);
        setsxthBlockOrdCnt(sxthBlock.ordCunt);
        setsxthdOrderVal(sxthBlock.totalCunt);

        const svnthBlock: any = mapOrderDetails("Blue", "", "", "NK", 4);
        setsvthBlockCustCnt(svnthBlock.cusCunt);
        setsvthBlockOrdCnt(svnthBlock.ordCunt);
        setsvthdOrderVal(svnthBlock.totalCunt);

        const egthBlock: any = mapOrderDetails("Blue", "", "", "PK", 4);
        setegthBlockCustCnt(egthBlock.cusCunt);
        setegthBlockOrdCnt(egthBlock.ordCunt);
        setegthdOrderVal(egthBlock.totalCunt);

        const nthBlock: any = mapOrderDetails("Blue", "", "", "FK", 4);
        setnthBlockCustCnt(nthBlock.cusCunt);
        setnthBlockOrdCnt(nthBlock.ordCunt);
        setnthhdOrderVal(nthBlock.totalCunt);
    }

    useEffect(() => {
        loadInitialData();
    }, [])

    const handleToggle = () => {
        setToggleSubPage(true);
        handleToggleComponent(isSubPageOpen);
    }

    return (
        <Main>
            {/**1st row */}

            <MainContainer>
                <Box
                    data-testid="btn_navigate"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 day"}
                        orderCount={BRYNkOrdCunt}
                        cutCount={BRYNkCustCunt}
                        orderValue={BRYNkOrdVal}
                        percent={20 / 100}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Partial Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 days"}
                        orderCount={secBlockCustCnt}
                        cutCount={secBlockOrdCnt}
                        orderValue={secOrderVal}
                        percent={50 / 100}
                    />
                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"Full Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"8-15 days"}
                        orderCount={thrdBlockCustCnt}
                        cutCount={thrdBlockOrdCnt}
                        orderValue={thrdOrderVal}
                        percent={30 / 100}
                    />
                </Box>
            </MainContainer>



            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={frthBlockCustCnt}
                        cutCount={frthBlockOrdCnt}
                        orderValue={frthOrderVal}
                        percent={32 / 100}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={fifthBlockCustCnt}
                        cutCount={fifthBlockOrdCnt}
                        orderValue={fifthOrderVal}
                        percent={28 / 100}
                    />

                </Box>

                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"16-22 days"}
                        orderCount={sxthBlockCustCnt}
                        cutCount={sxthBlockOrdCnt}
                        orderValue={sxthdOrderVal}
                        percent={40 / 100}
                    />

                </Box>
            </MainContainer>

            <MainContainer>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={svthBlockCustCnt}
                        cutCount={svthBlockOrdCnt}
                        orderValue={svthdOrderVal}
                        percent={25 / 100}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={egthBlockCustCnt}
                        cutCount={egthBlockOrdCnt}
                        orderValue={egthdOrderVal}
                        percent={45 / 100}
                    />

                </Box>
                <Box
                    data-testid="handleNavigation"
                    onClick={handleToggle}>
                    <MTOMaterialSO
                        kit={"No Kit"}
                        colors={{ c1: ColorsMTO.Blue, c2: null, c3: null }}
                        height={"96px"}
                        text={"23-30 days"}
                        orderCount={nthBlockCustCnt}
                        cutCount={nthBlockOrdCnt}
                        orderValue={nthhdOrderVal}
                        percent={30 / 100}
                    />

                </Box>

            </MainContainer>

        </Main>
    )
}

export default FutureCov