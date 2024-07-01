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
} from '../MaterialSOBox/styles';
import { MaterialCoverageString } from '../../../../../VectorFlow/Pages/MTO/Common/String';

interface MaterialSOProps {
    kit: string,
    colors: any,
    height: string,
    text: string,
    orderCount: number,
    cutCount: number,
    orderValue: number,
    percent: number,
}

const MTOMaterialSO = ({ kit, colors, height, text, orderCount, cutCount, orderValue, percent }: MaterialSOProps) => {

    return (
        <>
            <ColorOnLeft color={colors.c1} height={height}>
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
                colors.c2 && <ColorOnLeft color={colors.c2} height={height}>
                </ColorOnLeft>
            }
            {
                colors.c3 && <ColorOnLeft color={colors.c3} height={height}>
                </ColorOnLeft>
            }
            <TextOnBox>
                <ImgDiv>
                    {
                        kit === "No Kit" ?
                            <img src='/assets/img/NoKit2x.png' height='13px' width='15px' alt="Logo" />
                            :
                            kit === "Partial Kit" ?
                                <img src='/assets/img/PartialKit.png' height='7px' width='26px' alt="Logo" />
                                :
                                <img src='/assets/img/FullKit2x.png' height='17px' width='17px' alt="Logo" />
                    }
                </ImgDiv>
                <ImgDiv>
                    {
                        kit === "No Kit" ? "No Kit" : kit === "Partial Kit" ? "Partial Kit" : "Full Kit"
                    }
                </ImgDiv>


            </TextOnBox>


            <PercentBorderContainer>
                <Percentborder>
                    <Percent>{Math.floor(isNaN(percent) ? 0 : percent * 100)}%</Percent>
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
                    title='No of Customers'>
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

export default MTOMaterialSO;