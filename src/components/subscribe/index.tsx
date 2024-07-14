import * as React from 'react'
import './styles.scss'

const Subscribe: React.FC<{}> = () => {
    return (
        <div className='subscribe'>
            <h2 className='heading'>Find some common interests?</h2>
            <h4 className='desc'>Subascribe for Frontend cruises. Naive backend interfaces. Performance benchmarking. <br />
                Infrastructure musings. Swatcch Bharat nakabhiyan & more topics.
            </h4>
            <div className='cta'>
                <input type="email" placeholder='Enter email...' />
                <button>Gimme Gimme</button>
            </div>
        </div>
    )
}

export default Subscribe