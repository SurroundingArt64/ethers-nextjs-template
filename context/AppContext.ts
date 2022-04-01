import React, { Dispatch, SetStateAction } from 'react'

export const AppContext = React.createContext<{
	connectedAddress: string
	loader: boolean
	wallet: boolean
	setConnectedAddress: Dispatch<SetStateAction<string>>
	setLoader: Dispatch<SetStateAction<boolean>>
	showWallet: Dispatch<SetStateAction<boolean>>
}>({
	connectedAddress: '',
	loader: false,
	wallet: false,
	setConnectedAddress: () => {},
	setLoader: () => {},
	showWallet: () => {},
})
