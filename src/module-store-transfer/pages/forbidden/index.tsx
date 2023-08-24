import { SCPageForbidden, SCTextTitle, SCTextContent } from './styles'

const PageForbidden = () => {
  return (
    <SCPageForbidden>
      <SCTextTitle>Error 403 - Forbidden</SCTextTitle>
      <SCTextContent>
        You don’t have permission to access on this server
      </SCTextContent>
    </SCPageForbidden>
  )
}

export default PageForbidden
