import { SearchInputMultiple } from "../../index";
import {
  SCSwapPermission,
  SCtitle,
  SCSwapContent,
  SCSwapItem,
  SCFlexCenter,
  SCItemTitle,
  SCItemMulSelect
} from "./styles";

const LocationPermission = ({ ...props }: any) => {
  const { prdPermissions, title } = props;

  return (
    <>
      <SCSwapPermission>
        <SCtitle>
          {title}
        </SCtitle>

        <SCSwapContent className="scroll-style">
          {prdPermissions.map((item: any, index: number) => {
            return (
              <SCSwapItem className="role-item" key={index}>
                <SCFlexCenter className="role-item-per--content">
                  <SCItemTitle className="role-item--text">{item.title}</SCItemTitle>
                  <SCItemMulSelect className="role-item--input">
                    <SearchInputMultiple
                      placeholder={item.placeholder}
                      options={item.options}
                      value={item.value}
                      setValue={item.setValue}
                      handleListChild={item.handleAction}
                      disabled={false}
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

export default LocationPermission;
