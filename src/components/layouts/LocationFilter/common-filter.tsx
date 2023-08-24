import { forwardRef, useEffect, useImperativeHandle, useState } from 'react'
import LocationFilter from './index'
import { useTranslation } from 'react-i18next'
import { ISTService } from '../../../services/ist/api'

interface ProductProps {
  endpoint: {
    lcFilterList: string
  }
}

export default forwardRef(({ ...props }: ProductProps, ref) => {
  const { t } = useTranslation()
  const [locationFilterLoading, setLocationFilterLoading] =
    useState<boolean>(false)
  const [listMapIstLocGrp, setListMapIstLocGrp] =
    useState<any>([])
    const [listMapDonorLocationRegion, setListMapDonorLocationRegion] =
    useState<any>([])
  const [listMapdonorLocationName, setListMapdonorLocationName] = useState<any>(
    []
  )
  const [listMapDonorLocationSubType, setListMapDonorLocationSubType] =
    useState<any>([])
  const [
    listMapTransferPref,
    setListMapTransferPref
  ] = useState<any>([])
  const [
    listMapDonorReceiverLocationRegion,
    setListMapDonorReceiverLocationRegion
  ] = useState<any>([])
  const [
    listMapDonorReceiverLocationName,
    setListMapDonorReceiverLocationName
  ] = useState<any>([])
  const [
    listMapDonorReceiverLocationSubType,
    setListMapDonorReceiverLocationSubType
  ] = useState<any>([])

  const [istLocGrp, setIstLocGrp] = useState<any>([])
  const [donorLocationRegion, setDonorLocationRegion] = useState<any>([])
  const [donorLocationName, setDonorLocationName] = useState<any>([])
  const [donorLocationSubType, setDonorLocationSubType] = useState<any>([])
  const [transferPref, setTransferPref] = useState<any>([])
  const [receiverLocationRegion, setReceiverLocationRegion] = useState<any>([])
  const [receiverLocationName, setReceiverLocationName] = useState<any>([])
  const [receiverLocationSubType, setReceiverLocationSubType] = useState<any>(
    []
  )

  useEffect(() => {
    async function initLocationFilter () {
      setLocationFilterLoading(true)

      const {data: lcFilterListData} = await ISTService.getLocationFilterList(props.endpoint.lcFilterList)

      setListMapIstLocGrp(
        lcFilterListData?.ist_loc_grp.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapDonorLocationRegion(
        lcFilterListData?.donor_location?.donor_wh_region.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapdonorLocationName(
        lcFilterListData?.donor_location?.donor_wh_name.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapDonorLocationSubType(
        lcFilterListData?.donor_location?.donor_wh_subtype.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapTransferPref(
        lcFilterListData?.transfer_preferences.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapDonorReceiverLocationRegion(
        lcFilterListData?.receiver_location?.receiver_wh_region.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapDonorReceiverLocationName(
        lcFilterListData?.receiver_location?.receiver_wh_name.map((item: any) => ({
          label: item,
          value: item
        }))
      )
      setListMapDonorReceiverLocationSubType(
        lcFilterListData?.receiver_location?.receiver_wh_subtype.map((item: any) => ({
          label: item,
          value: item
        }))
      )

      setLocationFilterLoading(false)
    }
    initLocationFilter()
  }, [])

  const locationFilter = [
    {
      placeholder: t('filter.location.placeholder.general.locGroup'),
      options: listMapIstLocGrp,
      value: istLocGrp,
      onChange: setIstLocGrp
    },
    {
      placeholder: t('filter.location.placeholder.general.dlRegion'),
      options: listMapDonorLocationRegion,
      value: donorLocationRegion,
      onChange: setDonorLocationRegion
    },
    {
      placeholder: t('filter.location.placeholder.general.dl'),
      options: listMapdonorLocationName,
      value: donorLocationName,
      onChange: setDonorLocationName
    },
    {
      placeholder: t('filter.location.placeholder.general.dlChannel'),
      options: listMapDonorLocationSubType,
      value: donorLocationSubType,
      onChange: setDonorLocationSubType
    },
    {
      placeholder: t('filter.location.placeholder.general.transferPref'),
      options: listMapTransferPref,
      value: transferPref,
      onChange: setTransferPref
    },
    {
      placeholder: t('filter.location.placeholder.general.rlRegion'),
      options: listMapDonorReceiverLocationRegion,
      value: receiverLocationRegion,
      onChange: setReceiverLocationRegion
    },
    {
      placeholder: t('filter.location.placeholder.general.rl'),
      options: listMapDonorReceiverLocationName,
      value: receiverLocationName,
      onChange: setReceiverLocationName
    },
    {
      placeholder: t('filter.location.placeholder.general.rlChannel'),
      options: listMapDonorReceiverLocationSubType,
      value: receiverLocationSubType,
      onChange: setReceiverLocationSubType
    }
  ]

  useImperativeHandle(ref, () => ({
    getLocationFilterValue () {
      return getLocationFilterValue()
    },
    resetFilter () {
      resetFilter()
    }
  }))

  const resetFilter = () => {
    setIstLocGrp([])
    setDonorLocationRegion([])
    setDonorLocationName([])
    setDonorLocationSubType([])
    setTransferPref([])
    setReceiverLocationRegion([])
    setReceiverLocationName([])
    setReceiverLocationSubType([])
  }

  const getLocationFilterValue = () => {
    return {
      istLocGrp,
      donorLocationName,
      donorLocationRegion,
      donorLocationSubType,
      transferPref,
      receiverLocationRegion,
      receiverLocationName,
      receiverLocationSubType
    }
  }

  return (
    <LocationFilter
      locationFilter={locationFilter}
      width={25}
      loading={locationFilterLoading}
    />
  )
})
