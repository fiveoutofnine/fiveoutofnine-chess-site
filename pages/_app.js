import { ChakraProvider } from '@chakra-ui/react'

import Fonts from '../components/other/Fonts'
import theme from '../components/other/theme'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Fonts />
      <Component {...pageProps} />
    </ChakraProvider>
  )
}

export default MyApp
