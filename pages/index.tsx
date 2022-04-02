import type { NextPage } from 'next'
import Head from 'next/head'
import { getContract } from '../config/ContractInstance'
import { useWeb3 } from '../hooks/useWeb3'
import styles from '../styles/Home.module.css'
import { ERC20 } from '../types'

const Home: NextPage = () => {
	const { connectedAddress, incorrectChainId } = useWeb3()
	return (
		<div className={styles.container}>
			<Head>
				<title>Ethers NextJS</title>
				<meta name='description' content='' />
				<link rel='icon' href='/favicon.ico' />
			</Head>
			{connectedAddress && !incorrectChainId && (
				<>
					<button
						onClick={async () => {
							const ERC20 = await getContract<ERC20>('ERC20')
							const balance = await ERC20.balanceOf(
								connectedAddress
							)
							console.log({ balance: balance.toString() })
						}}
					>
						Fetch Balance
					</button>
				</>
			)}
		</div>
	)
}

export default Home
