
import { ICellRendererParams } from "ag-grid-enterprise"
import { BTRCategoryMapper } from "../../../../../helpers/BPRConstants"

import { CategoryCellRendererWrapper, CategoryCellRendererChip } from './styles'

const CategoryCellRenderer = (props: ICellRendererParams) => {
    const categoryStringArray = props.data.category.split(",")
    return (
        <CategoryCellRendererWrapper>
            {categoryStringArray.map((c: string) => {
                const categoryData = BTRCategoryMapper[c]
                if (categoryData) {
                    if (c === "5") {
                        return <CategoryCellRendererChip style={{ background: categoryData.bgColor, color: categoryData.color }}>{categoryData.cellLabel}</CategoryCellRendererChip>
                    }
                    return <CategoryCellRendererChip style={{ backgroundColor: categoryData.bgColor, color: categoryData.color }}>{categoryData.cellLabel}</CategoryCellRendererChip>
                }
            })}
        </CategoryCellRendererWrapper>
    )
}

export default CategoryCellRenderer