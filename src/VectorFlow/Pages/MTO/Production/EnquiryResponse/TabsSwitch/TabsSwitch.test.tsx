import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import TabSwitch from '.';

// Mock styles imported in TabSwitch
jest.mock('./styles', () => ({
  TabSwitchContainer: 'div',
  TabSwitchHeading: 'h2',
  TabsWrapper: 'div',
  ActiveTab: 'button',
  Tab: 'button',
}));

describe('TabSwitch', () => {
  const tabs = ['Tab 1', 'Tab 2', 'Tab 3', 'Tab 4'];
  const handleTabChangeMock = jest.fn();

  test('renders tabs correctly', () => {
    render(
      <TabSwitch
        heading="Test Tabs"
        tabs={tabs}
        handleTabChange={handleTabChangeMock}
        activeTab={0}
        tabUI={<div>Tab UI Content</div>}
      />
    );

    // Check if heading is rendered
    expect(screen.getByText('Test Tabs')).toBeInTheDocument();

    // Check if all tabs are rendered
    tabs.forEach(tab => {
      expect(screen.getByText(tab)).toBeInTheDocument();
    });

    // Check if the first tab is active
    expect(screen.getByText('Tab 1')).toHaveClass('active-tab');

    // Check if other tabs are not active
    expect(screen.getByText('Tab 2')).not.toHaveClass('active-tab');
    expect(screen.getByText('Tab 3')).not.toHaveClass('active-tab');
  });

  test('handles tab change correctly', () => {
    render(
      <TabSwitch
        heading="Test Tabs"
        tabs={tabs}
        handleTabChange={handleTabChangeMock}
        activeTab={1}
        tabUI={<div>Tab UI Content</div>}
      />
    );

    // Simulate clicking on a tab
    fireEvent.click(screen.getByText('Tab 2'));

    // Check if handleTabChange function is called correctly
    expect(handleTabChangeMock).toHaveBeenCalledWith(1);
  });

  test('renders correctly with single tab', () => {
    render(
      <TabSwitch
        heading="Single Tab"
        tabs={['Only Tab']}
        handleTabChange={handleTabChangeMock}
        activeTab={0}
        tabUI={<div>Tab UI Content</div>}
      />
    );

    // Check if heading is rendered
    expect(screen.getByText('Single Tab')).toBeInTheDocument();

    // Check if the single tab is rendered and active
    expect(screen.getByText('Only Tab')).toHaveClass('active-tab');
  });

  test('renders correctly with no tabs', () => {
    render(
      <TabSwitch
        heading="No Tabs"
        tabs={[]}
        handleTabChange={handleTabChangeMock}
        activeTab={0}
        tabUI={<div>Tab UI Content</div>}
      />
    );

    // Check if heading is rendered
    expect(screen.getByText('No Tabs')).toBeInTheDocument();

    // Check if no tabs are rendered
    expect(screen.queryByText('Tab 1')).toBeNull();
    expect(screen.queryByText('Tab 2')).toBeNull();
    expect(screen.queryByText('Tab 3')).toBeNull();
  });
});
