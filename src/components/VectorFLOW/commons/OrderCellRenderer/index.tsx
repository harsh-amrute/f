import { orderCellRendererWrapper } from "./styles.css";

export const OrderCellRenderer = () => {
  return (
    <div className={orderCellRendererWrapper}>
      <img
        src="/assets/img/VectorFLOW/NMS/add-circle.svg"
        height={28}
        width={28}
        data-testid="graph-icon"
        alt="add"
      />
    </div>
  );
};
