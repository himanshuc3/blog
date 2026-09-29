import React, { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import './styles.scss'
import logo from './logo.svg'

export default function Logo() {
    const logoRef = useRef<HTMLImageElement>(null)

    useEffect(() => {
        if (!logoRef.current) {
            return
        }

        const context = gsap.context(() => {
            gsap.fromTo(
                logoRef.current,
                { autoAlpha: 0, rotation: -12, scale: 0.8 },
                {
                    autoAlpha: 1,
                    duration: 0.7,
                    ease: 'back.out(1.7)',
                    rotation: 0,
                    scale: 1,
                },
            )
        })

        return () => context.revert()
    }, [])

    return (
        <img ref={logoRef} className="brand-tree" src={logo} alt="" />
    )
}