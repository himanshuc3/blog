import * as React from 'react'
import './styles.scss'

const Subscribe: React.FC<{}> = () => {
    return (
        <div>
            <h2>Find some common interests?</h2>
            <h4>Frontend cruises. Naive backend interfaces. Performance benchmarking. <br />
                Infrastructure musings. Swatcch Bharat nakabhiyan & more topics.
            </h4>
            <div>
                <input type="text" />
                <button>Gimme Gimme</button>
            </div>
        </div>
    )
}

export default Subscribe