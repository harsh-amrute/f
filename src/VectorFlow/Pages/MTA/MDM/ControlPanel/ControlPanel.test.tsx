import { render, fireEvent, screen,waitFor} from '@testing-library/react';

import ControlPanel from './index';
import {QueryClientProvider} from '@tanstack/react-query';
import { setupReactQuery } from '../../../../../config/react-query-config';
import { BrowserRouter as Router } from 'react-router-dom'
import { UserDataContext } from '../../../../../context';





const queryClient = setupReactQuery()
describe('Control Component', () => {

    it('renders the view modify component when loading', async () => {

        render(
            <QueryClientProvider client={queryClient}>
                <Router>
                    <UserDataContext.Provider value={{user:{user:{theme_ui:'NOIRFUSION'}},changeColorTheme:(color) => {return color}}}>
                        <ControlPanel/>
                    </UserDataContext.Provider>
                </Router>
            </QueryClientProvider>
        );

        let viewModifyCard = screen.getAllByTestId('icon-card')[0];
        expect(viewModifyCard).toBeInTheDocument();
        fireEvent.click(viewModifyCard);
        expect(global.window.location.pathname).toContain('/master-data-management/view-modify');
        fireEvent.click(screen.getAllByTestId('icon-card')[1]);
        fireEvent.click(screen.getAllByTestId('icon-card')[2]);

        let buttonCard = screen.getAllByTestId('button-card');
        fireEvent.click(buttonCard[0]);
        fireEvent.click(buttonCard[1]);
        fireEvent.click(buttonCard[2]);
    
      });

    });