import * as React from 'react'
import Header from '../header'
import Footer from '../footer'
import './styles.scss'

interface Props {
    children: React.ReactNode;
    className: string;
    props: any;
    onToggleTheme: Function;
}

const Skeleton: React.FC<Props> = ({ children, className, ...props }) => {


    return (
        <div className={`${className} skeleton`}>
            <Header {...props} />
            {children}
            <Footer />
        </div>
    )
}

export default Skeleton