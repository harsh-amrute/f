import VFButtonOutline from "../../../../../components/VectorFLOW/commons/VFButtonOutline";
import { ContentWrapper, TextContainer, TextFilterWrapper,VFMasterGroupCard,VFMasterGroupCardHeader,VFMasterGroupCardHeaderText, VFButtonWrapper,VFMasterGroupCardContent,VFMasterGroupCardImage,VFMasterGroupCardText,VFMasterGroupCardContainer} from "./styles"
import { useUserData } from "../../../../../context";
import VFButton from "../../../../../components/VectorFLOW/commons/VFButton";
import { useState,ReactNode} from "react";
import { AddRecordMasterGroup, MDMMasterState } from "~/VectorFlow/types/MDM";
import SelectGroupedMasters from "../../../../../components/VectorFLOW/layouts/SelectGroupedMasters";
import useAdd from "./useAdd";

const {
    allmasters,
} = useAdd();

const AddRecord = () => {

    <SelectGroupedMasters/>
}

export default AddRecord;