import Drawer from "../../commons/Drawer"
import { Content,DrawerHeader} from "../UserURLsDrawer/styles"
import { useUserData } from "../../../context"
import { useState } from "react"
import AddRole from "./Add"
import NavigationTab from "../NavigationTab"
import ViewURLs from "./View"
import DeleteUrl from "./Delete"
import { notifySuccess,notifyError } from "../../../helpers/notify"

interface UserRolesDrawerProps{
    onClose:()=>void
}

const UserRolesDrawer = (props:UserRolesDrawerProps)=>{

    const {
        onClose
    } = props

    const {user} = useUserData()

    const themeUi = user.user.theme_ui


    const [currTab,setCurrTab] = useState<number>(0)

    const [currRole,setCurrRole] = useState<any>(null)

    const onCellClicked = (row:any)=>{
        setCurrTab(2)
        setCurrRole(row)
    }

    const handleDelete = async()=>{
        try{
            await fetch(`${process.env.REACT_APP_API_HOST}api/user/delete-role/${currRole.id}/`,{
                method:'DELETE'
            })
            notifySuccess("Deleted URL Successfully")
            setCurrTab(0)
        }catch(error){
            console.error(error)
            notifyError("Server Went Unresponsive")
        }
    }

    

    return(
        <Drawer
            isOpen
            header={<Header 
                themeUi={themeUi}
                handleAction={setCurrTab}
                handleClose={onClose}
            />}
            onClose={onClose}
        >
            
            
            {currTab === 1 && (
                <Content>
                    <AddRole cb={()=>setCurrTab(0)}/>
                </Content>
            )}
            {currTab === 0 && (
                <Content>
                    <ViewURLs
                        onDelete={(r)=>onCellClicked(r)}
                    />
                </Content>
            )}
            {currTab === 2 && (
                <Content>
                    <DeleteUrl  
                        onSuccess={handleDelete}
                        onFailure={()=>{
                            setCurrTab(0)
                            setCurrRole(null)
                        }}
                    />
                </Content>
            )}
            {currTab === 3 && (
                <Content>
                    <AddRole cb={()=>setCurrTab(0)}/>
                </Content>
            )}
            
            
        </Drawer>
    )
}

const Header = (props:{
    themeUi:string,
    handleAction:(item:number)=>void,
    handleClose:()=>void
})=>{
    
    const {
        themeUi,
        handleAction,
        handleClose
    } = props


    return(
        <DrawerHeader 
            themeUi={themeUi}
        >
            <p>Roles</p>
            <div style={{flex:4}}>
                <NavigationTab 
                    listTabs={['View' , 'Add']} 
                    onClick={(item:number)=>(handleAction(item))}
                />
            </div>
            <img 
                style={{cursor:'pointer',marginRight:'5px'}}
                onClick={handleClose}
                src="/assets/img/VectorFLOW/NMS/close-dark.svg"
                height={13}
                width={13}
            />
        </DrawerHeader>
    )
}

export default UserRolesDrawer