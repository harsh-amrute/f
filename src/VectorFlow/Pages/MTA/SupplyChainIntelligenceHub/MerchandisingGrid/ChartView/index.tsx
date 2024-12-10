import { CSSProperties } from "react"
import { GridHealthType, TableLabelProps, TableLabelStatus } from "../../../../../types/MCGrid"
import Store from "./Store"
import StoreGroup from "./StoreGroup"
import { ViewBottombar, ViewContainer, ViewGridWrapper, ViewSidebar, ViewTableLabelCell, ViewTableLabelCellWrapper, ViewTopbar, ViewWrapper } from "./styles"

const TableLabel = (props: TableLabelProps & { setStatus: (status: TableLabelStatus) => void }) => {
    const getStyles = (status: TableLabelStatus): CSSProperties => {
        switch (status) {
            case "surplus":
                return {
                    color: '#585757',
                    backgroundColor: '#EBE5E5'
                }
            case "complete":
                return {
                    color: '#306A0F',
                    backgroundColor: '#AEE293'
                }
            case "incomplete":
                return {
                    color: '#816F08',
                    backgroundColor: '#F5E58A'
                }
            case "very-incomplete":
                return {
                    color: '#C61C1C',
                    backgroundColor: '#FFD0D0'
                }
            case "high":
                return {
                    color: '#306A0F',
                    backgroundColor: '#AEE293'
                }
            case "medium":
                return {
                    color: '#816F08',
                    backgroundColor: '#F5E58A'
                }
            case "low":
                return {
                    color: '#C61C1C',
                    backgroundColor: '#FFD0D0'
                }
            default:
                return {
                    color: '#585757',
                    backgroundColor: '#EBE5E5'
                }
        }
    }

    return (
        <ViewTableLabelCellWrapper onClick={() =>{console.log("Setting status to", props.status); props.setStatus(props.status)}}>
            <ViewTableLabelCell style={{ ...getStyles(props.status) }}>
                {props.text}
            </ViewTableLabelCell>
        </ViewTableLabelCellWrapper>
    )
}

const ChartView = (props: { data: GridHealthType, setStatus: (status: TableLabelStatus) => void }) => {
    const { data, setStatus } = props
    return (
        <ViewWrapper>
            <ViewContainer>
                <ViewTopbar>
                    <h1>Health of Grid</h1>
                </ViewTopbar>
                <ViewSidebar>
                    <TableLabel status="surplus" text="Surplus" setStatus={setStatus} />
                    <TableLabel status="complete" text="Complete" setStatus={setStatus} />
                    <TableLabel status="incomplete" text="Incomplete" setStatus={setStatus} />
                    <TableLabel status="very-incomplete" text="Very Incomplete" setStatus={setStatus} />
                </ViewSidebar>
                <ViewBottombar>
                    <TableLabel status="low" text="Low ITR" setStatus={setStatus} />
                    <TableLabel status="medium" text="Medium ITR" setStatus={setStatus} />
                    <TableLabel status="high" text="High ITR" setStatus={setStatus} />
                </ViewBottombar>
                <ViewGridWrapper>
                    <Store data={data.surplus.low} type="floating" status="surplus" setStatus={setStatus} />
                    <Store data={data.surplus.medium} type="floating" status="surplus" setStatus={setStatus} />
                    <Store data={data.surplus.high} type="default" status="surplus" setStatus={setStatus}/>

                    <Store data={data.complete.low} type="default" status="complete" setStatus={setStatus} />
                    <Store data={data.complete.medium} type="default" status="complete"  setStatus={setStatus}/>
                    <Store data={data.complete.high} type="default" status="complete"setStatus={setStatus} />

                    <StoreGroup data={data.incomplete.low} status="incomplete"  setStatus={setStatus}/>
                    <StoreGroup data={data.incomplete.medium} status="incomplete"  setStatus={setStatus}/>
                    <StoreGroup data={data.incomplete.high} status="incomplete"  setStatus={setStatus}/>
                    <StoreGroup data={data["very-incomplete"].low} status="very-incomplete"  setStatus={setStatus}/>
                    <StoreGroup data={data["very-incomplete"].medium} status="very-incomplete"  setStatus={setStatus}/>
                    <StoreGroup data={data["very-incomplete"].high} status="very-incomplete"  setStatus={setStatus}/>
                </ViewGridWrapper>
            </ViewContainer>
        </ViewWrapper>
    )
}

export default ChartView
