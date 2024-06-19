import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ProductFilter from './index'
import { MainService } from '../../../module-main/services/api'
import { handleDataProductFilter } from '../../../helpers/utils'

interface ProductProps {
  endpoint: string
}

export default forwardRef(({ ...props }: ProductProps, ref) => {
  // const { t } = useTranslation()
  const [productFilterLoading, setProductFilterLoading] =
    useState<boolean>(false)
  const [listBrand, setListBrand] = useState<any>([])
  const [listSubBrand, setListSubBrand] = useState<any>([])
  const [listCategory, setListCategory] = useState<any>([])
  const [listStyle, setListStyle] = useState<any>([])
  const [listFit, setListFit] = useState<any>([])
  // const [listMRP, setListMRP] = useState<any>([])
  const [listLaunchPeriod, setListLaunchPeriod] = useState<any>([])

  const [brand, setBrand] = useState<any>([])
  const [subBrand, setSubBrand] = useState<any>([])
  const [category, setCategory] = useState<any>([])
  const [fit, setFit] = useState<any>([])
  const [style, setStyle] = useState<any>([])
  // const [mrp, setMrp] = useState<any>([])
  const [launchPeriod, setLaunchPeriod] = useState<any>([])

  useEffect(() => {
    async function initProductFilter () {
      setProductFilterLoading(true)
      const { data } = await MainService.getProductFilter(props.endpoint)
      const productFilter = data?.data
      const {
        listBrand,
        listSubBrand,
        listCategory,
        listStyle,
        listFit,
        listLaunchPeriod
      } = handleDataProductFilter(productFilter)

      setListBrand(listBrand)
      setListSubBrand(listSubBrand)
      setListCategory(listCategory)
      setListStyle(listStyle)
      setListFit(listFit)
      setListLaunchPeriod(listLaunchPeriod)

      setProductFilterLoading(false)
    }
    initProductFilter()
  }, [])

  const productFilter = [
    {
      icon: '/assets/img/ist/target.svg',
      placeholder: process.env.REACT_APP_PRODUCT_PERMISSION_L1,
      options: listBrand,
      value: brand,
      onChange: setBrand,
      top: 18
    },
    {
      icon: '/assets/img/ist/target.svg',
      placeholder: process.env.REACT_APP_PRODUCT_PERMISSION_L2,
      options: listSubBrand,
      value: subBrand,
      onChange: setSubBrand,
      top: 18
    },
    {
      icon: '/assets/img/ist/option.svg',
      placeholder: process.env.REACT_APP_PRODUCT_PERMISSION_L3,
      options: listCategory,
      value: category,
      onChange: setCategory
    },
    {
      icon: '/assets/img/ist/option.svg',
      placeholder: process.env.REACT_APP_PRODUCT_FILTER_4,
      options: listStyle,
      value: style,
      onChange: setStyle
    },
    {
      icon: '/assets/img/ist/margin.svg',
      placeholder: process.env.REACT_APP_PRODUCT_FILTER_5,
      options: listFit,
      value: fit,
      onChange: setFit
    },
    {
      icon: '/assets/img/ist/target.svg',
      placeholder: process.env.REACT_APP_PRODUCT_FILTER_6,
      options: listLaunchPeriod,
      value: launchPeriod,
      onChange: setLaunchPeriod,
      top: 17
    }
  ]

  useImperativeHandle(ref, () => ({
    getProductFilterValue () {
      return getProductFilterValue()
    },
    resetFilter () {
      resetFilter()
    }
  }))

  const resetFilter = () => {
    setBrand([])
    setSubBrand([])
    setCategory([])
    setStyle([])
    setFit([])
    setLaunchPeriod([])
  }

  const getProductFilterValue = () => {
    return {
      brand,
      subBrand,
      category,
      style,
      fit,
      launchPeriod
    }
  }

  return (
    <ProductFilter
      productFilter={productFilter}
      loading={productFilterLoading}
    />
  )
})
