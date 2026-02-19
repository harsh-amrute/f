import {
  VFSelectedFiltersPlaceHolder,
  VFSelectedFiltersWrapper,
  VFFilterScrollBar,
} from "./styles.css";

const MTOSelectedFilter = () => {
  return (
    <div className={VFSelectedFiltersWrapper}>
      <p className={VFSelectedFiltersPlaceHolder}>Selected Filters</p>
      <div className={VFFilterScrollBar}>{/* content goes here */}</div>
    </div>
  );
};

export default MTOSelectedFilter;
