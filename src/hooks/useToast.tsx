import React from 'react'
import { ToastContext } from '@/providers/ToastProvider'

export const useToast = () => React.useContext(ToastContext)

export const useToastValue = () => useToast()[0]

export const useSetToastValue = () => useToast()[1]
