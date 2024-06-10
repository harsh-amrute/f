import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import ChildrenProcPlanningCellRenderer from '../ChildrenProcPlanningCellRenderer';
import GetProcHeaderChildren from './GetProcHeaderChildren.json';
import { mapProcPlanningChildrenFieldsToColDefs } from '../../../../../helpers/utils';
//import { waitFor } from '@testing-library/dom';
import '@testing-library/jest-dom/extend-expect';

// Mocking the VFTable component
jest.mock('../../../../../components/VectorFLOW/commons/VFTable', () => (props: any) => (
    <div data-testid="VFTable" {...props} />
));

// Mocking the ChildrenColor component
jest.mock('../../Common/ChildrenColor/ChildrenColor', () => () => <div>ChildrenColor</div>);

describe('ChildrenProcPlanningCellRenderer', () => {
    const params = {
        data: {
            children: [
                { id: 1, name: 'Child 1' },
                { id: 2, name: 'Child 2' }
            ]
        },
        pagination: true,
        masterDetail: true,
        rowSelection: "multiple",
        suppressRowClickSelection: true,
        enableRangeSelection: true,
        paginationAutoPageSize: true,
        alwaysShowVerticalScroll: true,
        statusBar: {
            statusPanels: [
                { statusPanel: 'agTotalRowCountComponent', align: 'left' },
                { statusPanel: 'customStatusPanel', align: 'right' }
            ]
        }
    };

    it('renders without crashing', () => {
        render(<ChildrenProcPlanningCellRenderer params={params} />);
        expect(screen.getByTestId('VFTable')).toBeInTheDocument();
    });

    it('passes correct props to VFTable', async () => {
        // Render the component
        render(<ChildrenProcPlanningCellRenderer params={params} />);

        // Wait for VFTable to be rendered
        await waitFor(() => {
            const VFTable = screen.getByTestId('VFTable');
            expect(VFTable).toHaveClass('child-grid');
            expect(VFTable).toHaveAttribute('height', '300');
            expect(VFTable).toHaveAttribute('defaultColDef');


        });
    });
});
