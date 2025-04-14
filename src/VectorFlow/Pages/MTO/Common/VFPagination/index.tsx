import { useEffect, useState } from 'react';
import { useUserData } from '../../../../../context';
import { PaginationWrapper, StatusBarLabel, StatusBarLabelLight, StatusBarLabelBold, PaginationContainer, PaginationArrowIcon,StatusBarWrapper, TextBtn,GridFilterWrapper, CustomPageSize, PageSizeInputDiv, PageSizeInput, PageSizeSaveDiv } from "./styles"
import { notifyError } from '../../../../../helpers/notify';
import VFButton from '../../../../../components/VectorFLOW/commons/VFButton';

export interface VFPaginationProps {
    selectedRows: number
    totalRows: number
    currentPage: number
    rowsPerPage: number
    handleChangePage: (e: any) => void
    handleChangePerPage?: (e: any) => void
    showTotalItems?: boolean,
    showPagination?: boolean,
    resetGridRef?: any,
    isDisabled?: boolean | undefined,
    customPageSizeEnabled?: boolean | undefined,
    savePageSize?: (e: any) => void,
    userPageSize?:any
}

 
const VFPagination = (props: VFPaginationProps) => {

    const {
        totalRows,
        currentPage,
        rowsPerPage,
        handleChangePage,
        resetGridRef,
        isDisabled,
        customPageSizeEnabled,
        savePageSize,
        userPageSize
    } = props
    
    const { user } = useUserData();
    const themeUi = user?.user?.theme_ui;
    const [customPageSize, setCustomPageSize] = useState();
    const minPageSize = 1, maxPageSize = 10000;

    useEffect(() => {
        setCustomPageSize(userPageSize);
    },[userPageSize])

    const handleChange = (e: any) => {
        const inputValue = e.target.value;
        setCustomPageSize(inputValue);
    };

    const validatePageSize = () => {
        if (customPageSize) {
            if (customPageSize < minPageSize) {
                notifyError("Page size can not be less than " + minPageSize);
            } else if (customPageSize > maxPageSize) {
                notifyError("Page size can not exceed " + maxPageSize);
            } else {
                savePageSize && savePageSize(customPageSize);
            }
        } else {
            notifyError("Invalide page size");
        }
    };

    const defaultPaginationLimit = 100;
    const totalPages = Math.ceil(totalRows / (props.rowsPerPage || defaultPaginationLimit));

    // const totalPages = Math.ceil(totalRows/rowsPerPage)

    const clearGridFilter = () =>{
        resetGridRef?.current?.api.setFilterModel(null)
    }

    const getTotalItemsString = () => {
        if (totalRows <= rowsPerPage) return `1 to ${totalRows}`;
        if (currentPage === 1) return `1 to ${rowsPerPage}`;
        const start = (currentPage * rowsPerPage) - rowsPerPage + 1;
        const end = (currentPage) * rowsPerPage;
        // console.debug(end,totalRows)
        if (end >= totalRows) return `${start} to ${totalRows}`;
        return `${start} to ${(currentPage) * rowsPerPage}`;
    }

    const handleOnClick = (newPage: number) => {
        if (newPage === currentPage) return
        if (newPage > totalPages) return
        if (newPage < 1) return
        return handleChangePage(newPage)
    }

    return (
        <PaginationWrapper data-testid="vf_pagination">
            <PaginationContainer>
            <GridFilterWrapper>
                <TextBtn onClick={clearGridFilter} disabled={isDisabled} themeUi={themeUi}>Clear All Grid Filters</TextBtn>  
            </GridFilterWrapper>
               <StatusBarWrapper>
                    {customPageSizeEnabled && <CustomPageSize>
                        Page Size:
                        <PageSizeInputDiv>
                            <PageSizeInput
                                className="no-arrows"
                                type="number"
                                themeUi={themeUi}
                                value={customPageSize}
                                onChange={handleChange}
                            />
                            <VFButton
                                onClick={() => validatePageSize()}
                                themeUi={themeUi}
                                disabled={false}
                                style={{
                                    // cursor: isSaveButtonEnabled ? "pointer" : "not-allowed",
                                    height: "100%",
                                    width: "30%",
                                    borderRadius: "0px 3px 3px 0px",
                                    boxShadow: "none"
                                    // opacity: isSaveButtonEnabled ? 1 : 0.5, // Visual cue for disabled
                                    // pointerEvents: isSaveButtonEnabled ? "auto" : "none", // Prevent click when disabled
                                }}
                            >
                                <img
                                    src="/assets/img/rightArrowHorizontal.svg"
                                    height={13}
                                    width={7}
                                />    
                            </VFButton>
                        </PageSizeInputDiv>
                    </CustomPageSize>
                    }
                <StatusBarLabel>
                    <StatusBarLabelBold>
                        {getTotalItemsString()}
                    </StatusBarLabelBold>
                    <StatusBarLabelLight>
                        of
                    </StatusBarLabelLight>
                    <StatusBarLabelBold>
                        {totalRows}
                    </StatusBarLabelBold>
                    </StatusBarLabel>
                    <StatusBarLabel style={{ marginLeft: '10px'}}>
                        <PaginationArrowIcon
                            disabled={currentPage === 1}
                            src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
                            style={{ transform: 'rotate(180deg)' }}
                            onClick={() => handleOnClick(1)}
                            alt="pagination-last-prev-arrow"
                        />
                        <PaginationArrowIcon
                            disabled={currentPage === 1}
                            src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
                            style={{ transform: 'rotate(180deg)' }}
                            onClick={() => handleOnClick(currentPage - 1)}
                            alt="pagination-prev-arrow"
                        />
                        <StatusBarLabelLight>
                            Page
                        </StatusBarLabelLight>
                        <StatusBarLabelBold>
                            {currentPage}
                        </StatusBarLabelBold>
                        <StatusBarLabelLight>
                            of
                        </StatusBarLabelLight>
                        <StatusBarLabelBold>
                            {totalPages}
                        </StatusBarLabelBold>
                        <PaginationArrowIcon
                            disabled={currentPage === totalPages}
                            src="/assets/img/VectorFLOW/NMS/pagination-arrow.svg"
                            onClick={() => handleOnClick(currentPage + 1)}
                            alt="pagination-next-arrow"
                        />
                        <PaginationArrowIcon
                            disabled={currentPage === totalPages}
                            src="/assets/img/VectorFLOW/NMS/pagination-last-arrow.svg"
                            onClick={() => handleOnClick(totalPages)}
                            alt="pagination-last-next-arrow"
                        />
                    </StatusBarLabel>
                </StatusBarWrapper>

            </PaginationContainer>
        </PaginationWrapper>
    )
}

export default VFPagination