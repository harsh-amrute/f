import { PrimaryButton, SecondaryButton } from "../../../components/commons/styled";
import { ButtonsWrapper, URLsForm } from "./styles";
import { useUserData } from "../../../context"
import axios from "axios";

const DeleteUrl  = (props:{
    onSuccess:()=>void
    onFailure:()=>void
})=>{

    const {
        onFailure,
        onSuccess
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui

    const handleSubmit = async(e: any) => {
        e.preventDefault();
        // setIsSubmitting(true)
        // try{
        //   const response = await axios.delete(`${process.env.REACT_APP_API_HOST}api/user/add-function/`,{
        //     data:[formData]
        //   },{
        //     headers: { 'Content-Type': 'application/json' }
        //   })
        //   if(response.status === 400){
        //     notifyError("A URL with the name " + formData.name  +" already exists" )
        //   }
        //   else{
        //     notifySuccess("Successfully Added " + formData.name)
        //   }
        // }catch(error){
        //   console.error(error)
        //   notifyError("Server Went Unresponsive")
        // }finally{
        //   setIsSubmitting(false)
        // }
      };

    return(
        <URLsForm>
        <h2 style={{fontSize:'18px',fontWeight:'400',textAlign:'center',flex:1}}>Are you sure you want to Delete ?</h2>
        <ButtonsWrapper style={{justifyContent:'flex-end',alignItems:'flex-end',flex:10}}>
            <SecondaryButton type="button" themeUi={themeUi} onClick={onFailure}>
                Cancel
            </SecondaryButton>
            <PrimaryButton type="button" themeUi={themeUi} onClick={onSuccess}>
                Confirm
            </PrimaryButton> 
        </ButtonsWrapper>
    </URLsForm>
    )
}

export default DeleteUrl