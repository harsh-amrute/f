import { ReactElement } from "react";
import { LogoWrapper, NoteWrapper } from "./styles.css";

interface INoteProps {
  type: string;
  message: ReactElement<any, any>;
}

const Note = (props: INoteProps) => {
  const { type, message } = props;
  return (
    <>
      <div className={NoteWrapper} data-testid="note">
        <div className={LogoWrapper}>
          {type === "danger" && (
            <img src="/assets/img/warning-icon.svg" alt="warning-icon" />
          )}
        </div>
        {message}
      </div>
    </>
  );
};

export default Note;
