import React from 'react'
import email from '../../images/email.png'
import github from '../../images/github.png'
import instagram from '../../images/instagram.png'
import linkedin from '../../images/linkedin.png'
import x from '../../images/x.png'
import rssfeed from '../../images/rss.png'
import './styles.scss'
import { SOCIAL_LINKS } from '../../utils/constants'


interface Props {

}


const SOCIALS: { src: string, to: string }[] = [
    {
        src: x,
        to: SOCIAL_LINKS.X
    },
    {
        src: github,
        to: SOCIAL_LINKS.GITHUB
    },
    {
        src: linkedin,
        to: SOCIAL_LINKS.LINKEDIN
    },
    {
        src: instagram,
        to: SOCIAL_LINKS.INSTA
    },
    {
        src: rssfeed,
        to: '/rss.xml'
    },
    {
        src: email,
        to: 'mailto:himanshu_chhabra@outlook.com?subject=I am such a stan of you man!'
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