import { ReactElement } from 'react';
import './style.css';

interface INoteProps {
    type: string;
    message:  ReactElement<any, any>;
}

const Note = (props: INoteProps) => {

    const { type, message } = props;
    return ( 
        <>
            <div className="note-wrapper">
                <div className="logo-wrapper">{type === 'danger' && 'danger-logo'}</div>
                {message}
            </div>
        </>
    )
}

export default Note;
