import { format } from "date-fns";
import { ETACellRendererWrapper, ETACellValue } from "./styles.css";

const ETACellRenderer = (params: any) => {
  const date = new Date(params.value);

  const formattedDate = format(date, "P");

  return (
    <div className={ETACellRendererWrapper}>
      <p className={ETACellValue}>{formattedDate}</p>
    </div>
  );
};

export default ETACellRenderer;
