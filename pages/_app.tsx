import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { AppContext } from '../context/AppContext'
import { useState } from 'react'
import Head from 'next/head'
import { Layout } from '../context/components/Layout'

function MyApp({ Component, pageProps }: AppProps) {
	const [connectedAddress, setConnectedAddress] = useState('')
	const [loader, setLoader] = useState(false)
	const [wallet, showWallet] = useState(false)
	return (
		<>
			<Head>
				<title>Ethers - NextJS</title>
				<meta name='description' content='' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			<AppContext.Provider
				value={{
					connectedAddress,
					setConnectedAddress,
					loader,
					setLoader,
					wallet,
					showWallet,
				}}
			>
				<Layout>
					<Component {...pageProps} />
				</Layout>
			</AppContext.Provider>
		</>
	)
}

export default MyApp
