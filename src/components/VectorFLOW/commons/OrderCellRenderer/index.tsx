
import { OrderCellRendererWrapper, OrderColorCellRendererWrapper } from "./styles";

export const OrderCellRenderer = (params: any) => {
    return (
        <OrderCellRendererWrapper>
            <img
                src="/assets/img/VectorFLOW/NMS/add-circle.svg"
                height={28}
                width={28}
                data-testid="graph-icon"
            />
        </OrderCellRendererWrapper>
    )
}




