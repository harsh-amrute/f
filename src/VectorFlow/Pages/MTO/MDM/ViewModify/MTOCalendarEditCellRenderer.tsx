

const MTOCalendarEditCellRenderer = (props:any ) => {

  const {handleOpenClick, node, onDeleteHandler} = props;




    // const DatePickForm=()=>{
        
    //         return (
    //             <FormContainer>
    //               <RadioGroup>
    //                 <RadioLabel>
    //                   <RadioInput type="radio" name="type" value="holiday" defaultChecked />
    //                   Holiday
    //                 </RadioLabel>
    //                 <RadioLabel>
    //                   <RadioInput type="radio" name="type" value="working" />
    //                   Working
    //                 </RadioLabel>
    //               </RadioGroup>
            
    //             <InputWrapper>
    //               <Label>Title</Label>
    //               <Input type="text" placeholder="Add name of holiday" />
    //             </InputWrapper>
            
    //             <InputWrapper>
    //               <Label>Repeat</Label>
    //               <Select>
    //                 <option>Weekly</option>
    //                 <option>Monthly</option>
    //                 <option>Yearly</option>
    //               </Select>
    //             </InputWrapper>
            
    //             <InputWrapper>
    //               <Label>Start</Label>
    //               <Input type="date" />
    //             </InputWrapper>
    //             <InputWrapper>
    //               <Label>Every</Label>
    //               <Input type="number" defaultValue="1" min="1" /> Week(s)
    //             </InputWrapper>
            
    //             <InputWrapper>
    //               <Label>On</Label>
    //               <DaysContainer>
    //                 {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map((day:any, index) => (
    //                   <Day
    //                   key={index}
    //                   className={selectedDays[day] ? 'selected' : ''} 
    //                   onClick={() => toggleDay(day)}
    //                   >
    //                     {day}
    //                   </Day>
    //                 ))}
    //               </DaysContainer>
    //             </InputWrapper>

    //             <InputWrapper>
    //               <Label>CCR</Label>
    //               <Select>
    //                 <option>Weekly</option>
                    
    //               </Select>
    //             </InputWrapper>

    //             <InputWrapper>
    //               <Label>Plant</Label>
    //               <Select>
    //                 {plantNames.map((plant: any, index: number) => (
    //                 <option key={index} value={plant.plant_name}>
    //                 {plant.plant_name}
    //           </option>
    //         ))}
    //       </Select>
    //             </InputWrapper>
            
    //             <InputWrapper>
    //               <Label>Ends</Label>
    //               <Select>
    //                 <option>On this day</option>
    //                 <option>After</option>
    //               </Select>
    //               <Input type="date" />
    //             </InputWrapper>
            
    //               <FooterText>*Holiday starting from Monday, 01 January 2024</FooterText>
    //             </FormContainer>
    //     )
    // }

  return (
    <>
    {/* <VFModalCard openModal={isModalOpen} closeModal={() => {setIsModalOpen(false)}} headerText={"Add Details"} headerIcon={""} closeIcon={"/assets/img/VectorFLOW/NMS/close-dark.svg"} >
        <div style={{height: '76vh', width: '65vw', overflow: 'auto', background: '#f4f4f4'}}>
            <div style={{height: '100%',display: 'flex', justifyContent: 'space-between'}}>
                <div>
                <div style={{ padding: "10px", width: '100%', margin: '50px 0 0 30px' }}>
              
              <CalenderWrapper style={{zoom: '1', background: 'white', borderRadius: '12px'}} >
                <CalenderHeading style={{width: '100%', fontWeight: "bold"}} data-testid="utilization">Calendar</CalenderHeading>
                <DayPicker
                  style={{

                    display: 'flex',
                    justifyContent: 'center'
                  }}
                  mode="single"
                  components={{
                    Caption: CustomCalenderCaption,
                    Day: (props) => {
                      return (
                        <CustomCalenderDay
                          {...props}
                          color={"red"}
                        />
                      );
                    },
                  }}
                  styles={{
                    cell: {
                      padding: "5px",
                    },
                  }}
                />
              </CalenderWrapper>
            </div>
                </div>
                <div style={{height: '90%',  borderLeft: '2px solid #A0A0A0', margin: '40px 0'}}></div>
                <div>
                    {
                        DatePickForm()
                    }
                     <div style={{zoom: '0.8', marginTop: '10px'}}>
                <div key={'1'} style={{ display: 'flex', justifyContent: 'right', gap: '8px', borderTop: '2px dashed #A0A0A0', padding: '20px 10px 0 0' }}>

                    <div>

                        <div style={{
                            font: 'normal normal 300 16px/24px Roboto',
                            fontWeight: '400',
                            padding: '10px 30px',
                            color: 'white',
                            borderRadius: '6px',
                            background: '#820F4C',
                            boxShadow: '0px 6px 25px #00000029'

                        }}
                        onClick={()=>{setIsModalOpen(false)}}
                        >
                            Save
                        </div>
                    </div>
                            <div>
                                <div  style={{
                                    background: 'white', color: 'grey', font: 'normal normal 300 16px/24px Roboto',
                                    padding: '10px 20px',
                                    fontWeight: '400',
                                    borderRadius: '6px',
                                    border: '1px solid grey',
        
                                    boxShadow: '0px 6px 25px #00000029'
                                }} 
                                onClick={() => {
                                  setIsModalOpen(false);
                                  console.log('isModalOpen:',isModalOpen);  
                                }}
                                >
                                    Cancel
                                </div>
                            </div>
                </div>
            </div>

                </div>
            </div>
        </div>
           </VFModalCard> */}

          {/* {isModalOpen && ( */}
             {/* <div style={{display: 'flex', margin:'4px auto', width: '80px', justifyContent:'center'}}>
             <button onClick={()=>{setIsModalOpen(true)}} style={{background: 'transparent'}}>
                 <img height={16} width={16} src="/assets/img/VectorFLOW/NMS/edit-draft.svg" />
             </button>
             <button style={{background: 'transparent'}}>
                 <img height={16} width={16} src="/assets/img/VectorFLOW/NMS/delete-draft.svg" />
             </button>
         </div> */}

          {/* ) */}

          {/* } */}
     <div style={{display: 'flex', margin:'4px auto', width: '80px', justifyContent:'center'}}>
        <button onClick={()=>{handleOpenClick(props.node.rowIndex, props.data)}} style={{background: 'transparent'}}>
            <img height={16} width={16} src="/assets/img/VectorFLOW/NMS/edit-draft.svg" />
        </button>
        <button style={{background: 'transparent'}} onClick={() => onDeleteHandler(node.rowIndex)}>
            <img height={16} width={16} src="/assets/img/VectorFLOW/NMS/delete-draft.svg" />
        </button>
    </div>
    {/* <p>calendxarrrrrrrrrr</p> */}
    </>
  )
}

export default MTOCalendarEditCellRenderer