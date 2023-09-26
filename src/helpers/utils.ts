import { type NavigateFunction } from 'react-router'
import { LOCAL_STORAGE_KEY, ROUTES } from './constants'
import { MainService } from '../module-main/services/api'
import { notifyError } from './notify'

// clear cached token and redirect to sso login
export const loginRedirect = (navigate?: NavigateFunction) => {
  localStorage.removeItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD)

  saveOriginalUrlBeforeLogin()

  if (navigate != null) {
    navigate(ROUTES.landing, { replace: true })
  } else {
    window.location.href = ROUTES.landing
  }
}

export const login = (navigate: NavigateFunction) => {
  const localLogin = isTrue(process.env.REACT_APP_ENABLE_LOCAL_LOGIN)

  if (localLogin) {
    navigate(ROUTES.internalLogin, { replace: true })
  } else {
    window.location.href = String(process.env.REACT_APP_SSO_LOGIN_URL)
  }
}

// save current url in session storage
const saveOriginalUrlBeforeLogin = () => {
  const pathname = window.location.pathname
  if (
    pathname !== '/' &&
    pathname !== ROUTES.logout &&
    pathname !== ROUTES.landing
  ) {
    sessionStorage.setItem(
      'original_url',
      window.location.pathname + window.location.search
    )
  }
}

// navigate to the original url after user login
export const getOriginalUrl = () => {
  const originalUrl = sessionStorage.getItem('original_url')
  const originalUrlType = sessionStorage.getItem('original_url_type')
  if (originalUrl || originalUrlType) {
    sessionStorage.removeItem('original_url')
    // original_url_type for external projects
    sessionStorage.removeItem('original_url_type')
  }
  return { url: originalUrl, type: originalUrlType }
}

export const hasUdfToken = () => {
  return !!localStorage.getItem(LOCAL_STORAGE_KEY.TOKEN_PAYLOAD)
}

/**
 * Utilities to compare between two variables with same supported types: string | number | boolean
 */
export const compare = <T = string | number | boolean>(a: T, b: T) => {
  if (a === b) return 0
  else if (a > b) return 1
  return -1
}

/**
 * Utilities to remove keys with value is undefined, null or empty
 * Useful for clearing parameter objects, to not display empty parameters in the url
 */
export const cleanObject = (object?: Record<string, any>) => {
  if (object == null) return {}
  Object.keys(object).forEach((key) => {
    const value = object[key]
    if (value === undefined || value === null || value === '') {
      delete object[key]
    }
  })
  return object
}

export const formatUpperCaseFirstLetter = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase()
}

/*
 * Ignore operators that handled by imperva for sql injection
 */
export const sanitizeUserSearchText = (search: string) => {
  const value = search.trim()

  // 1. single quote: if only one and it's at the last place, Imperva consider it's sql injection
  if (
    value.split("'").length === 2 &&
    value.substring(value.length - 1) === "'"
  ) {
    return search.replace("'", '')
  }
  return search
}

export const isTrue = (value?: string | number) => {
  return (
    (typeof value === 'string' && value?.toUpperCase() === 'TRUE') ||
    value === 1
  )
}

export const handleDownload = async (nameApi: string, nameFile: string) => {
  try {
    const token = await MainService.refreshToken();
    const response = await fetch(`${process.env.REACT_APP_API_HOST}${nameApi}`, {
      headers: {
        Authorization: `Bearer ${token?.access}`
      }
    })  
    // Convert response to blob object
    const blob = await response.blob()
    // Create download URL for blob object
    const url = URL.createObjectURL(blob)
  
    // Trigger download
    const link = document.createElement('a')
    link.href = url
    if(nameFile===''){
      const temp = response.headers.get('content-disposition')?.split('=');
      if(temp) nameFile = temp[temp.length-1];
      link.setAttribute('download', `${nameFile}`)
    }
    else{
      link.setAttribute('download', `${nameFile}.csv`)
    }
    document.body.appendChild(link)
    link.click()
    // Clean up download URL
    URL.revokeObjectURL(url)
  } catch (error:any) {
    notifyError(error);
  }
 
}

