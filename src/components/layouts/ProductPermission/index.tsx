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

const ProductPermission = ({ ...props }: any) => {
  const { title, prdPermissions } = props;

  return (
    <>
      <SCSwapPermission>
        <SCtitle>
          {title}
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
