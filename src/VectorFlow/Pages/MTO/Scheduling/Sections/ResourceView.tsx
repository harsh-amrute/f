import ResourceViewChart from "../components/ResourceViewChart";
import ResourceViewSummary from "../components/ResourceViewSummary";
import {resourceViewWrapper} from './styles.css';

const ResourceView = () => {
  return (
    <div className={resourceViewWrapper}>
      <ResourceViewChart />
      <ResourceViewSummary />
    </div>
  );
};

export default ResourceView;
