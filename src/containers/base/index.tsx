import React, { ReactNode, useContext } from 'react'
import Skeleton from '../../components/skeleton'
import ThemeContext from '../../hooks/themeContext'


interface Props {
    children: ReactNode;
    className: string;
}


const BaseComponent: React.FC<Props> = ({ children, className }) => {

    const { darkTheme, toggleTheme } = useContext(ThemeContext)



    return (<Skeleton darkTheme={darkTheme} className={className} onToggleTheme={toggleTheme}>
        {children}
    </Skeleton>)
}

export default BaseComponent