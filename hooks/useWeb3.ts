import { ethers } from 'ethers'
import { useContext, useState } from 'react'
import { ContractInstance } from '../config/ContractInstance'
import { networks } from '../config/config'
import { AppContext } from '../context/AppContext'

export const useWeb3 = () => {
	const {
		setLoader,
		connectedAddress,
		setConnectedAddress,
		wallet,
		showWallet,
	} = useContext(AppContext)

	const [incorrectChainId, setIncorrectChainId] = useState(false)
	const [chainId, setChainId] =
		useState<typeof ContractInstance.chainId>(80001)

	const getProvider = async (
		_throwErr: boolean = false
	): Promise<ethers.providers.Web3Provider> => {
		if (ContractInstance.provider !== undefined) {
			if (!connectedAddress) {
				const walletAddress = await ContractInstance.provider
					.getSigner()
					.getAddress()
				setConnectedAddress(walletAddress)
			}
			return ContractInstance.provider
		} else return ContractInstance.provider
	}

	const connect = async () => {
		const ethereum = (window as any)?.ethereum
		if (ethereum) {
			await ethereum.request({
				method: 'eth_requestAccounts',
			})
			ContractInstance.provider = new ethers.providers.Web3Provider(
				ethereum
			)

			const { chainId } = await ContractInstance.provider.getNetwork()

			if (Object.keys(networks).includes(chainId.toString())) {
				ContractInstance.chainId = chainId as keyof typeof networks

				setChainId(ContractInstance.chainId)
				setIncorrectChainId(false)
			} else {
				setIncorrectChainId(true)
			}

			setLoader(false)

			return getProvider()
		}
	}

	const initialConnection = async () => {
		const ethereum = (window as any)?.ethereum
		if (ethereum) {
			const provider = new ethers.providers.Web3Provider(ethereum)
			const accounts = await provider.listAccounts()
			if (accounts.length > 0) {
				connect()
			}
		}
	}

	return {
		setLoader,
		connectedAddress,
		setConnectedAddress,
		wallet,
		showWallet,
		getProvider,
		connect,
		chainId,
		initialConnection,
		incorrectChainId,
		setIncorrectChainId,
	}
}
