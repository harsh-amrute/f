import React from 'react'
import VFTable from '../../../../../components/VectorFLOW/commons/VFTable';
import MTOActionToolBar from '../../../../../components/VectorFLOW/commons/MTO/ActionToolBar/MTOActionToolBar';
import { SaveBtnWrapper, SaveBtn } from './styles'

const ReasonForDelayOrder = () => {
    return (
        <div style={{ zoom: 1.2 }}>
            <MTOActionToolBar
                isWIPCheckBox
                isAddFilterButton
                isExcelExport
            />
            <VFTable
                height='750px'
            />
            <SaveBtnWrapper>
                <SaveBtn>
                    Save Reasons
                </SaveBtn>
            </SaveBtnWrapper>

        </div>
    )
}

export default ReasonForDelayOrder;