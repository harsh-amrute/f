import {ConflictErrorToolTipSection, ConflictErrorToolTipWrapper,ConflictErrorText} from './styles' 


const ConflictErrorToolTip = (params:any)=>{
    console.log(params)
    const currColumn = params.colDef?.colId || ''
    return(
        <ConflictErrorToolTipWrapper>
            {params.data.users && params.data.users.map((user:any)=>{
                return (
                    <ConflictErrorToolTipSection>
                        <ConflictErrorText><b>User</b> : {user.user}</ConflictErrorText>
                        <ConflictErrorText><b>{params.colDef?.headerName}</b> : {!user.data[currColumn]?"NULL":user.data[currColumn]}</ConflictErrorText>
                    </ConflictErrorToolTipSection>
                )
            })}
        </ConflictErrorToolTipWrapper>
    )
}

export default ConflictErrorToolTip