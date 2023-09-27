import {render} from '@testing-library/react'
import VFMasterFieldSearch from './VFMasterFieldSearch'
import { UserDataContext } from '../../../../context';

const dummyFunction = jest.fn()

describe('VFMasterFieldSearch',()=>{
    it('Renders on the document',()=>{
        const {getByTestId} = render(<UserDataContext.Provider value={{user:{user:{theme_ui:'REGALBLAZE'}},changeColorTheme:(color) => {return color}}}><VFMasterFieldSearch value={[]} setValue={dummyFunction} options={[]} placeholder='Search' maxToShow={3} backgroundColor='white' handleListChild={dummyFunction}/></UserDataContext.Provider>)
        expect(getByTestId('search-wrapper')).toBeInTheDocument()
    })
})