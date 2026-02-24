import { CustomCellRendererProps } from '@ag-grid-community/react';
import { render, fireEvent, screen } from '@testing-library/react';
import CustomGroupCellRenderer from './CustomGroupCellRenderer';

describe('Custom Group Cell Renderer', () => {
    test("Custom Group Cell Renderer Case 1", () => {
        const data = {
            node: {
                expanded: false,
                addEventListener(eventType:any, listener:any) {
                    console.log(eventType)
                    listener({ node: { expanded: true } })
                },
                removeEventListener(eventType:any, listener:any) {
                    console.log(eventType)
                    listener({ node: { expanded: true } })
                },
                setExpanded(expanded:any, sourceEvent?:any, forceSync?:any) {
                    console.log(sourceEvent)
                    console.log(forceSync)
                    this.expanded = expanded
                },
            }as any,
            value: "1"
        } as CustomCellRendererProps
        render(<CustomGroupCellRenderer {...data} />)
        const btn = screen.getByTestId("collapsable")
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
    })
    test("Custom Group Cell Renderer Case 2", () => {
        const data = {
            node: {
                expanded: true,
                addEventListener(eventType:any, listener:any) {
                    console.log(eventType)
                    listener({ node: { expanded: false } })
                },
                removeEventListener(eventType:any, listener:any) {
                    console.log(eventType)
                    listener({ node: { expanded: false } })
                },
                setExpanded(expanded:any, sourceEvent?:any, forceSync?:any) {
                    console.log(sourceEvent, forceSync)
                    this.expanded = expanded
                },
            }as any,
            value: "1"
        } as CustomCellRendererProps
        render(<CustomGroupCellRenderer {...data} />)
        const btn = screen.getByTestId("collapsable")
        expect(btn).toBeInTheDocument();
        fireEvent.click(btn);
    })
});
