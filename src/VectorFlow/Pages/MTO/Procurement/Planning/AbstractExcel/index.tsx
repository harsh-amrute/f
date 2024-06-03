import { ProcessRowGroupForExportParams, ExcelCell, ExcelRow } from 'ag-grid-community';

const cell: (text: string, styleId?: string) => ExcelCell = (
    text: string,
    styleId?: string,
) => {
    return {
        styleId: styleId,
        data: {
            type: /^\d+$/.test(text) ? "Number" : "String",
            value: String(text),
        },
    };
};

export const getRows = (params: ProcessRowGroupForExportParams) => {
    const mainHeaderRow: ExcelRow = {
        outlineLevel: 1,
        cells: [],
    };

    // Get column keys dynamically from the first row of data
    const columnKeys = Object.keys(params.node.data.children[0]);

    // Populate main header row with column names
    columnKeys.forEach(key => {
        mainHeaderRow.cells.push(cell(key, "header"));
    });

    // Child rows
    const childRows: ExcelRow[] = params.node.data.children.map((record: any) => {
        const childRow: ExcelRow = {
            outlineLevel: 1,
            cells: [],
        };

        // Populate child row with data
        columnKeys.forEach(key => {
            childRow.cells.push(cell(record[key], "body"));
        });

        return childRow;
    });

    // Concatenate main header row with child rows
    const rows: ExcelRow[] = [mainHeaderRow, ...childRows];

    return rows;
};
