import { render } from "@testing-library/react"
import BPRDailyAnalytics from "."

const dummyProps = {
    colDefs:[
        {
          headerName:'',
          colId:'color'
        },
        {
          headerName:'Tech.'
        },
        {
          headerName:''
        },
        {
          headerName:'Eco.'
        },
        {
          headerName:''
        }
    ],
    rowData:[{"color":"Black","techCount":2345,"techChange":34,"ecoCount":3856,"ecoChange":-6},{"color":"Red","techCount":345,"techChange":23,"ecoCount":349,"ecoChange":-12},{"color":"Yellow","techCount":23,"techChange":-21,"ecoCount":123,"ecoChange":28},{"color":"Green","techCount":657,"techChange":-2,"ecoCount":453,"ecoChange":2},{"color":"Blue","techCount":345,"techChange":0,"ecoCount":1234,"ecoChange":-43},{"color":"White","techCount":2345,"techChange":12,"ecoCount":45,"ecoChange":0}]
}

describe("BPRDailyAnalytics",()=>{
    it("Renders the components with all types of data",()=>{
        render(<BPRDailyAnalytics {...dummyProps}/>)
    })
})