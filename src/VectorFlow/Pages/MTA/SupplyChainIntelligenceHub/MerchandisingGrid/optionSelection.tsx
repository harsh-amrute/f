import Select from 'react-select'
import './styles.css'

    const Options = [
        {label:'Option 1',value:'option1'},
        {label:'Option 2',value:'option2'},
    ]


    interface optionSelectionProps {
        themeUi:string,
    }       
    const OptionSelection = ({themeUi}:optionSelectionProps) =>{
    return(
    //     <Select options={Options} placeholder={"Select Options"} onChange={()=>console.log('')}
    // styles={{        
    //    option: (baseStyles, { isSelected }) => ({
    //       ...baseStyles,
    //       backgroundColor: isSelected ?themeUi==="REGALBLAZE"?"#FCA311": "#BC3D80" : "white", 
    //       "&:hover": {
    //             backgroundColor:themeUi==="REGALBLAZE"?"rgb(252, 163, 17,0.3) ": '#bc3d814d',
    //             color:"black",
    //       }
    //    }),
    //    control: (baseStyles, { isFocused }) => (
    //       {
    //          ...baseStyles, 
    //          borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",
    //          width: '180px',
    //          height:'5px',
    //          border: "none",
    //         //  zIndex:1000,
    //          // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
    //          boxShadow: 'none',
    //          "&:hover":{
    //             borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",
    //          }
    //       }),
    // }}
    // />

//     <select style={{ height: '100%', width: '100%' }} onChange={e => console.log(e)}>
//     {['option1', 'option2'].map(make => (
//       <label>
//         <option key={make} value={make}>
//           {make}
//         </option>
//       </label>
//     ))}
//   </select>

  <select style={{height:'100%', width:'100%'}} className="custom-select"
  onChange={e => console.log(e)}>
     {['option 1','option 2'].map(make => ( <option key={make} value={make} className="custom-option" > 
     {make} </option> ))}
      </select>
    )
}

export default OptionSelection