import styled from "styled-components";
import { useUserData } from '../../../../../context'
import { ReactHTMLElement, useEffect} from "react";



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
align-items: center;
justify-content: space-between;
`

const FooterText = styled.p`
font-size: 12px;
color: #7e0044;
text-align: left;
margin-top: -10px;
`;

const MonthlyWrapper = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 20px;
  margin-bottom: 20px;
`

const DatePickForm=({ plantNames, calendarFormData, ccrNames, formData, setFormData,setIsModalOpen,onSaveHandler}: any)=>{

  const {user} = useUserData()
  const themeUi = user.user.theme_ui
  const isDisabled =  formData.sd === '' || formData.ed === ''

  
  useEffect(()=>{
    setFormData(calendarFormData);
  }, [calendarFormData]);
  

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


const onHandleEVeryChange = (e:any)=>{
  setFormData({
    ...formData,
    rd: e.target.value

  })

}

const handleAddDow = (day: string) => {
  setFormData((prevFormData: any) => {
    const currentDow = prevFormData.dow || "";
    const dowArray = currentDow.split(",").filter(Boolean);

    const newDow = dowArray.includes(day)
      ? dowArray.filter((d:string) => d !== day).join(",")
      : [...dowArray, day].join(",");
  
    return { ...prevFormData, dow: newDow };
  });
};

useEffect(() => {

  // Clear all selections first to avoid duplicate toggling issues
  document.querySelectorAll(".selected").forEach((el) => {
    el.classList.remove("selected");
  });
  
  // Apply the correct class to selected days
  const days = formData?.dow?.includes(",") ? formData?.dow.split(",") : [formData.dow];

  days.forEach((day: string) => {
    const element = document.getElementById(day);
    if (element) {
      element.classList.add("selected");
    }
  });
}, [formData.dow]);


useEffect(()=>{
  if(formData?.rb !== "Weekly"){
    setFormData((prevFormData:any)=> ({...prevFormData, dow :""}))
  }
},[formData.rb])

const handleMnOptionsChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
  setFormData((prevFormData : any) => (
    { ...prevFormData, mn: e.target.value }
  ));
}

const handleMdOptionsChange = (e: React.ChangeEvent<HTMLSelectElement>)=>{
  setFormData((prevFormData: any) => (
    {...prevFormData, md : e.target.value}
  ))
}


    return (
      <FormContainer>
        <RadioGroup>
          <RadioLabel theme={themeUi}>
            <RadioInput
              type="radio"
              name="type"
              value="holiday"
              checked={formData.iwd === false}
              onChange={onHandleChange}
            />
            Holiday
          </RadioLabel>
          <RadioLabel>
            <RadioInput
              type="radio"
              name="type"
              value="working"
              checked={formData.iwd === true}
              onChange={onHandleChange}
            />
            Working
          </RadioLabel>
        </RadioGroup>

        <InputWrapper>
          <Label>Title</Label>
          <Input
            type="text"
            placeholder="Add name of holiday"
            value={formData.dsc}
            onChange={onHandleTitleChange}
          />
        </InputWrapper>

        <InputWrapper>
          <Label>Repeat</Label>
          <Select value={formData.rb} onChange={onHandleOptionChange}>
            {["Select an option", "Once", "Weekly","Monthly"].map(
              (option, index) => (
                <option key={index} value={option} >
                  {option}
                </option>
              )
            )}
          </Select>
        </InputWrapper>

        <InputWrapper>
          <Label>Start</Label>
          <Input
            type="date"
            value={formData.sd}
            onChange={onHandleStartDateChange}
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Every</Label>
          <Input
            type="number"
            defaultValue="1"
            min="1"
            value={formData?.dow}
            onChange={onHandleEVeryChange}
            disabled={!(formData.hid == null)}
          />
          Week(s)
        </InputWrapper>
        {formData.rb === "Weekly" && (
          <InputWrapper>
            <Label>On</Label>
            <DaysContainer>
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
              (day: any, index) => (
                <Day
                  key={index}
                  id={day}
                  onClick={() => {
                    handleAddDow(day);
                  }}
                >
                  {day}
                </Day>
              )
            )}
          </DaysContainer>
          </InputWrapper>
        )}
        {formData.rb === "Monthly" && (
        
          <MonthlyWrapper>
            <label htmlFor="the" style={{display:"flex",justifyContent:"center", alignItems:"center", fontSize:"1.2rem"}}>
              <input type="radio" id="the" checked /> The
            </label>
            <Select value={formData.mn} onChange={handleMnOptionsChange} style={{width:"auto", marginBottom:"0px"}}>
            {["first","second","third","fourth","last"].map(
              (option, index) => (
                <option key={index} value={option} >
                  {option}
                </option>
              )
            )}
          </Select>
          <Select value={formData.md} onChange={handleMdOptionsChange} style={{width:"auto",marginBottom:"0px"}}>
            {["day","weekday","weekend day","Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map(
              (option, index) => (
                <option key={index} value={option} >
                  {option}
                </option>
              )
            )}
          </Select>
          </MonthlyWrapper>
          
        )}
        <InputWrapper>
          <Label>CCR</Label>
          <Select onChange={onHandleCCRChange}>
            {ccrNames.map((ccr: any, index: number) => (
              <option
                key={index}
                value={ccr.ccr_id}
                selected={formData.ccr == ccr.ccr_id}
              >
                {ccr.ccr_name}
              </option>
            ))}
          </Select>
        </InputWrapper>

        <InputWrapper>
          <Label>Plant</Label>
          <Select value={formData.pl} onChange={onHandlePlantChange}>
            {plantNames.map((plant: any, index: number) => (
              <option key={index} value={plant.plant_id}>
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
          <Input
            type="date"
            value={formData.ed}
            onChange={onHandleEndDateChange}
          />
        </InputWrapper>

        <FooterText>*Holiday starting from Monday, 01 January 2024</FooterText>
        <div style={{ zoom: "0.8", marginTop: "10px" }}>
          <div
            key={"1"}
            style={{
              display: "flex",
              justifyContent: "right",
              gap: "8px",
              borderTop: "2px dashed #A0A0A0",
              padding: "20px 10px 0 0",
            }}
          >
            <div>
              <button
                disabled={isDisabled}
                type="submit"
                onClick={() => {
                  onSaveHandler();
                }}
                style={{
                  font: "normal normal 300 16px/24px Roboto",
                  fontWeight: "400",
                  padding: "10px 30px",
                  color: "white",
                  borderRadius: "6px",
                  background: isDisabled ? "gray" : "#820F4C",
                  boxShadow: "0px 6px 25px #00000029",
                  cursor: isDisabled ? "not-allowed" : "pointer",
                }}
              >
                Save
              </button>
            </div>
            <div>
              <button
                style={{
                  background: "white",
                  color: "grey",
                  font: "normal normal 300 16px/24px Roboto",
                  padding: "10px 20px",
                  fontWeight: "400",
                  borderRadius: "6px",
                  border: "1px solid grey",

                  boxShadow: "0px 6px 25px #00000029",
                }}
                onClick={() => {
                  setIsModalOpen(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </FormContainer>
    );
}

export default DatePickForm;