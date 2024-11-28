import React, { Suspense, useEffect } from 'react'
import { type RouteObject } from 'react-router-dom'
import { AppLayout } from './components'
import { getStoreTransferModuleRoutes } from './module-store-transfer/app-routes-store-transfer'
import Login from './module-main/pages/auth/login'
import Home from './module-main/pages/home'
import ManualUpload from './module-store-transfer/pages/manual-upload'
import IstForced from './module-store-transfer/pages/ist-forced'
import StoreStatus from './module-store-transfer/pages/store-status'
import ForgotPassword from './module-main/pages/auth/forgot-password'
import ChangePassword from './module-main/pages/auth/change-password'
import Availability from './module-store-transfer/pages/availability-comparison'
import IstStatus from './module-store-transfer/pages/ist-status/index'
import Profile from './module-store-transfer/pages/profile'
import PageForbidden from './module-store-transfer/pages/forbidden'
import PageNotFound from './module-store-transfer/pages/notFound'
import { useTranslation } from 'react-i18next'
import ControlPanel from './VectorFlow/Pages/MTA/MDM/ControlPanel'
import ViewModify from './VectorFlow/Pages/MTA/MDM/ViewModify'
import AddRecord from './VectorFlow/Pages/MTA/MDM/AddRecord'
import DeleteRecord from './VectorFlow/Pages/MTA/MDM/DeleteRecord'
import SavedDrafts from './VectorFlow/Pages/MTA/MDM/SavedDrafts'
import TaskStatus from './VectorFlow/Pages/MTA/MDM/TaskStatus'
import TaskPendingForReview from './VectorFlow/Pages/MTA/MDM/TaskPendingForReview'
import BuyerOrderReport from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BuyerOrderReport'
import Planning from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/Planning'
import ResearchInsights from './VectorFlow/Pages/MTA/InsightsAndTrends/ResearchInsights'
import BPR from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/BPR'
import RRR from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/RationedRequirementReport'
import GuidedInsights from './VectorFlow/Pages/MTA/InsightsAndTrends/GuidedInsights'
import BufferTrends from './VectorFlow/Pages/MTA/InsightsAndTrends/BufferTrends'
import BufferTrendReport from './VectorFlow/Pages/MTA/InsightsAndTrends/BTR'
import DBM from './VectorFlow/Pages/MTA/DBM/DBMNormSuggestions'
import EnquiryResponse from './VectorFlow/Pages/MTO/Production/EnquiryResponse'
import OpenExpeditingRequests from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/OpenExpeditingRequests'
import MaterialCov from './VectorFlow/Pages/MTO/Procurement/MaterialCoverage/MaterialCov'
import ProcurementPlanning from './VectorFlow/Pages/MTO/Procurement/Planning';
import SimulateFullKit from './VectorFlow/Pages/MTO/Procurement/Planning/SimulateFullKit';
import InTransitWhereAbouts from './VectorFlow/Pages/MTA/Logistics/InTransitWhereAbouts'
import DayWiseCoverage from './VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/DayWiseCoverage'
import MaterialRequirement from './VectorFlow/Pages/MTO/Procurement/MaterialRequirement/MaterialRequirement'
import RMPMBufferTrends from './VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMBufferTrends'
import RMPMOrderwiseCoverage from './VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMOrderwiseCoverage'
import DptWiseBMReport from './VectorFlow/Pages/MTO/Production/DepartmentWiseBMReport/index';
import FullKitAssignment from './VectorFlow/Pages/MTO/Production/FullKitAssignement'
import OrderRescheduling from './VectorFlow/Pages/MTO/Production/OrderRescheduling'
import RMExpeditionSuppliers from './VectorFlow/Pages/MTO/Procurement/InsightsAndTrends/RMPMExpediting/index'
import BMTrends from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/BMTrends'
import SupplierDispatchReport from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/SupplierDispatchReport'

