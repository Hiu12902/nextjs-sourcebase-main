import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { RecoilRoot } from 'recoil'
import { SessionProvider } from 'next-auth/react'
import '../utils/recoil'
import React from 'react'

export default function App({
	Component,
	pageProps: { session, ...pageProps },
}: AppProps) {
	const [showChild, setShowChild] = React.useState(false)
	React.useEffect(() => {
		setShowChild(true)
	}, [])

	if (!showChild) {
		return null
	}

	if (typeof window === 'undefined') {
		return <></>
	} else {
		return (
			<SessionProvider session={session}>
				<RecoilRoot>
					<Component {...pageProps} />
				</RecoilRoot>
			</SessionProvider>
		)
	}
}
