
import { MaterialCoverageString } from '../../Common/String';
import {
    PercentBorderContainer,
    Percentborder,
    Percent,
    BtnGroup,
    Btns,
    ViewOrder,
    TextOnBox,
    ColorOnLeft,
    Separator,
    ButtonImg,
    TextOnColor,
    ImgDiv,
} from '../MaterialCoverage/styles';
import { openSOSummary } from './Data';

export const boxDesign = (kitStatus: string, { c1, c2, c3 }: any, height: string, text: string, orderCount: number, cutCount: number, orderValue: number) => {
    return (
        <>
            <ColorOnLeft color={c1} height={height}>
                <TextOnColor style={{
                    position: 'absolute',
                    left: '50%',
                    top: '50%',
                    transform: 'translate(-50%, -50%) rotate(-90deg)',
                    width: '100%',
                }}>
                    {text}
                </TextOnColor>
            </ColorOnLeft>
            {
                c2 && <ColorOnLeft color={c2} height={height}>
                </ColorOnLeft>
            }
            {
                c3 && <ColorOnLeft color={c3} height={height}>
                </ColorOnLeft>
            }
            <TextOnBox>
                <ImgDiv>
                    {
                        kitStatus === "No Kit" ?
                            <img src='/assets/img/NoKit2x.png' height='13px' width='15px' alt="Logo" />
                            :
                            kitStatus === "Partial Kit" ?
                                <img src='/assets/img/PartialKit.png' height='7px' width='26px' alt="Logo" />
                                :
                                <img src='/assets/img/FullKit2x.png' height='17px' width='17px' alt="Logo" />
                    }
                </ImgDiv>
                <ImgDiv>
                    {
                        kitStatus === "No Kit" ? "No Kit" : kitStatus === "Partial Kit" ? "Partial Kit" : "Full Kit"
                    }
                </ImgDiv>


            </TextOnBox>


            <PercentBorderContainer>
                <Percentborder>
                    <Percent>98%</Percent>
                </Percentborder>
            </PercentBorderContainer>

            <ViewOrder

            >
                {MaterialCoverageString.viewAllRecords}
            </ViewOrder>


            <BtnGroup>
                <Btns
                    title='Order Count'>
                    <ButtonImg
                        src='/assets/img/order-tracking.png'
                        height='20px' width='20px'
                    >
                    </ButtonImg>
                    {orderCount}
                </Btns>
                <Separator color={'grey'} ></Separator>
                <Btns
                    title='No of Customer'>
                    <ButtonImg
                        src='/assets/img/people.png'
                        height='20px' width='20px'
                    >
                    </ButtonImg>
                    {cutCount}
                </Btns>
                <Separator color={'grey'} ></Separator>
                <Btns title='Order Value'>
                    <ButtonImg
                        src='/assets/img/rupee.png'
                        height='20px' width='20px'
                    >
                    </ButtonImg>
                    {orderValue}
                </Btns>
            </BtnGroup>
        </>
    )
}

export const mapOrderDetails = (c1: string, c2: string, c3: string, kit: string, buc: number) => {
    let obj = {};
    let totalOrdCount = 0;
    let custCount = 0;
    let orderValue = 0;
    openSOSummary.map((data) => {
        if ((data.color == c1 || data.color == c2 || data.color == c3) && data.kit == kit && data.bucket == buc) {
            totalOrdCount += Number(data.ordCount)
            custCount += Number(data.custCount)
            orderValue += Number(data.ordValue)
        }
    })
    obj = {
        totalCunt: totalOrdCount,
        cusCunt: custCount,
        ordCunt: orderValue
    }
    return obj;
}