import DataModificationHistory from './VectorFlow/Pages/MTA/MDM/DataModificationHistory'
import MCGrid from './VectorFlow/Pages/MTA/SupplyChainIntelligenceHub/MerchandisingGrid'
import STPLAndFullKits from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/STPLAndFullKits'
import OrderAtRisk from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/OrderAtRisk'
import DueDateQuotation from './VectorFlow/Pages/MTO/Production/DueDateQuotation'
import OrderBalance from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/OrderBalance'
import OTIFAnalysis from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/OTIFAnalysis'
import ResourceUtilization from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/ResourceUtilization'
import FOLSummary from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/FOLSummary'
import DynamicReleaseManagement from './VectorFlow/Pages/MTO/Production/DynamicReleaseManagement'
import ReasonForDelayOrder from './VectorFlow/Pages/MTO/Poogi/ReasonOrderChange/index'
import TopFailureReasons from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/TopFailureReason'
import OTAndIFAnalysis from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/OTAndIFAnalysis'
import ElapsedTime from './VectorFlow/Pages/MTO/Production/InsightsAndTrends/ElapsedTime'
import LeadTime from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/LeadTime'
import TrendsOfFailureReason from './VectorFlow/Pages/MTO/Poogi/InsightAndTrends/TrendsOfFailureReason'
import OverallBmReport from './VectorFlow/Pages/MTO/Production/OverallBMReport'
import LandingPage from './VectorFlow/Pages/Common/LandingPage'
import MTOControlPanel from './VectorFlow/Pages/MTO/MDM/ControlPanel'
import MTOViewModify from './VectorFlow/Pages/MTO/MDM/ViewModify'
import MTOSavedDrafts from './VectorFlow/Pages/MTO/MDM/SavedDrafts'
import MTOTaskStatus from './VectorFlow/Pages/MTO/MDM/TaskStatus'
import MTOTaskPendingForReview from './VectorFlow/Pages/MTO/MDM/TaskPendingForReview'
import MTOAddRecord from './VectorFlow/Pages/MTO/MDM/AddRecord'
import MTODataModificationHistory from './VectorFlow/Pages/MTO/MDM/DataModificationHistory'
import MastersInterceptor from './VectorFlow/Pages/Common/MastersInterceptor'

