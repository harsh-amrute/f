import { useState } from "react";
import { SearchInputMultiple } from "../../index";
import {
  SCSwapPermission,
  SCtitle,
  SCSwapContent,
  SCSwapItem,
  SCFlexCenter,
  SCItemTitle,
  SCItemMulSelect,
  Checkbox
} from "./styles";
import { useUserData } from "../../../context";


const ProductPermission = ({ ...props }: any) => {
  const { title, prdPermissions, onSelectAll } = props;

  const { user} = useUserData();
  const themeUi = user?.user?.theme_ui;
  
  return (
    <>
      <SCSwapPermission>
        <SCtitle>
          {title}
          <div style={{display:'flex', gap:'5px'}}>
            <Checkbox themeUi={themeUi} type='checkbox' onClick={onSelectAll} /> 
            <p style={{fontSize:'14px' }}>Select All</p>
          </div>
        </SCtitle>

        <SCSwapContent className="scroll-style">
          {prdPermissions.map((item: any, index: number) => {
            return (
              <SCSwapItem key={index}>
                <SCFlexCenter>
                  <SCItemTitle>{item.title}</SCItemTitle>
                  <SCItemMulSelect>
                    <SearchInputMultiple
                      placeholder={item.placeholder}
                      options={item.options}
                      value={item.value}
                      setValue={item.setValue}
                      handleListChild={item.handleAction}
                      disabled={false}
                      key={index}
                    />
                  </SCItemMulSelect>
                </SCFlexCenter>
              </SCSwapItem>
            );
          })}
        </SCSwapContent>
      </SCSwapPermission>
    </>
  );
};

export default ProductPermission;
