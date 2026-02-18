import Spinner from '../../../components/commons/Spinner'
import { SelectSearchMultiple } from '../../index'
import {
  locationFilter,
  producFilterHeader,
  productBoxSelect,
  productFilterText,
  productFilterImg,
  productBoxSelectItem,
  iconLocationBase,
  iconLocationTop16,
  iconLocationTop19,
  iconDown,
} from './styles.css';
import { useTranslation } from 'react-i18next'

interface LocationProps {
  locationFilter: object[];
  width: number;
  loading: boolean;
}

const LocationFilter = ({ locationFilter: list, width, loading }: LocationProps) => {
  const { t } = useTranslation()
  return (
    <div className={locationFilter}>
      <div className={producFilterHeader}>
        <img className={productFilterImg} src="/assets/img/ist/filter.svg" alt="filter" />
        <p className={productFilterText}>{t('filter.location.title')}</p>
      </div>

      <div className={productBoxSelect}>
        {loading && <Spinner />}

        {!loading &&
          list.map((item: any, index: number) => {
            const topClass = item.icon ? iconLocationTop19 : iconLocationTop16;

            return (
              <div
                key={index}
                className={productBoxSelectItem}
                style={{ flex: `1 0 ${width}%`, maxWidth: `${width}%` }}
              >
                <img
                  className={`${iconLocationBase} ${topClass}`}
                  src={item.icon ? item.icon : '/assets/img/ist/location.svg'}
                  alt="location"
                />

                <SelectSearchMultiple
                  placeholder={item.placeholder}
                  options={item.options}
                  value={item.value}
                  setValue={item.onChange}
                />

                <img className={iconDown} src="/assets/img/down-icon.svg" alt="open" />
              </div>
            );
          })}
      </div>
    </div>
  );

}

export default LocationFilter
