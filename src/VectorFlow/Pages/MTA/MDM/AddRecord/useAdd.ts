import { useSelector } from 'react-redux'
import { RootState } from '../../../../../redux/store/store';
import {masterGroupMapper} from '../../../../../helpers/MDMConstants';

const useAdd=()=>{

const allmasters = useSelector((state:RootState)=>state.mdm.allMasters);
   


return {
    allmasters
}

}

export default useAdd