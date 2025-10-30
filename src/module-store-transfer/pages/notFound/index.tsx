import { SCPageNotFound, PageNotFoundIcon } from "./styles.css";

const PageNotFound = () => {
  return (
    <div className={SCPageNotFound}>
      <img
        className={PageNotFoundIcon}
        src="/assets/img/error-404-page.svg"
        alt="Page not found"
      />
    </div>
  );
};

export default PageNotFound;