// to show loading state for desired page only instead of the entire screen
const lazyLoad = (children: React.ReactNode) => {
  const search = window.location.search
  const params = new URLSearchParams(search)
  let lang = params.get('hl') || 'en'
  const langs = ['en', 'ja', 'es']
  if (lang && !langs.includes(lang)) lang = 'en'
  const { i18n } = useTranslation()
  useEffect(() => {
    i18n.changeLanguage(lang)
  }, [])
  const authenPage = [
    '/login',
    '/forgot-password',
    '/change-password',
    '/profile',
    '/mto/master-data-management/control-panel',
    '/master-data-management/mto-control-panel/view-modify',
    '/master-data-management/mto-saved-drafts',
    '/master-data-management/mto-task-status',
    '/master-data-management/mto-task-pending',
    '/master-data-management/mto-control-panel/add',
    '/master-data-management/mto-control-panel/delete',
    '/master-data-management/masters-interceptor',
    '/masters-interceptor/control-panel',
    "/masters-interceptor/saved-drafts",
    "/mto/master-data-management/saved-drafts",
    "/masters-interceptor/task-status",
    "/mto/master-data-management/task-status",
    '/masters-interceptor/task-pending',
    "/mto/master-data-management/task-pending",
    "/masters-interceptor/data-modification-history",
    "/mto/master-data-management/data-modification-history",
    "/mto/master-data-management/control-panel/view-modify",
    "/mto/master-data-management/control-panel/add"

  ]
  const urlAllPage = [
    ...authenPage,
    '/',
    '/manual-upload',
    '/ist-forced-closure',
    '/store-status',
    '/availability-comparison',
    '/ist-status',
    '/permission-forbidden',
    '/master-data-management/control-panel',
    '/master-data-management/control-panel/view-modify',
    '/master-data-management/saved-drafts',
    '/master-data-management/task-status',
    '/master-data-management/task-pending',
    '/master-data-management/control-panel/add',
    '/master-data-management/control-panel/delete',
    // mto mdm pages
    '/master-data-management/mto-control-panel',
    '/master-data-management/mto-control-panel/view-modify',
    '/master-data-management/mto-saved-drafts',
    '/master-data-management/mto-task-status',
    '/master-data-management/mto-task-pending',
    '/master-data-management/mto-control-panel/add',
    '/master-data-management/mto-control-panel/delete',
    //
    '/supply-chain-intelligence-hub/bor',
    '/supply-chain-intelligence-hub/bpr',
    '/supply-chain-intelligence-hub/planning',
    '/supply-chain-intelligence-hub/rrr',
    "/supply-chain-intelligence-hub/open-expediting-requests",
    '/insights-and-trends/buffer-trends',
    '/insights-and-trends/guided-insights',
    '/insights-and-trends/research-insights',
    '/insights-and-trends/buffer-trend-report',
    '/dbm/dbm-norm-suggestions',
    '/logistics/intransit-whereabouts',
    '/procurement/material-coverage-open-sales',
    '/procurement-planning/planning',
    "/procurement/insights-and-trends/day-wise-coverage",
    '/planning/simulative-fullkit',
    '/logistics/intransit-whereabouts',
    '/procurement/material-requirement',
    '/procurement/insights-and-trends/rmpm',
    '/procurement/insights-and-trends/rmpm-buffer-trends',
    '/procurement/insights-and-trends/rmpm-orderwise-coverage',
    '/production-planning-and-scheduling/order-rescheduling',
    '/procurement/insights-and-trends/rmpm-expediting-rm-suppliers',
    '/production-planning-scheduling/enquiry-response',
    '/production-planning-scheduling/insight-and-trends/bm-trends',
    '/production-planning-scheduling/deptwise-bm-report',
    '/production-planning-scheduling/insight-and-trends/stpl-full-kits',
    '/production-planning-scheduling/full-kit-assignment',
    '/supply-chain-intelligence-hub/sdr',
    '/master-data-management/data-modification-history',
    '/supply-chain-intelligence-hub/merchandising-grid',
    '/production-planning-and-scheduling/due-date-quotation',
    '/production-planning-scheduling/insight-and-trends/order-at-risk',
    '/production-planning-scheduling/insight-and-trends/order-balance',
    '/poogi/insight-and-trends/resource-utilization-wip-profile',
    '/poogi/insight-and-trends/otif-analysis',
    '/production-planning-scheduling/insights-and-trends/fol-summary',
    '/production-planning-scheduling/dynamic-release-mangement',
    '/poogi/insight-and-trends/ot-and-if-analysis',
    '/production-planning-scheduling/insights-and-trends/elapsed-time',
    '/poogi/reasons-for-delayed-orders',
    '/poogi/insight-and-trends/ot-and-if-analysis',
    '/poogi/insight-and-trends/top-failure-reasons',
    '/poogi/insight-and-trends/trend-of-failure-reason',
    '/poogi/insight-and-trends/lead-time',
    '/production-planning-scheduling/overall-bm-report',
    /**Delivery and Intelligence hub */
    '/manufacturing-intelligence-hub/delivery-performance/bm-trends',
    '/manufacturing-intelligence-hub/delivery-performance/otif-analysis',
    '/manufacturing-intelligence-hub/delivery-performance/ot-and-if-analysis',
    '/manufacturing-intelligence-hub/delivery-performance/lead-time',

    '/manufacturing-intelligence-hub/congestion-analysis/elapsed-time',
    '/manufacturing-intelligence-hub/congestion-analysis/orders-at-risk',
    '/manufacturing-intelligence-hub/congestion-analysis/order-balance',

    '/manufacturing-intelligence-hub/forward-exceution/fol-summary',
    '/manufacturing-intelligence-hub/forward-exceution/stpl-and-fullkit',
    '/manufacturing-intelligence-hub/forward-exceution/day-wise-coverage',
    '/manufacturing-intelligence-hub/forward-exceution/rm-pm-order-wise-coverage',
    '/manufacturing-intelligence-hub/forward-exceution/expetiting-rm-supplier',
    '/manufacturing-intelligence-hub/forward-exceution/rm-pm-buffer-trend',

    '/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons',
    '/manufacturing-intelligence-hub/improvement-areas/trends-failure-reasons',
    '/manufacturing-intelligence-hub/improvement-areas/resource-wip-profile',
    '/landing-page'
  ]
  const urlPermissionStr: any = localStorage.getItem('url_permission')
  const urlPermissionArr = JSON?.parse(urlPermissionStr) || []

  const newUrlPermiss = [...authenPage, ...urlPermissionArr]

  const urlCurrent = window.location.pathname

  if (urlAllPage.includes(urlCurrent)) {
    if (newUrlPermiss.includes(urlCurrent)) {
      return (
        <Suspense fallback={<div className="d-flex vh-100">Loading...</div>}>
          {children}
        </Suspense>
      )
    } else {
      return <PageForbidden />
    }
  } else {
    return <PageNotFound />
  }
}

