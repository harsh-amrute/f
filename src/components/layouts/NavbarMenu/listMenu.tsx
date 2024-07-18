export const listMenuParent: any = [
  {
    id: 1,
    name: "navbar.listMenuParent.userManagement.title",
    img: "/assets/img/nav/icon_manager_users",
    widthIcon: "28px",
    url: "/profile",
    status: false,
    role: ["IST Admin", "Admin"],
    child: [
      {
        name: "navbar.listMenuParent.userManagement.administration",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/profile",
        role: ["IST Admin", "Admin"],
      },
      {
        name: "navbar.listMenuParent.userManagement.analytics_usage",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "Admin"],
      },
      {
        name: "navbar.listMenuParent.userManagement.issueLogs",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "Admin"],
      },
    ],
  },
  {
    id: 2,
    name: "navbar.listMenuParent.masterDataManagement.title",
    img: "/assets/img/nav/master_data",
    url: "/master-data-management/control-panel",
    status: false,
    role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
    child: [
      {
        name: "navbar.listMenuParent.masterDataManagement.controlPanel",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/master-data-management/control-panel",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
      {
        name: "navbar.listMenuParent.masterDataManagement.savedDrafts",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/master-data-management/saved-drafts",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
      {
        name: "navbar.listMenuParent.masterDataManagement.taskPendingForReview",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/master-data-management/task-pending",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", 'MasterApprover'],
      },
      {
        name: "navbar.listMenuParent.masterDataManagement.taskStatus",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/master-data-management/task-status",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
      {
        name: "navbar.listMenuParent.masterDataManagement.modificationHistory",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/master-data-management/data-modification-history",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
    ],
  },
  // {
  //   id: 3,
  //   name: "navbar.listMenuParent.dynamicGridControl_AssortmentPlanning.title",
  //   img: "/assets/img/nav/dynamic_assortment",
  //   url: "",
  //   status: false,
  //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //   child: [
  //     {
  //       name: "navbar.listMenuParent.dynamicGridControl_AssortmentPlanning.gridSizing",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.dynamicGridControl_AssortmentPlanning.productGridMapping",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.dynamicGridControl_AssortmentPlanning.currentStoreWiseAssortment",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.dynamicGridControl_AssortmentPlanning.newStoreAssortment",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //   ],
  // },
  // {
  //   id: 4,
  //   name: "navbar.listMenuParent.replenishment_replacement.title",
  //   img: "/assets/img/nav/replenishment_replacement",
  //   url: "",
  //   status: false,
  //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //   child: [
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.bufferPenetrationReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.bufferTrendReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.bufferTrendGraph",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.rationedRequirementReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.supplierDispatchReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.buyerOrderReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.vendorDispatchReport",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.replenishment_replacement.availabilityComparison",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //   ],
  // },
  // {
  //   id: 5,
  //   name: "navbar.listMenuParent.groupLifeCycleManagement.title",
  //   img: "/assets/img/nav/grouplifecycle",
  //   widthIcon: "28px",
  //   url: "",
  //   status: false,
  //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //   child: [
  //     {
  //       name: "navbar.listMenuParent.groupLifeCycleManagement.item1",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.groupLifeCycleManagement.item2",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.groupLifeCycleManagement.item3",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.groupLifeCycleManagement.item4",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //   ],
  // },
  {
    id: 6,
    name: "navbar.listMenuParent.innerStoreTransfers.title",
    img: "/assets/img/nav/IST",
    url: "/",
    status: true,
    role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
    child: [
      {
        name: "navbar.listMenuParent.innerStoreTransfers.manualUpload",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/manual-upload",
        role: ["IST Admin", "IST Requestor"],
      },
      {
        name: "navbar.listMenuParent.innerStoreTransfers.pendingISTRequests",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/",
        role: ["IST Admin", "IST Governor"],
      },
      {
        name: "navbar.listMenuParent.innerStoreTransfers.ISTStatus",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/ist-status",
        role: ["IST Admin", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.innerStoreTransfers.ISTForcedClosure",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/ist-forced-closure",
        role: ["IST Admin", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.innerStoreTransfers.storeStatus",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/store-status",
        role: ["IST Admin"],
      },
      {
        name: "navbar.listMenuParent.innerStoreTransfers.availabilityComparison",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/availability-comparison",
        role: ["IST Admin", "IST Governor"],
      },
    ],
  },
  {
    id: 9,
    name: "Replenishment and Replacement",
    img: "/assets/img/VectorFLOW/BPR/replacement",
    url: "/supply-chain-intelligence-hub/planning",
    status: false,
    role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
    avoidHeader: true,
    child: [
      {
        name: "Supply Chain Intelligence Hub",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/supply-chain-intelligence-hub",
        role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
        child: [
          {
            name: "Planning",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/planning",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },
          {
            name: "BPR",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/bpr",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },
          // {
          //   name: "Dispatch Planning",
          //   img: "/assets/img/nav/arrow_down.svg",
          //   url: "/supply-chain-intelligence-hub/dispatch-planning",
          //   role: ["IST Admin", "IST Requestor"],
          // },
          {
            name: "Open Expediting Requests",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/open-expediting-requests",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },

          // {
          //   name: "Vendor Dispatch Report",
          //   img: "/assets/img/nav/arrow_down.svg",
          //   url: "//supply-chain-intelligence-hub/vendor-dispatch-report",
          //   role: ["IST Admin", "IST Requestor"],
          // },
          {
            name: "Rationed Requirement Report",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/rrr",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],

          },
          {
            name: "Buyer Order Report",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/bor",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],

          },
          {
            name: "Supplier Dispatch Report",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/supply-chain-intelligence-hub/sdr",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],

          }
        ]
      },
      {
        name: "Logistics",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/logistics",
        role: ["IST Admin", "IST Requestor"],

        child: [
          {
            name: "InTransit Whereabouts",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/logistics/intransit-whereabouts",
            // role: ["IST Admin", "IST Requestor"],
            role: ["Admin", "VectorConsultant", "BPRManager"],

          }
        ]
      },
      {
        name: "Insights & Trends",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/insights-and-trends",
        role: ["Admin", "VectorConsultant"],
        child: [
          {
            name: "Buffer Trend Report (BTR)",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/insights-and-trends/buffer-trend-report",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },
          {
            name: "Buffer Trends",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/insights-and-trends/buffer-trends",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },
          // {
          //   name: "Logistics Insights",
          //   img: "/assets/img/nav/arrow_down.svg",
          //   url: "/insights-and-trends/logistics-insights",
          //   role: ["IST Admin", "IST Requestor"],
          // },
          {
            name: "Guided Insights",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/insights-and-trends/guided-insights",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          },
          {
            name: "Research Insights",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/insights-and-trends/research-insights",
            role: ["Admin", "VectorConsultant", "DBMManager", "BPRManager"],
          }
        ]
      },
      {
        name: "DBM",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/dbm",
        role: ["Admin", "VectorConsultant"],
        child: [
          {
            name: "DBM Norm Suggestions",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/dbm/dbm-norm-suggestions",
            role: ["Admin", "VectorConsultant", "DBMManager"],
          }
        ]
      }
    ],
  },
  // {
  //   id: 7,
  //   name: "navbar.listMenuParent.velocityAnalysis.title",
  //   img: "/assets/img/nav/velocity_analysis",
  //   url: "/",
  //   status: false,
  //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //   child: [
  //     {
  //       name: "navbar.listMenuParent.velocityAnalysis.earlyIdentificationOfLaggards",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //     {
  //       name: "navbar.listMenuParent.velocityAnalysis.itr",
  //       img: "/assets/img/nav/arrow_down.svg",
  //       url: "",
  //       role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
  //     },
  //   ],
  // },
  {
    id: 8,
    name: "navbar.listMenuParent.miscellaneousReports.title",
    img: "/assets/img/nav/miscellaneousReports",
    url: "",
    status: false,
    role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
    child: [
      {
        name: "navbar.listMenuParent.miscellaneousReports.bufferPenetrationReport",
        img: "/assets/img/nav/arrow_down.svg",
        imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
        url: "/api/download-reports/bpr",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.miscellaneousReports.fashionRationedRequirement",
        img: "/assets/img/nav/arrow_down.svg",
        imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
        url: "/api/download-reports/fr",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.miscellaneousReports.rosn",
        img: "/assets/img/nav/arrow_down.svg",
        imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
        url: "/api/download-reports/rosn",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.miscellaneousReports.store_classification",
        img: "/assets/img/nav/arrow_down.svg",
        imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
        url: "/api/download-reports/store_classification",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.miscellaneousReports.ist",
        img: "/assets/img/nav/arrow_down.svg",
        imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
        url: "/api/download-reports/ist",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.dailyDataUnavailibilityReport",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.invalidDataReport",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.uiUploadLogs_AddNewSKULoc",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.uiUploadLogs_ModifySKULoc",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.uiUploadLogs_RemoveSKULoc",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
      // {
      //   name: "navbar.listMenuParent.miscellaneousReports.uiUploadLogs_SKUMaster",
      //   img: "/assets/img/nav/arrow_down.svg",
      //   imgHover: "/assets/img/nav/DownloadReport-Icon.svg",
      //   url: "",
      //   role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      // },
    ],
  },

  {
    id: 19,
    name: "Procurement",
    img: "/assets/img/nav/procurement",
    url: "",
    status: false,
    role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
    avoidHeader: true,
    child: [
      {
        name: "Material Coverage For Open Sales",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/procurement/material-coverage-open-sales",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
      },
      {
        name: "Procurement Planning",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/procurement-planning/planning",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
      },
      {
        name: "Material Requirement",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/procurement/material-requirement",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "Insight and Trends",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/procurement/insights-and-trends",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
        child: [
          {
            name: "Day Wise Coverage",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/procurement/insights-and-trends/day-wise-coverage",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
          },
          {
            name: "RM/PM Orderwise Coverage",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/procurement/insights-and-trends/rmpm-orderwise-coverage",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"]
          },
          {
            name: "RM/PM Buffer Trend",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/procurement/insights-and-trends/rmpm-buffer-trends",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"]
          },
          {
            name: "Expediting RM/Suppliers",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/procurement/insights-and-trends/rmpm-expediting-rm-suppliers",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"]
          }
        ]

      },
    ],
  },
  {
    id: 10,
    name: "navbar.listMenuParent.prodAndPlanningScheduling.title",
    img: "/assets/img/nav/prod-plan-icon",
    url: "/production-planning-scheduling/enquiry-response",
    status: false,
    role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
    child: [
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.enquiryResponse",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/production-planning-scheduling/enquiry-response",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.dueDateQuotation",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant", "MasterUpdater"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.orderRescheduling",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/production-planning-and-scheduling/order-rescheduling",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.fullKitAssignment",
        img: "/assets/img/nav/arrow_down.svg",
        url: "/production-planning-scheduling/full-kit-assignment",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.dynamicReleaseManagement",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.deptWiseBMReport",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.overallBMReport",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
      },
      {
        name: "navbar.listMenuParent.prodAndPlanningScheduling.insightAndTrends",
        img: "/assets/img/nav/arrow_down.svg",
        url: "",
        role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison"],
        child: [
          {
            name: "BM Trends",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/production-planning-scheduling/insight-and-trends/bm-trends",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
          },
          {
            name: "STPL & Full Kits",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/production-planning-scheduling/insight-and-trends/stpl-full-kits",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
          },
          {
            name: "Orders At Risk",
            img: "/assets/img/nav/arrow_down.svg",
            url: "/production-planning-scheduling/insight-and-trends/order-at-risk",
            role: ["IST Admin", "IST Requestor", "IST Governor", "IST Liaison", "Admin", "VectorConsultant"],
          }
        ]
      },
    ],
  },

];



