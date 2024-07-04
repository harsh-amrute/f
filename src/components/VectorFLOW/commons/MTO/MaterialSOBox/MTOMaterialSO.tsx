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
    ColoronLeftWrapper
} from '../MaterialSOBox/styles';
import { MaterialCoverageString } from '../../../../../VectorFlow/Pages/MTO/Common/String';
import Tooltip from '../../../../../components/VectorFLOW/commons/MTO/Tooltip';

interface MaterialSOProps {
    kit: string,
    colors: any,
    height: string,
    text: string,
    orderCount: number,
    cutCount: number,
    orderValue: number,
    percent: number,
    ToolTipdata?: any,
}

const MTOMaterialSO = ({ kit, colors, height, text, orderCount, cutCount, orderValue, percent, ToolTipdata }: MaterialSOProps) => {

    const getToolTipContent = (col: string) => {
        return (
            <table style={{ padding: "0px 10px 0px 10px", display: "table", width: '100%' }}>
                <tbody>
                    {col == 'Red' || col == 'Green' ?
                        <>
                            <tr>
                                <td>
                                    {col == 'Red' ? 'Black' : 'Green'}
                                </td>
                                <td>
                                    {isNaN(ToolTipdata.p1) ? 0 : ToolTipdata.p1}%/{ToolTipdata?.c1}
                                </td>
                            </tr>
                        </>
                        : null

                    }
                    {col == 'Red' || col == 'Blue' ?
                        <>
                            <tr>
                                <td>
                                    {col == 'Red' ? 'Red' : 'White'}
                                </td>
                                <td>
                                    {isNaN(ToolTipdata.p2) ? 0 : ToolTipdata.p2}%/{ToolTipdata?.c2}
                                </td>
                            </tr>
                            <tr>
                                <td>
                                    {col == 'Red' ? 'Yellow' : 'Blue'}
                                </td>
                                <td>
                                    {isNaN(ToolTipdata.p3) ? 0 : ToolTipdata.p3}%/{ToolTipdata?.c3}
                                </td>
                            </tr>
                        </>
                        : null
                    }

                </tbody>

            </table>
        )
    }

    return (
        <>
            {
                colors.c1 == '#000' || colors.c2 == '#E53F40' || colors.c3 == '#EBBF2B' ?
                    <Tooltip content={getToolTipContent('Red')}>
                        <ColoronLeftWrapper>
                            <ColorOnLeft
                                color={colors.c1} height={height}>
                            </ColorOnLeft>
                            <ColorOnLeft
                                color={colors.c2} height={height}>
                            </ColorOnLeft>
                            <ColorOnLeft
                                color={colors.c3} height={height}>
                            </ColorOnLeft>
                        </ColoronLeftWrapper>
                    </Tooltip>
                    :
                    colors.c1 == '#418D18' ?
                        <Tooltip content={getToolTipContent('Green')}>
                            <ColoronLeftWrapper>
                                <ColorOnLeft
                                    color={colors.c1} height={height}>
                                </ColorOnLeft>
                            </ColoronLeftWrapper>

                        </Tooltip>
                        :
                        <Tooltip content={getToolTipContent('Blue')}>
                            <ColorOnLeft
                                color={colors.c1} height={height}>
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
                        </Tooltip>
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
                    <Percent>{Math.round(isNaN(percent) ? 0 : percent * 100)}%</Percent>
                </Percentborder>
            </PercentBorderContainer>

            <ViewOrder

            >
                {MaterialCoverageString.viewAllRecords}
            </ViewOrder>


            <BtnGroup>
                <Btns>
                    <Tooltip content={<div style={{ padding: "10px 5px 10px 5px" }}>Order Count</div>}>
                        <ButtonImg
                            src='/assets/img/order-tracking.png'
                            height='20px' width='20px'
                        />
                    </Tooltip>
                    {orderCount}
                </Btns>

                <Separator color={'grey'} ></Separator>
                <Btns>
                    <Tooltip content={<div style={{ padding: "10px 5px 10px 5px" }}>No of Customer</div>}>
                        <ButtonImg
                            src='/assets/img/people.png'
                            height='20px' width='20px'
                        >
                        </ButtonImg>
                    </Tooltip>
                    {cutCount}
                </Btns>

                <Separator color={'grey'} ></Separator>

                <Btns>
                    <Tooltip content={<div style={{ padding: "10px 5px 10px 5px" }}>Order Value</div>}>
                        <ButtonImg
                            src='/assets/img/rupee.png'
                            height='20px' width='20px'
                        >
                        </ButtonImg>
                    </Tooltip>
                    {orderValue}
                </Btns>
            </BtnGroup>
        </>
    )
}

export default MTOMaterialSO;