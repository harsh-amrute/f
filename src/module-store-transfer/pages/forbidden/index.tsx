import { SCPageForbidden, SCTextTitle, SCTextContent } from './styles'

const PageForbidden = () => {
  const params = new URLSearchParams(window.location.search);
  const URLPermission = params.get("URLPermission");
  return (
    <SCPageForbidden>
      <SCTextTitle>Error 403 - Forbidden</SCTextTitle>
      <SCTextContent>
        {URLPermission ?
          <> Contact your server administrator.</>
          : <>You don’t have permission to access on this server.</>}
      </SCTextContent>
    </SCPageForbidden>
  )
}

export default PageForbidden
