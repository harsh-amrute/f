import { useRoutes } from 'react-router'
import { initRoutes } from './app-routes'

function App () {
  return useRoutes(initRoutes())
}

export default App
