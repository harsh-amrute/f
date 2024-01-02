import React, { Suspense, useEffect } from 'react'
import {type RouteObject} from 'react-router-dom'
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
    '/profile'
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
    '/master-data-management/control-panel/delete'
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
          path:'view-modify',
          element: lazyLoad(<ViewModify />)
        },
        ...getStoreTransferModuleRoutes()
      ]
    },
    // {
    //   path: '/master-data-management/control-panel',
    //   element: <AppLayout />,
    //   children: [
    //     {
    //       index: true,
    //       path:'view-modify',
    //       element: lazyLoad(<ViewModify />)
    //     },
    //     ...getStoreTransferModuleRoutes()
    //   ]
    // },
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
          element: lazyLoad(<AddRecord/>)
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
          element: lazyLoad(<DeleteRecord/>)
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
    
  ]
}
