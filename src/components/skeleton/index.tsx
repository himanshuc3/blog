import * as React from 'react'
import Header from '../header'
import Footer from '../footer'

interface Props {
    children: React.ReactNode;
    className: string;
    props: any;
}

const Skeleton: React.FC<Props> = ({ children, className, ...props }) => {

    // TODO: Should probably be a HOC

    return (
        <div className={className}>
            <Header {...props} />
            {children}
            <Footer />
        </div>
    )
}

export default Skeleton