import {useState,useEffect,useMemo,useCallback} from 'react'

import Select from 'react-select'

import {  InputWrapper, URLsForm ,Label, ButtonsWrapper, CheckBoxesWrapper, CheckBoxesHeader, CheckBoxesContainer, CheckBoxWrapper} from "../UserURLsDrawer/styles"
import { Input, PrimaryButton, Skeleton, TextArea } from "../../commons/styled"
import { useUserData } from "../../../context"
import axios from 'axios'
import { notifyError, notifySuccess } from '../../../helpers/notify'


interface FormDataType{
    name:string
    code:string
    description:string
    applicationId:string
    urls:Array<any>
}

const AddRole = (props:{cb:()=>void})=>{

    const {
        cb
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const [isLoading,setIsLoading] = useState<boolean>(true)

    const [allUrls,setAllUrls] = useState<Array<any>>([])

    const [allApplications,setAllApplications] = useState<Array<any>>([])

    const [isSubmitting,setIsSubmitting] = useState<boolean>(false)

    const [formData, setFormData] = useState<FormDataType>({
        name: "",
        code: "",
        description: "",
        applicationId: "",
        urls:[]
      });

    const getAllUrls = useCallback(async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API_HOST}api/user/get-all-functions/`)
            setAllUrls(data)
        }catch(error:any){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }
    },[])

    const getAllApplications = useCallback(async()=>{
        try{
            const {data} = await axios.get(`${process.env.REACT_APP_API_HOST}api/user/get-all-applications/`)
            setAllApplications(data)
        }catch(error:any){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }
    },[])


    useEffect(()=>{
        getAllUrls()
        getAllApplications()
        setIsLoading(false)
    },[])

    
    
      const handleChange = (
        e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
      ) => {
        const { name, value } = e.target;
    
        setFormData({ ...formData, [name]: value });
      };

      const handleSelectChange = (value:any)=>{
        setFormData({ ...formData, applicationId: value  });
        
      }

      const handleCheck = (e: React.ChangeEvent<HTMLInputElement>,data:any) => {
        const {  checked } = e.target;
    
        setFormData(prevFormData => {
            const updatedUrls = checked
                ? [...prevFormData.urls, data] // Add the URL if checked
                : prevFormData.urls.filter(url => url.id !== data.id); // Remove the URL if unchecked
    
            return { ...prevFormData, urls: updatedUrls };
        });
    };
    
    
    const handleSubmit = async(e: any) => {
        e.preventDefault();
        setIsSubmitting(true)
        try{
          await axios.post(`${process.env.REACT_APP_API_HOST}api/user/add-role/`,{
            data:[formData]
          },{
            headers: { 'Content-Type': 'application/json' }
          })

            notifySuccess("Successfully Added " + formData.name)
            cb()
        }catch(error){
          console.error(error)
          notifyError("Server Went Unresponsive")
        }
      };


      const applicationsFormattedData = useMemo(()=>{
        return [{value:null,label:"Select Application"},...allApplications.map((a)=>({value:a.application_id,label:a.application_name}))] 
      },[allApplications])

      const isFormValid = useMemo((): boolean => {
        return !Object.keys(formData).every((k) => {
            const key = k as keyof FormDataType;
            const value = formData[key];
            return value !== null && value !== undefined && value !== "" &&
                   (!Array.isArray(value) || value.length > 0);
        });
    },[formData])

    console.log(allUrls)

    if(isLoading){
        return(
            <URLsForm>
               
            <div style={{display:'flex',height:30,gap:20}}>
            <Skeleton
                style={{height:'100%',flex:1,width:'100%'}}
            />
                 <Skeleton
                style={{height:'100%',flex:1,width:'100%'}}
            />
                </div>
            <Skeleton
                style={{height:30,width:'100%',marginTop:20}}
            />
            <Skeleton
                style={{height:30,width:'100%',marginTop:20}}
            />

            <Skeleton
                style={{height:80,width:'100%',marginTop:20}}
            />
            <ButtonsWrapper style={{alignItems:'flex-end',justifyContent:'flex-end',flex:10}}>
                <Skeleton
                    style={{height:30,width:'100px'}}
                />
            </ButtonsWrapper>
            </URLsForm>
        )
    }

    return(
        <URLsForm onSubmit={handleSubmit}>
        <div style={{ display: "flex" }}>
            <InputWrapper>
            <Label htmlFor="name"> Name</Label>
            <Input
                type={"text"}
                required
                name="name"
                placeholder="Any name"
                themeUi={themeUi}
                onChange={handleChange}
            />
            </InputWrapper>
            <InputWrapper style={{ marginLeft: "10px" }}>
            <Label htmlFor="code"> Code</Label>
            <Input
                type={"text"}
                required
                name="code"
                placeholder="Role code"
                themeUi={themeUi}
                onChange={handleChange}
            />
            </InputWrapper>
        </div>
        <InputWrapper>
            <Label htmlFor="application">Applications  </Label>
            <Select 
                options={applicationsFormattedData} 
                placeholder={"Select Application"}  
                onChange={(data:any)=>handleSelectChange(data.value)}
                styles={{
                
                option: (baseStyles, { isSelected }) => ({
                    ...baseStyles,
                    fontSize:13,
                    backgroundColor: isSelected ?themeUi==="REGALBLAZE"?"#FCA311": "#BC3D80" : "white",
                    
                    
                    "&:hover": {
                        backgroundColor:themeUi==="REGALBLAZE"?"rgb(252, 163, 17,0.3) ": '#bc3d814d',
                        color:"black",
                    }
                }),
                control: (baseStyles, { isFocused }) => (
                    {
                        ...baseStyles, 
                        fontSize:16,
                        borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",
                        // border: "none",
                        // borderBottom: error ? "3px solid #D03E3E;" : menuIsOpen || isFocused ? '3px solid #820F4C' : '3px solid #A1A1A1',
                        boxShadow: 'none',
                        "&:hover":{
                            borderColor: isFocused ? "none": "hsl(0, 0%, 80%);",

                        }
                    }),
                }}
                
                />
        </InputWrapper>
        <InputWrapper>
            <Label htmlFor="description"> Description</Label>
            <TextArea
            name="description"
            style={{ fontSize: "14px" }}
            required
            placeholder="Example : BPR Manager"
            themeUi={themeUi}
            onChange={handleChange}
            />
        </InputWrapper>
        <CheckBoxesWrapper>
            <CheckBoxesHeader > Select URLS</CheckBoxesHeader>
                <CheckBoxesContainer style={{display:'flex',flexDirection:'column'}}>
                    {allUrls.map((r)=>{
                        return (
                            <CheckBoxWrapper>
                                <input type={'checkbox'} name={r.name} onChange={(e)=>handleCheck(e,r)}/>
                                <Label htmlFor={r.name}> {r.name}</Label>
                                
                            </CheckBoxWrapper>
                        )
                })}
            </CheckBoxesContainer>
        </CheckBoxesWrapper>
        <div
            style={{
            display: "flex",
            alignItems: "flex-end",
            justifyContent: "flex-end",
            flex: 10,
            }}
        >
            <PrimaryButton disabled={isFormValid || isSubmitting} themeUi={themeUi}>Add Role</PrimaryButton>
        </div>
    </URLsForm>
    )
}

export default AddRole