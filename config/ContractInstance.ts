import { BaseContract, ethers } from 'ethers'

import { networks } from './config'

export class ContractInstance {
	private static _provider: ethers.providers.Web3Provider

	public static get provider(): ethers.providers.Web3Provider {
		return ContractInstance._provider
	}

	public static set provider(provider: ethers.providers.Web3Provider) {
		ContractInstance._provider = provider
	}

	private static _chainId: keyof typeof networks

	public static get chainId(): keyof typeof networks {
		return ContractInstance._chainId
	}

	public static set chainId(value: keyof typeof networks) {
		ContractInstance._chainId = value
	}
}

export const getContractAddress = (
	network: keyof typeof networks,
	contract: keyof typeof networks[keyof typeof networks]
) => {
	const address = networks[network][contract]
	return address
}

export const getContractABI = async (
	contract: keyof typeof networks[keyof typeof networks]
) => {
	return Array.from<any>(
		(await import(`../contracts/${String(contract)}.json`)) as any
	)
}

export const getContract = async <X extends BaseContract>(
	contract: keyof typeof networks[keyof typeof networks]
): Promise<X> => {
	const abi = await getContractABI(contract)
	if (ContractInstance.provider && ContractInstance.chainId && abi) {
		const returnData = new ethers.Contract(
			getContractAddress(ContractInstance.chainId, contract),
			abi,
			ContractInstance.provider
		).connect(ContractInstance.provider.getSigner(0)) as X

		return returnData
	} else {
		throw new Error('Called without provider.')
	}
}
