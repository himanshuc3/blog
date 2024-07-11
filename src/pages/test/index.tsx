import React, { useEffect, useState } from 'react'
import SlotMachine from './slot-machine'
import './styles.scss'


interface Props {

}

const slotMachine = new SlotMachine()

const TestComponent: React.FC<Props> = () => {
    useEffect(() => {
        slotMachine.start()
    })

    return (
        <div className="slotRoot">

            < div className="slot-machine" >
                <div className="slots">
                    <div className="slot">
                        <div className="boxes"></div>
                    </div>
                    <div className="slot">
                        <div className="boxes"></div>

                    </div>
                    <div className="slot">
                        <div className="boxes"></div>

                    </div>
                </div>
            </div >
        </div>)
}

export default TestComponent