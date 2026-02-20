import Spinner from "../../../components/commons/Spinner";
import { SelectSearchMultiple } from "./../../index";
import {
  productFilter,
  productFilterText,
  productFilterImg,
  iconDown,
  productBoxSelect,
  productFilterHeader,
  productFilterFlex,
  iconLocationBase,
} from "./styles.css";
import { useTranslation } from "react-i18next";
interface ProductProps {
  productFilter: object[];
  loading: boolean;
}

const ProductFilter = ({ productFilter: list, loading }: ProductProps) => {
  const { t } = useTranslation();
  // const { productFilter, loading } = props;

  return (
    <div className={productFilter}>
      <div className={productFilterHeader}>
        <img
          className={productFilterImg}
          src="/assets/img/ist/filter.svg"
          alt="filter"
        />
        <p className={productFilterText}>{t("filter.product.title")}</p>
      </div>

      <div className={productBoxSelect}>
        {loading && <Spinner />}

        {!loading &&
          list.map((item: any, index: number) => (
            <div key={index} className={productFilterFlex}>
              <img
                className={iconLocationBase}
                src={item.icon}
                alt="location"
                style={{ top: (item.top ?? 16) + "px" }}
              />
              <SelectSearchMultiple
                value={item.value}
                setValue={item.onChange}
                options={item.options}
                placeholder={item.placeholder}
              />
              <img
                className={iconDown}
                src="/assets/img/down-icon.svg"
                alt="location"
              />
            </div>
          ))}
      </div>
    </div>
  );
};

export default ProductFilter;
