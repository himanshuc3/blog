import * as React from 'react'
import Header from '../header'
import Footer from '../footer'


const Skeleton: React.FC<{ children: React.ReactNode, className: string }> = ({ children, className }) => {
    return (
        <div className={className}>
            <Header />
            {children}
            <Footer />
        </div>
    )
}

export default Skeleton