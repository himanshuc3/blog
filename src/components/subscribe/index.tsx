import * as React from 'react'
import { FrownOutlined, ArrowRightOutlined } from '@ant-design/icons'
import './styles.scss'

const Subscribe: React.FC<{}> = () => {
    return (
        <div className='subscribe'>
            <h2 className='heading' >Stay <del>hydrated</del> Updated?</h2>
            {/* <h4 className='desc'></h4> */}
            <h4 className='desc ibm-plex-mono'>Frontend explorations. Naive backend interfaces. Performance benchmarking. <br />
                Daily life rants. Swatcch Bharat nakabhiyan & more.
            </h4>
            <div className='cta'>
                <FrownOutlined style={{ color: "#777575", margin: '0 10px' }} />
                <input type="email" placeholder='Enter email...' />
                <button><ArrowRightOutlined style={{ width: '10px' }} /></button>
            </div>
        </div>
    )
}

export default Subscribe