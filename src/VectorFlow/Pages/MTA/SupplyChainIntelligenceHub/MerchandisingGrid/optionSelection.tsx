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
    //     <div style={{zoom:'0.7'}}>
    //     <Select 
    //     options={Options} 
    //     placeholder={"Select Options"} 
    //     onChange={()=>console.log('')}
    //     styles={{
    //       option: (baseStyles, { isSelected }) => ({
    //         ...baseStyles,
    //         backgroundColor: isSelected ? themeUi === "REGALBLAZE" ? "#FCA311" : "#BC3D80" : "white", 
    //         "&:hover": {
    //           backgroundColor: themeUi === "REGALBLAZE" ? "rgb(252, 163, 17,0.3)" : '#bc3d814d',
    //           color: "black",
    //           width:'180px',


    //         },
    //         zIndex: 1001,
    //         // zoom:0.8,
    //         width:'180px',

    //       }),
    //       control: (baseStyles, { isFocused }) => ({
    //         ...baseStyles, 
    //         borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
    //         width: '180px',
    //         // width:'100px',
    //         height: 'auto', // Change height to auto to ensure it doesn't overlap with the grid
    //         border: "none",
    //         zIndex: 1001, // Add this to ensure the control is on top of the grid
    //         position: 'absolute',
    //         boxShadow: 'none',
    //         "&:hover":{
    //           borderColor: isFocused ? "none" : "hsl(0, 0%, 80%);",
    //         }
    //       }),
    //       menu: (baseStyles) => ({ // Add this to ensure the menu is on top of the grid
    //         ...baseStyles,
    //         zIndex: 1001,
    //         position:'absolute',
    //         width:'180px',
    //       }),
    //     }}
        
    //     />
    //   </div>
    



    <select style={{height:'100%', width:'100%'}} className="custom-select" placeholder='Select Option' 
    onChange={e => console.log(e)}>
       {['option 1','option 2','option 3'].map(make => ( 
         <option key={make} value={make} style={{backgroundColor: 'red', color: 'black', cursor: 'default'}} 
           onMouseEnter={(e) => console.log(e)} 
           onClick={(e) => console.log(e)}
           onMouseLeave={(e) => (e.target as HTMLElement).style.backgroundColor = 'white'}> 
           {make} 
         </option> 
       ))}
  </select>
  
    )
}

export default OptionSelection