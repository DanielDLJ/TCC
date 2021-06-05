import '../styles/global.css'
import { DeviceDataProvider } from '../contexts/DeviceDataContext'

function MyApp({ Component, pageProps }) {
  return (
    <DeviceDataProvider>
      <Component {...pageProps} />
    </DeviceDataProvider>
  )
}

export default MyApp
