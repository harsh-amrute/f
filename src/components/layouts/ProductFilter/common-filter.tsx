import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import ProductFilter from './index'
import { MainService } from '../../../module-main/services/api'
import { handleDataProductFilter } from '../../../helpers/utils'
import { useTranslation } from 'react-i18next'

interface ProductProps {
  endpoint: string
}

export default forwardRef(({ ...props }: ProductProps, ref) => {
  const { t } = useTranslation()
  const [productFilterLoading, setProductFilterLoading] =
    useState<boolean>(false)
  const [listBrand, setListBrand] = useState<any>([])
  const [listSubBrand, setListSubBrand] = useState<any>([])
  const [listCategory, setListCategory] = useState<any>([])
  const [listStyle, setListStyle] = useState<any>([])
  const [listFit, setListFit] = useState<any>([])
  const [listMRP, setListMRP] = useState<any>([])

  const [brand, setBrand] = useState<any>([])
  const [subBrand, setSubBrand] = useState<any>([])
  const [category, setCategory] = useState<any>([])
  const [fit, setFit] = useState<any>([])
  const [style, setStyle] = useState<any>([])
  const [mrp, setMrp] = useState<any>([])

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
        listMRP
      } = handleDataProductFilter(productFilter)

      setListBrand(listBrand)
      setListSubBrand(listSubBrand)
      setListCategory(listCategory)
      setListStyle(listStyle)
      setListFit(listFit)
      setListMRP(listMRP)

      setProductFilterLoading(false)
    }
    initProductFilter()
  }, [])

  const productFilter = [
    {
      icon: '../assets/img/ist/target.svg',
      placeholder: t('filter.product.placeholder.brand'),
      options: listBrand,
      value: brand,
      onChange: setBrand,
      top: 18
    },
    {
      icon: '../assets/img/ist/target.svg',
      placeholder: t('filter.product.placeholder.subBrand'),
      options: listSubBrand,
      value: subBrand,
      onChange: setSubBrand,
      top: 18
    },
    {
      icon: '../assets/img/ist/option.svg',
      placeholder: t('filter.product.placeholder.category'),
      options: listCategory,
      value: category,
      onChange: setCategory
    },
    {
      icon: '../assets/img/ist/option.svg',
      placeholder: t('filter.product.placeholder.style'),
      options: listStyle,
      value: style,
      onChange: setStyle
    },
    {
      icon: '../assets/img/ist/margin.svg',
      placeholder: t('filter.product.placeholder.fit'),
      options: listFit,
      value: fit,
      onChange: setFit
    },
    {
      icon: '../assets/img/ist/money.svg',
      placeholder: t('filter.product.placeholder.mrp'),
      options: listMRP,
      value: mrp,
      onChange: setMrp,
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
    setMrp([])
  }

  const getProductFilterValue = () => {
    return {
      brand,
      subBrand,
      category,
      style,
      fit,
      mrp
    }
  }

  return (
    <ProductFilter
      productFilter={productFilter}
      loading={productFilterLoading}
    />
  )
})
