/* eslint-disable @typescript-eslint/no-empty-function */
import React from 'react'
type ToastProviderProps = {
	children: React.ReactNode
}
export type ToastStateProps = {
	duration?: number
	message?: string
	open?: boolean
	type?: 'success' | 'warning' | 'info' | 'error'
}

const toastInit: ToastStateProps = {
	duration: 3000,
	message: '',
	open: true,
	type: 'success',
}

const ToastContext = React.createContext<
	[ToastStateProps, React.Dispatch<React.SetStateAction<ToastStateProps>>]
>([{}, () => {}])

const ToastProvider = (props: ToastProviderProps) => {
	const [state, setState] = React.useState<ToastStateProps>({})

	return (
		<ToastContext.Provider
			value={[
				state,
				(value) =>
					setState({
						...toastInit,
						...value,
					}),
			]}
		>
			{props.children}
		</ToastContext.Provider>
	)
}

export { ToastContext, ToastProvider }
