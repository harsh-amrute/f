import "./i18n/config";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { LicenseManager } from "ag-grid-enterprise";
import "./index.css";
import { BrowserRouter as Router } from "react-router-dom";
import { QueryClientProvider } from "@tanstack/react-query";
import { setupReactQuery } from "./config/react-query-config";
declare global {
  interface Window {
    __nonce__?: string;
  }
}

import App from "./App";
import { setupAxios } from "./config/axios-config";
import reportWebVitals from "./reportWebVitals";
import { ToastContainer } from "react-toastify/unstyled";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./redux/store/store";
import { Provider } from "react-redux";
import { AG_GRID_KEY } from "./helpers/constants";
import { ErrorBoundary } from "react-error-boundary";
import VFErrorFallBack from "./components/layouts/VFErrorFallBack";
import createCache from "@emotion/cache";
import { CacheProvider } from "@emotion/react";
import { nonce } from "./helpers/utils";

LicenseManager.setLicenseKey(AG_GRID_KEY);
// Axios default settings and interceptors
setupAxios();

const cache = createCache({
  key: "my-cache-key",
  nonce: nonce,
  // prepend: true
});

// react-query client setup
const queryClient = setupReactQuery();

function Root() {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setReady(true);
  }, []);

  return ready ? (
    <CacheProvider value={cache}>
      <ErrorBoundary
        fallback={<VFErrorFallBack />}
        onError={(data) => console.log(data)}
      >
        <QueryClientProvider client={queryClient}>
          <Router>
            <Provider store={store}>
              <App />
              <ToastContainer />
            </Provider>
          </Router>
        </QueryClientProvider>
      </ErrorBoundary>
    </CacheProvider>
  ) : null;
}

ReactDOM.createRoot(document.getElementById("root")!).render(<Root />);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
