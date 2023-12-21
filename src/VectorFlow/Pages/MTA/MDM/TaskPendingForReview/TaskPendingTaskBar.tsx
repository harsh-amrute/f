import { TaskBarContainer } from "../ViewModify/styles"
import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline"
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton"
import { useUserData } from "../../../../../context"

interface TaskPendingTaskBarProps{
    onSubmit:()=>void
    onCancel:()=>void
}

const TaskPendingTaskBar = (props:TaskPendingTaskBarProps) =>{

    const {
        onCancel,
        onSubmit
    } = props

    const {user} = useUserData()

    return(
        <TaskBarContainer data-testid="taskbar">
            <VFButtonOutline onClick={onCancel} themeUi={user.user.theme_ui} disabled={false} width={137}>
                Cancel
            </VFButtonOutline>            
            <VFButton onClick={onSubmit} themeUi={user.user.theme_ui} disabled={false} width={137}>
               Submit
            </VFButton>
        </TaskBarContainer>
    )
}

export default TaskPendingTaskBar