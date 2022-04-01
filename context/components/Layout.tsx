import React, { useEffect } from 'react'
import { useWeb3 } from '../../hooks/useWeb3'

import styles from './Layout.module.scss'

export const Layout: React.FC = ({ children }) => {
	const { connect, connectedAddress, initialConnection, incorrectChainId } =
		useWeb3()
	useEffect(() => {
		initialConnection()
	}, [initialConnection])
	useEffect(() => {
		const handleChange = () => {
			connect()
		}

		if (connectedAddress) {
			const { ethereum } = window as any
			if (ethereum) {
				ethereum.on('chainChanged', handleChange)
				ethereum.on('accountsChanged', handleChange)
			}
		}
		return () => {
			const { ethereum } = window as any
			if (ethereum) {
				ethereum.removeListener('chainChanged', handleChange)
				ethereum.removeListener('accountsChanged', handleChange)
			}
		}
	}, [connectedAddress, connect])
	return (
		<>
			{!connectedAddress && (
				<>
					<button
						onClick={async () => {
							const provider = await connect()
							;(window as any).provider = provider
						}}
					>
						Connect
					</button>
				</>
			)}
			{connectedAddress && incorrectChainId && (
				<>
					<div className={styles.incorrectChain}>
						Please switch to Polygon
					</div>
				</>
			)}
			{connectedAddress && <>Connected to {connectedAddress}</>}

			<div className={styles.layout}>{children}</div>
		</>
	)
}
