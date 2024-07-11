import React from 'react'
import { ThemeProvider } from './src/hooks/themeContext'
import './src/styles/global.scss'

export const wrapRootElement = ({ element }) => (
    <ThemeProvider>{element} </ThemeProvider>
)