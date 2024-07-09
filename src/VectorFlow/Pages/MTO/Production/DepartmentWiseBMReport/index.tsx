import React from 'react';
import {
    BMDepWrapper,
    BMDepHeaderWraper
} from './styles'

const DptWiseBMReport = () => {
    return (
        <BMDepWrapper>
            <BMDepHeaderWraper>
                
                <input type="checkbox" id="checkbox" name="checkbox"/>
                <span>Show order with available WIP Only</span>
            </BMDepHeaderWraper>

        </BMDepWrapper>
    )
}

export default DptWiseBMReport;