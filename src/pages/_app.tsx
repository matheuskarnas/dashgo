import { ChakraProvider, ThemeProvider } from '@chakra-ui/react'
import { SidebarDrawerProvider } from '../context/SidebarDrawerContext'
import { AppProps } from 'next/app'
import { theme } from '../styles/theme'
import { makeServer } from '../services/mirage'
import { QueryClientProvider, QueryClient } from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'


if (process.env.NODE_ENV === 'development') {
  makeServer()
}

const queryClient = new QueryClient()

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <QueryClientProvider client={queryClient} >
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Component {...pageProps} />
        </SidebarDrawerProvider>
      </ChakraProvider>
      <ReactQueryDevtools />
    </QueryClientProvider>
  )
}

export default MyApp
