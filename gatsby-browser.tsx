import React, { useEffect } from 'react'
import { ThemeProvider } from './src/hooks/themeContext'
import './src/styles/global.scss'

export const wrapRootElement = ({ element }) => {

    // useEffect(() => {
    //     function handleScroll(e: any) {
    //         console.log(e)
    //         console.log('some')
    //     }
    //     console.log(window.addEventListener)
    //     window.addEventListener('onkeydown', handleScroll)
    //     return () => {
    //         removeEventListener('onscroll', handleScroll)
    //     }
    // }, [])
    return (
        <ThemeProvider>{element} </ThemeProvider>)

}