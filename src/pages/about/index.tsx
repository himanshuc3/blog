import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import './styles.scss'
import dp from '../../images/dp.png'
import github from '../../images/github.png'
import Socials from "../../components/socials"
import { SOCIAL_LINKS } from "../../utils/constants"
import { ThemeContext } from '../../hooks/themeContext'
import BaseComponent from "../../containers/base"

const AboutPage: React.FC<PageProps> = () => {
    const { darkTheme, toggleTheme } = React.useContext(ThemeContext)

    return (
        <BaseComponent className="about-wrapper">
            <div className="poster">
                <div className="left">

                    <h1><span className="emoji-wave">👋</span> Who am I</h1>
                    <p>My name is <i>Himanshu Chhabra</i> and I’m speechless <br />
                        to meet you virtually. <br /><br />
                        If you’re a fidgety individual, eternally confused
                        about <br /> life and constantly making non optimal life decisions, <br /> you’ve found yourself a duplicate. Let’s connect on <br /><a href={SOCIAL_LINKS.INSTA} target="_blank" className="chunky-underline link">insta</a> or <a href={SOCIAL_LINKS.X} className="chunky-underline" target="_blank">x</a>. <br /> <br />

                        I (usually) write about my learnings and frustations <br /> derived from frontend experiences. I also temporarily <br /> plan to write about <a className="chunky-underline" href={"https://nodejs.org/en"} target="_blank">node.js</a>, <a className="chunky-underline" href={"https://go.dev/"} target="_blank">golang</a> and everything in  <br /> between.

                        <br /> <br />When annoyed with my state of living, my favorite <br />timepass is blaming the environment around <br />me which includes location’s aqi, roads among <br /> potholes, lack of sidewalks and general infrastructure of the city 🇮🇳
                        <br /><br />
                        Currently putting my day efforts <a href="https://razorpay.com" target="_blank" className="company">@Razorpay</a>.</p>
                    <Socials />
                </div>
                <div className="right">
                    <img src={dp} alt="" className="src" />
                </div>
            </div>
            <div className="section">
                <h1>🧑‍💻 Setup configuration</h1>
                <p className="description">This blog is built on <a href="gatsbyjs.com" target="_blank" className="chunky-underline">Gatsby.js</a> and hosted on  <a href="https://netlify.com" target="_blank" className="chunky-underline">Netlify</a> and skeleton designed on <a href="www.figma.com" className="chunky-underline">figma</a>.
                </p>
            </div>
            <div className="section projects">
                <h1>🛠️ Projects</h1>
                <div className="in-progress">Work in progress. Checkout <a href={SOCIAL_LINKS.GITHUB} target="_blank" className="chunky-underline"><img src={github} alt="" /></a> for updates.</div>
            </div>
        </BaseComponent>
    )
}

export default AboutPage

export const Head: HeadFC = () =>
    <>
        <title>Blog | Himanshu</title>
        <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
        <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
    </>