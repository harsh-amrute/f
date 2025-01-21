import styled from "styled-components";
import { useUserData } from '../../../../../context'
import { useEffect} from "react";



const FormContainer = styled.div`
width: 400px;
position: relative;
padding: 20px;
background-color: #f4f4f4;
border-radius: 8px;
font-family: Arial, sans-serif;
`;

const RadioGroup = styled.div`
display: flex;
align-items: center;
margin-bottom: 20px;
`;

const RadioLabel = styled.label<{theme:string}>`
display: flex;
align-items: center;
margin-right: 20px;
font-size: 14px;
accent-color:${(props)=>props.theme==="REGALBLAZE"?"#C7810E":"#82104C"};

`;

const RadioInput = styled.input`
margin-right: 8px;
`;

const Label = styled.label`
display: block;
margin-bottom: 8px;
font-size: 14px;
color: #666;
`;

const Input = styled.input`
width: 100%;
padding: 8px;
font-size: 14px;
border: 1px solid #ddd;
border-radius: 4px;
margin-bottom: 20px;
`;

const Select = styled.select`
width: 100%;
padding: 8px;
font-size: 14px;
border: 1px solid #ddd;
border-radius: 4px;
margin-bottom: 20px;
`;

const DaysContainer = styled.div`
display: flex;
margin-bottom: 20px;
`;

const Day = styled.button`
flex: 1;
padding: 10px 10px;
font-size: 14px;
border: none;
border-radius: 4px;
background-color:'white';
 color: ${(props:any) => (props?.isSelected ? '#fff' : '#333')}; 
cursor: pointer;
margin-right: 4px;

&.selected{
background: ${(props)=>props.theme==="REGALBLAZE"?"#C7810E":"#82104C"};
color:white;
} 

&:last-child {
  margin-right: 0;
}

`;
const InputWrapper = styled.div`
display: flex;
gap: 10px;
alignItems: center;
justify-content: space-between;
`

const FooterText = styled.p`
font-size: 12px;
color: #7e0044;
text-align: left;
margin-top: -10px;
`;

const DatePickForm=({selectedDays, toggleDay, plantNames, calendarFormData, ccrNames, formData, setFormData}: any)=>{

  const {user} = useUserData()
  const themeUi = user.user.theme_ui



useEffect(()=>{
  setFormData(calendarFormData)
}, [calendarFormData])

const onHandleChange=(e:any)=>{
  setFormData({
    ...formData,
    iwd: e.target.value == "holiday" ? false : true
  })
}



const onHandleTitleChange = (e:any)=>{
  setFormData({
    ...formData,
    dsc: e.target.value 
  })
}

const onHandleOptionChange = (e:any)=>{
  setFormData({
    ...formData,
    rb: e.target.value

  })
}

const onHandlePlantChange = (e:any)=>{
  setFormData({
    ...formData,
    pl: Number(e.target.value),
    plant__plant_name:plantNames.find((pl:any)=> pl.plant_id === e.target.value)?.plant_name

  })
}
const onHandleCCRChange = (e:any)=>{

  setFormData({
    ...formData,
    ccr: Number(e.target.value),
    ccr__ccr_name: ccrNames.find((ccr: any) => ccr.ccr_id == e.target.value)?.ccr_name
    
  })
}

const onHandleEndDateChange = (e:any) =>{
setFormData({
  ...formData,
    ed:e.target.value

  })

}

const onHandleStartDateChange = (e:any) =>{
  setFormData({
    ...formData,
      sd:e.target.value
  
  })
}

// const onHandleEndsChange = (e:any)=>{
//   setFormData({
//     ...formData,
//     end: e.target.value

//   })
// }

const onHandleEVeryChange = (e:any)=>{
  setFormData({
    ...formData,
    dow: e.target.value

  })

}



    return (
        <FormContainer>
          <RadioGroup>
            <RadioLabel theme={themeUi}>
              <RadioInput type="radio" name="type" value="holiday" checked={formData.iwd === false} onChange={onHandleChange}  />
              Holiday
            </RadioLabel>
            <RadioLabel>
              <RadioInput type="radio" name="type" value="working"  checked={formData.iwd === true} onChange={onHandleChange}/>
              Working
            </RadioLabel>
          </RadioGroup>
    
        <InputWrapper>
          <Label>Title</Label>
          <Input type="text" placeholder="Add name of holiday" value={formData.dsc} onChange={onHandleTitleChange} />
        </InputWrapper>
    
        <InputWrapper>
          <Label>Repeat</Label>
          <Select value={formData.rb} onChange={onHandleOptionChange}>
            <option>Weekly</option>
            <option>Monthly</option>
            <option>Yearly</option>
          </Select>
        </InputWrapper>
    
        <InputWrapper>
          <Label>Start</Label>
          <Input type="date" value={formData.sd} onChange={onHandleStartDateChange} />
        </InputWrapper>
        <InputWrapper>
          <Label >Every</Label>
          <Input type="number" defaultValue="1" min="1" value={formData.dow} onChange={onHandleEVeryChange} disabled={!(formData.hid==null)}/> Week(s) 
        </InputWrapper>
    
        <InputWrapper>
          <Label>On</Label>
          <DaysContainer>
            {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map((day:any, index) => (
              <Day
              theme={themeUi}
              key={index}
              className={selectedDays[day] ? 'selected' : ''} 
              // onSelect={selectedDays[day]}
              onClick={() => {
                toggleDay(day);
              }}
              >
                {day}
              </Day>
            ))}
          </DaysContainer>
        </InputWrapper>

        <InputWrapper>
          <Label>CCR</Label>
          <Select onChange={onHandleCCRChange}>
            {ccrNames.map((ccr: any, index: number) => (
            <option key={index} value={ccr.ccr_id} selected={formData.ccr == ccr.ccr_id}>
            {ccr.ccr_name} 
      </option>
    ))}
  </Select>
        </InputWrapper>

        <InputWrapper>
          <Label>Plant</Label>
          <Select onChange={onHandlePlantChange}>
            {plantNames.map((plant: any, index: number) => (
            <option key={index} value={plant.plant_id} selected={formData.plant_id== plant.plant_id}>
            {plant.plant_name} 
      </option>
    ))}
  </Select>
        </InputWrapper>
    
        <InputWrapper>
          <Label>Ends</Label>
          {/* <Select value={formData.ed} onChange={onHandleEndsChange}>
            <option>On this day</option>
            <option>After</option>
          </Select> */}
          <Input type="date"  value={formData.ed} onChange={onHandleEndDateChange}/>
        </InputWrapper>
    
          <FooterText>*Holiday starting from Monday, 01 January 2024</FooterText>
          
        </FormContainer>
)
}

export default DatePickForm;