export const handleDataProductFilter = (data: any) => {
  const filterDuplicateValues = (listData: any) => {
    const newListData = listData.filter((item: string, index: number) => {
      return listData.indexOf(item) == index
    })

    return newListData
  }

  let listCategory = [] as string[]
  let listStyle = [] as string[]
  let listFit = [] as string[]
  let listLaunchPeriod = [] as any[]
  let listSubBrand = [] as any[]
  let listBrand = [] as any[]

  listBrand = Object.keys(data).map((item: string) => ({
    value: item,
    label: item
  }))

  // list brand
  Object.keys(data).map((brand: any) => {
    listSubBrand = Object.keys(data[brand]).map((item: string) => ({
      value: item,
      label: item
    }))

    // list subBrand
    if (data[brand]) {
      Object.keys(data[brand]).map((subBrand: any) => {
        listCategory.push(...Object.keys(data[brand][subBrand]))

        // list category
        if (data[brand][subBrand]) {
          Object.keys(data[brand][subBrand]).map((category: any) => {
            listStyle.push(...Object.keys(data[brand][subBrand][category]))

            // List style
            if (data[brand][subBrand][category]) {
              Object.keys(data[brand][subBrand][category]).map((style: any) => {
                listFit.push(
                  ...Object.keys(data[brand][subBrand][category][style])
                )

                // list launch period
                if (data[brand][subBrand][category][style]) {
                  Object.keys(data[brand][subBrand][category][style]).map(
                    (fit: any) => {
                      listLaunchPeriod.push(
                        ...Object.values(
                          data[brand][subBrand][category][style][fit][0]
                        )
                      )
                    }
                  )
                }
              })
            }
          })
        }
      })
    }
  })

  listCategory = filterDuplicateValues(listCategory).map((item: string) => ({
    value: item,
    label: item
  }))
  listStyle = filterDuplicateValues(listStyle).map((item: string) => ({
    value: item,
    label: item
  }))
  listFit = filterDuplicateValues(listFit).map((item: string) => ({
    value: item,
    label: item
  }))
  listLaunchPeriod = filterDuplicateValues(listLaunchPeriod).map((item: string) => ({
    value: item,
    label: item
  }))

  return {
    listBrand,
    listSubBrand,
    listCategory,
    listStyle,
    listFit,
    listLaunchPeriod
  }
}

export const format_number = (num: number) => {
  function parseNumber(numb: any) {
    if (typeof numb === 'number') {
      // If the input is already a number, return it as is
      return numb
    } else if (typeof numb === 'string') {
      // If the input is a string, parse it and return an integer or a float
      if (numb.includes('.')) {
        return parseFloat(numb)
      } else {
        return parseInt(numb)
      }
    } else {
      // If the input is not a number or a string, return null
      return null
    }
  }

  if (num >= 9999999999) {
    // If the number is greater than or equal to 1 crore
    return {
      compare: '>',
      digits: 999,
      letter: 'Cr'
    }
  }

  const num_str = String(Math.floor(num)) // Convert the number to a string
  const num_len = num_str.length // Get the length of the string

  let digits: any = '0'
  let letter = ''
  // Calculate the number of digits and the letter representation
  if (num_str === '0') {
    letter = ''
  } else if ([1, 2, 3].includes(num_len)) {
    digits = num_str
    letter = 'R'
  } else if (num_len === 4) {
    digits = (num / 1000).toFixed(1)
    letter = 'K'
  } else if ([5, 6].includes(num_len)) {
    digits = Math.round(num / 1000).toString()
    letter = 'K'
  } else if (num_len === 7) {
    digits = (num / 100000).toFixed(1)
    letter = 'L'
  } else if (num_len === 8) {
    digits = Math.round(num / 100000).toString()
    letter = 'L'
  } else if (num_len === 9) {
    digits = (num / 10000000).toFixed(1)
    letter = 'Cr'
  } else if (num_len === 10) {
    digits = Math.round(num / 10000000).toString()
    letter = 'Cr'
  } 
  digits = parseNumber(digits)
  // Combine the digits and letter representation into a single string
  return {
    compare: null,
    digits,
    letter
  }
} 

// Helper Function to Dynamically Map Roles fetched from Backend to the Frontend as required by the ArrowList Component.
export const generateRolesObject = (roles:Array<object>,permission:string[],is_admin:boolean) => {
  const rolesArray = [] as object[];
  const rolesObjectIST:{id:number,title:string,status:boolean,child:object[]} = {
          id:0,
          title:"",
          status:false,
          child:[],
  }
  const rolesObjectVF:{id:number,title:string,status:boolean,child:object[]} = {
    id:0,
    title:"",
    status:false,
    child:[],
  }
  
  roles.forEach((role:any)=>{

    if(role.name.startsWith("IST")){
      if(permission.includes("IST Admin") || is_admin){
        rolesObjectIST.id = 1;
        rolesObjectIST.title = "profile.tabContent.manageUsers.roles.interStoreTransfers";
        rolesObjectIST.child.push(role);
      }
    }
    else{
      if(permission.includes("Admin") || is_admin){
        rolesObjectVF.id = 2;
        rolesObjectVF.title = "profile.tabContent.manageUsers.roles.vectorFlow";
        rolesObjectVF.child.push(role);
      }
    }
  })

  if(rolesObjectIST.child.length > 0) rolesArray.push(rolesObjectIST);
  if(rolesObjectVF.child.length > 0) rolesArray.push(rolesObjectVF);
  return rolesArray;
}