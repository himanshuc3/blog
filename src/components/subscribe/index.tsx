import * as React from 'react'
import './styles.scss'
import Input from '../input'

const Subscribe: React.FC<{}> = () => {
    return (
        <div className='subscribe'>
            <h2 className='heading' >🔗 Stay <del>hydrated</del> Updated?</h2>
            <p className='desc ibm-plex-mono'>Frontend explorations. Naive backend interfaces. Performance benchmarking. <br />
                Daily life rants. Swatcch Bharat nakabhiyan & more.
            </p>
            <Input disabled={true} placeholder="Coming Soon..." />
            {/* <p className='comming-soon ibm-plex-mono'>Comming soon</p> */}
        </div>
    )
}

export default Subscribe