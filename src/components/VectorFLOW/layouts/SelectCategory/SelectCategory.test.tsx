import { screen,render,fireEvent } from "@testing-library/react";
import SelectCategory from ".";

const dummyprops = {
    childMonitorCount:100,
    parentMonitorCount:100,
    childExpediteCount:100,
    parentExpediteCount:100,
    reviewExcessInventoryCount:100,
    reviewOrderFulfillmentCount:100,
    onMonitorParentClick:jest.fn(),
    onMonitorChildClick:jest.fn(),
    onExpediteParentClick:jest.fn(),
    onExpediteChildClick:jest.fn(),
    onExcessInventoryReviewClick:jest.fn(),
    onOrderFulfillmentReviewClick:jest.fn(),
}

describe ("SelectCategory Component", () => {
    it("renders the Select Category component", () => {
        render (<SelectCategory{...dummyprops}></SelectCategory>)
        const btn = screen.getAllByText('From Parent')[0];
        fireEvent.click(btn);
        expect(btn).toBeInTheDocument();

        const count=screen.getAllByText('100')[0];
        expect(count).toBeInTheDocument();

    })

})