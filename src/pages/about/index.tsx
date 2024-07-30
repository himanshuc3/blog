import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Skeleton from '../../components/skeleton'
import './styles.scss'
import dp from '../../images/dp.png'
import github from '../../images/github.png'
import Socials from "../../components/socials"

const AboutPage: React.FC<PageProps> = () => {
    return (
        <Skeleton className="about-wrapper">
            <div className="poster">
                <div className="left">

                    <h1><span className="emoji-wave">👋</span>Who am I</h1>
                    <p>My name is Himanshu Chhabra 🔊 and I’m speechless <br />
                        to meet you virtually. <br /><br />
                        If you’re a fidgety individual, eternally confused
                        about <br /> life and constantly making non optimal life decisions, <br /> you’ve found yourself a duplicate. Let’s connect on <br /><a href="" className="chunky-underline link">insta</a> or <a href="" className="chunky-underline">x</a>. <br /> <br />

                        I (usually) write about my learnings and frustations <br /> derived from frontend experiences. I also temporarily <br /> plan to write about node.js, golang and everything in  <br /> between.

                        <br /> <br />When annoyed with my state of living, I rant <br /> thoroughly about location’s aqi, roads among <br /> potholes and general infrastructure of the city 🇮🇳
                        <br /><br />
                        Currently putting my day efforts <a href="" className="company">@Razorpay</a>.</p>
                    <Socials />
                </div>
                <div className="right">
                    <img src={dp} alt="" className="src" />
                </div>
            </div>
            <div className="section">
                <h1>🧑‍💻 Setup configuration</h1>
                <p className="description">This blog is built on <a href="" className="chunky-underline">Gatsby.js</a> and hosted on  <a href="" className="chunky-underline">hostinger</a> and skeleton designed on <a href="" className="chunky-underline">figma</a>.
                </p>
            </div>
            <div className="section projects">
                <h1>🛠️ Projects</h1>
                <div className="in-progress">Work in progress. Checkout <a href="www.github.com/himanshuc3"><img src={github} alt="" /></a> for updates.</div>
            </div>
        </Skeleton>
    )
}

export default AboutPage

export const Head: HeadFC = () => <title>Home Page</title>
