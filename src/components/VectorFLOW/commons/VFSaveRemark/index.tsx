import React from 'react';
import { SaveRemarkWrapper } from "./styles";
import VFButtonOutline from '../VFButtonOutline';

interface VFSaveRemarkProps {
    onSubmitRemarks: () => void;
    themeUi: string;
}

const VFSaveRemark = (props: VFSaveRemarkProps) => {
    const {
        onSubmitRemarks,
        themeUi
    } = props;

    return (
        <SaveRemarkWrapper style={{ margin: '1rem 0', padding: 0 }}>
            <VFButtonOutline 
                style={{ height: '30px', width: '159px', borderRadius: '4px', fontSize: '14px', fontWeight: '400', cursor: 'pointer' }} 
                themeUi={themeUi} 
                onClick={onSubmitRemarks}
            >
                Save Remark
            </VFButtonOutline>
        </SaveRemarkWrapper>
    );
};

export default VFSaveRemark;
