import {
  ChakraProvider,
  ColorModeScript,
  createLocalStorageManager,
  createStandaloneToast,
} from '@chakra-ui/react'
import { DefiManagerProvider } from 'features/defi/contexts/DefiManagerProvider/DefiManagerProvider'
import React from 'react'
import { ErrorBoundary } from 'react-error-boundary'
import { HelmetProvider } from 'react-helmet-async'
import { Provider as ReduxProvider } from 'react-redux'
import { HashRouter } from 'react-router-dom'
import { PersistGate } from 'redux-persist/integration/react'
import { ScrollToTop } from 'Routes/ScrollToTop'
import { Zendesk } from 'components/Zendesk/Zendesk'
import { AppProvider } from 'context/AppProvider/AppContext'
import { BrowserRouterProvider } from 'context/BrowserRouterProvider/BrowserRouterProvider'
import { FoxEthProvider } from 'context/FoxEthProvider/FoxEthProvider'
import { I18nProvider } from 'context/I18nProvider/I18nProvider'
import { ModalProvider } from 'context/ModalProvider/ModalProvider'
import { PluginProvider } from 'context/PluginProvider/PluginProvider'
import { TransactionsProvider } from 'context/TransactionsProvider/TransactionsProvider'
import { WagmiProvider } from 'context/WagmiProvider/WagmiProvider'
import { KeepKeyProvider } from 'context/WalletProvider/KeepKeyProvider'
import { WalletProvider } from 'context/WalletProvider/WalletProvider'
import { ErrorPage } from 'pages/ErrorPage/ErrorPage'
import { SplashScreen } from 'pages/SplashScreen/SplashScreen'
import { persistor, store } from 'state/store'
import { theme } from 'theme/theme'

type ProvidersProps = {
  children: React.ReactNode
}

const manager = createLocalStorageManager('ss-theme')

export function AppProviders({ children }: ProvidersProps) {
  const { ToastContainer } = createStandaloneToast()
  return (
    <HelmetProvider>
      <ReduxProvider store={store}>
        <WagmiProvider>
          <PluginProvider>
            <ColorModeScript storageKey='ss-theme' />
            <ChakraProvider theme={theme} colorModeManager={manager} cssVarsRoot='body'>
              <ToastContainer />
              <Zendesk />
              <PersistGate loading={<SplashScreen />} persistor={persistor}>
                <HashRouter basename='/'>
                  <ScrollToTop />
                  <BrowserRouterProvider>
                    <I18nProvider>
                      <WalletProvider>
                        <KeepKeyProvider>
                          <ErrorBoundary FallbackComponent={ErrorPage}>
                            <ModalProvider>
                              <TransactionsProvider>
                                <AppProvider>
                                  <FoxEthProvider>
                                    <DefiManagerProvider>{children}</DefiManagerProvider>
                                  </FoxEthProvider>
                                </AppProvider>
                              </TransactionsProvider>
                            </ModalProvider>
                          </ErrorBoundary>
                        </KeepKeyProvider>
                      </WalletProvider>
                    </I18nProvider>
                  </BrowserRouterProvider>
                </HashRouter>
              </PersistGate>
            </ChakraProvider>
          </PluginProvider>
        </WagmiProvider>
      </ReduxProvider>
    </HelmetProvider>
  )
}