export const initRoutes = (): RouteObject[] => {
  const routes: RouteObject[] = []

  routes.push({ path: '/login', element: lazyLoad(<Login />) })
  routes.push({
    path: '/forgot-password',
    element: lazyLoad(<ForgotPassword />)
  })
  routes.push({
    path: '/change-password',
    element: lazyLoad(<ChangePassword />)
  })

  return [
    ...routes,
    // authenticated pages

    {
      path: '/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<Home />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/manual-upload',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ManualUpload />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/ist-forced-closure',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<IstForced />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/store-status',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<StoreStatus />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/availability-comparison',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<Availability />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/ist-status',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<IstStatus />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/profile',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<Profile />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/control-panel',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ControlPanel />)
        },
        {
          index: true,
          path: 'view-modify',
          element: lazyLoad(<ViewModify />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/saved-drafts',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<SavedDrafts />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/task-status',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TaskStatus />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/task-pending',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TaskPendingForReview />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/control-panel/add',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<AddRecord />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/control-panel/delete',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DeleteRecord />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/master-data-management/data-modification-history',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DataModificationHistory />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },

    // mto mdm pages
    {
      path: '/mto/master-data-management/control-panel',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOControlPanel/>)
        },
        {
          index: true,
          path: 'view-modify',
          element: lazyLoad(<MTOViewModify />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/saved-drafts',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOSavedDrafts />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/task-status',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOTaskStatus />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/task-pending',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOTaskPendingForReview />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/control-panel/add',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOAddRecord />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/data-modification-history',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTODataModificationHistory />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },


    //

     // interceptor pages
     {
      path: '/masters-interceptor/control-panel/',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MastersInterceptor url={"/master-data-management/control-panel"}/>)
        },
        {
          index: true,
          path: 'view-modify',
          element: lazyLoad(<MTOViewModify />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/masters-interceptor/saved-drafts',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MastersInterceptor url={'/master-data-management/saved-drafts'} />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/masters-interceptor/task-status',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MastersInterceptor url={"/master-data-management/task-status"} />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/masters-interceptor/task-pending',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MastersInterceptor url={'/master-data-management/task-pending'} />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/mto/master-data-management/control-panel/add',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MTOAddRecord />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: "/masters-interceptor/data-modification-history",
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MastersInterceptor url={'/master-data-management/data-modification-history'} />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },


    //

    {
      path: '/supply-chain-intelligence-hub/planning',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<Planning />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/planning',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<Planning />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/bpr',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BPR />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/open-expediting-requests',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OpenExpeditingRequests />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/merchandising-grid',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MCGrid />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/logistics/intransit-whereabouts',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<InTransitWhereAbouts />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/permission-forbidden',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<PageForbidden />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/bor',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BuyerOrderReport />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/insights-and-trends/research-insights',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ResearchInsights />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/not-found',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<PageNotFound />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/insights-and-trends/guided-insights',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<GuidedInsights />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/insights-and-trends/buffer-trend-report',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BufferTrendReport />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/rrr',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RRR />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/insights-and-trends/buffer-trends',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BufferTrends />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/dbm/dbm-norm-suggestions',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DBM />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/enquiry-response',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<EnquiryResponse />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insight-and-trends/bm-trends',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BMTrends />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insight-and-trends/stpl-full-kits',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<STPLAndFullKits />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insight-and-trends/order-at-risk',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OrderAtRisk />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insight-and-trends/order-balance',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OrderBalance />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/dbm/dbm-norm-suggestions',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DBM />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/material-coverage-open-sales',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MaterialCov />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement-planning/planning',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ProcurementPlanning />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/planning/simulative-fullkit',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<SimulateFullKit />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/insights-and-trends/day-wise-coverage',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DayWiseCoverage />)

        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/insights-and-trends/rmpm-orderwise-coverage',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMPMOrderwiseCoverage />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/material-requirement',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<MaterialRequirement />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },

    {
      path: '/production-planning-scheduling/full-kit-assignment',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<FullKitAssignment />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/insights-and-trends/rmpm-buffer-trends',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMPMBufferTrends />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/deptwise-bm-report',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DptWiseBMReport />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/procurement/insights-and-trends/rmpm-expediting-rm-suppliers',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMExpeditionSuppliers />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/supply-chain-intelligence-hub/sdr',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<SupplierDispatchReport />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    }
    ,
    {
      path: '/production-planning-and-scheduling/order-rescheduling',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OrderRescheduling />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/resource-utilization-wip-profile',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ResourceUtilization />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/otif-analysis',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OTIFAnalysis />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insights-and-trends/fol-summary',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<FOLSummary />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/dynamic-release-mangement',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DynamicReleaseManagement />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/reasons-for-delayed-orders',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ReasonForDelayOrder />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-and-scheduling/due-date-quotation',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DueDateQuotation />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/insights-and-trends/elapsed-time',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ElapsedTime />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/ot-and-if-analysis',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OTAndIFAnalysis />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/top-failure-reasons',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TopFailureReasons />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/trend-of-failure-reason',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TrendsOfFailureReason />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/poogi/insight-and-trends/lead-time',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<LeadTime />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/production-planning-scheduling/overall-bm-report',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OverallBmReport />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/delivery-performance/bm-trends',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<BMTrends />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/delivery-performance/otif-analysis',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OTIFAnalysis />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/delivery-performance/ot-and-if-analysis',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OTAndIFAnalysis />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/delivery-performance/lead-time',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<LeadTime />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/congestion-analysis/elapsed-time',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ElapsedTime />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/congestion-analysis/orders-at-risk',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OrderAtRisk />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/congestion-analysis/order-balance',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<OrderBalance />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/fol-summary',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<FOLSummary />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/stpl-and-fullkit',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<STPLAndFullKits />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/day-wise-coverage',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<DayWiseCoverage />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/rm-pm-order-wise-coverage',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMPMOrderwiseCoverage />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/expetiting-rm-supplier',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMExpeditionSuppliers />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/forward-exceution/rm-pm-buffer-trend',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<RMPMBufferTrends />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/improvement-areas/top-failure-reasons',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TopFailureReasons />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/improvement-areas/trends-failure-reasons',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<TrendsOfFailureReason />)
        }
      ]
    },
    {
      path: '/manufacturing-intelligence-hub/improvement-areas/resource-wip-profile',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<ResourceUtilization />)
        }
      ]
    },
    {
      path: '/landing-page',
      element: <AppLayout />,
      children: [
        {
          index: true,
          element: lazyLoad(<LandingPage />)
        }
      ]
    }
  ]
}
