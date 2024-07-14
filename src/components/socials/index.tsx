import React from 'react'
import email from '../../images/email.png'
import github from '../../images/github.png'
import instagram from '../../images/instagram.png'
import linkedin from '../../images/linkedin.png'
import x from '../../images/x.png'
import rssfeed from '../../images/rss.png'
import './styles.scss'


interface Props {

}


const SOCIALS: { src: string, to: string }[] = [
    {
        src: x,
        to: 'x.com/himanshuc3'
    },
    {
        src: github,
        to: 'github.com/himanshuc3'
    },
    {
        src: linkedin,
        to: 'linkedin.com/himanshuc3'
    },
    {
        src: instagram,
        to: 'instagram.com/himanshuc3'
    },
    {
        src: rssfeed,
        to: 'rssfeed'
    },
    {
        src: email,
        to: 'emailto:sdfl'
    },
]


const Socials: React.FC<Props> = () => (

    <div className="socials">
        {SOCIALS.map(({ src, to }) => (
            <a href={to} target='__blank'><img src={src} to={to} /></a>
        ))}
    </div>
)

export default Socials