import React, { ReactNode, useContext, useEffect } from 'react'
import ThemeContext, { ThemeProvider } from './src/hooks/themeContext'
import Skeleton from './src/components/skeleton'
import './src/styles/global.scss'

export const wrapRootElement = ({ element }) => {

    return (
        <ThemeProvider>
            {element}
        </ThemeProvider>)

}