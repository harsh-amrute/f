import React, { useEffect, useState } from 'react'
import { boxDesign } from './CommonFunc';
import {
    MainContainer,
    Box,
    Main,
} from './styles';
import { mapOrderDetails } from './CommonFunc';
import { ColorsMTO } from '../../Common/Colors';


interface CurrentCovProps {
    handleToggleComponent: any

}

const CurrentCov = ({ handleToggleComponent }: CurrentCovProps) => {

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
        const firstBlock: any = mapOrderDetails("Black", "Red", "Yellow", "NK", 0);
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
    }, [])

    const handleToggle = () => {
        setToggleSubPage(true);
        handleToggleComponent(isSubPageOpen);
    }


    return (
        <Main>
            {/**1st row */}
            <MainContainer>
                <Box onClick={handleToggle}>
                    {boxDesign("No Kit", { c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }, "24px", "", BRYNkCustCunt, BRYNkOrdCunt, BRYNkOrdVal)}
                </Box>
                <Box>
                    {boxDesign("Partial Kit", { c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }, "24px", "", secBlockCustCnt, secBlockOrdCnt, secOrderVal)}
                </Box>
                <Box>
                    {boxDesign("Full  Kit", { c1: ColorsMTO.Black, c2: ColorsMTO.Red, c3: ColorsMTO.Yellow }, "24px", "", thrdBlockCustCnt, thrdBlockOrdCnt, thrdOrderVal)}
                </Box>
            </MainContainer>



            <MainContainer>
                {/** 1st Box */}
                <Box>
                    {boxDesign("No Kit", { c1: ColorsMTO.Green, c2: null, c3: null }, "48px", "", frthBlockCustCnt, frthBlockOrdCnt, frthOrderVal)}
                </Box>

                <Box>
                    {boxDesign("Partial Kit", { c1: ColorsMTO.Green, c2: null, c3: null }, "48px", "",
                        fifthBlockCustCnt, fifthBlockOrdCnt, fifthOrderVal)}
                </Box>

                <Box>
                    {boxDesign("Full Kit", { c1: ColorsMTO.Green, c2: null, c3: null }, "48px", "",
                        sxthBlockCustCnt, sxthBlockOrdCnt, sxthdOrderVal)}
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
                <Box>
                    {boxDesign("No Kit", { c1: ColorsMTO.Blue, c2: null, c3: null }, "96px", "7-14 days", svthBlockCustCnt, svthBlockOrdCnt, svthdOrderVal)}
                </Box>
                <Box>
                    {boxDesign("Partial Kit", { c1: ColorsMTO.Blue, c2: null, c3: null }, "96px", "7-14 days", egthBlockCustCnt, egthBlockOrdCnt, egthdOrderVal)}
                </Box>
                <Box>
                    {boxDesign("Full  Kit", { c1: ColorsMTO.Blue, c2: null, c3: null }, "96px", "7-14 days", nthBlockCustCnt, nthBlockOrdCnt, nthhdOrderVal)}
                </Box>
            </MainContainer>

        </Main>
    )
}

export default CurrentCov