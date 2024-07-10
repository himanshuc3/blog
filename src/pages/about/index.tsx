import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import Skeleton from '../../components/skeleton'
import './styles.scss'
import dp from '../../images/dp.png'

const AboutPage: React.FC<PageProps> = () => {
    return (
        <Skeleton className="about-wrapper">
            <div className="poster">
                <div className="left">

                    <h1>👋 Who am I</h1>
                    <p>My name is Himanshu Chhabra 🔊 and I’m speechless <br />
                        to meet you virtually. <br /><br />
                        If you’re a fidgety individual, eternally confused
                        about <br /> life and constantly making non optimal life decisions, <br /> you’ve found yourself a duplicate. Let’s connect on insta or x. <br /> <br />

                        I (usually) write about my learnings and frustations <br /> derived from frontend experiences. I also temporarily <br /> plan to write about node.js, golang and everything in  <br /> between.

                        When annoyed with my state of living, I rant <br /> thoroughly about location’s aqi, roads among <br /> potholes and general infrastructure of the city 🇮🇳
                        <br />
                        Currently putting my day efforts @Razorpay.</p>
                    <div>Socials</div>
                </div>
                <div className="right">
                    <img src={dp} alt="" className="src" />
                </div>
            </div>
            <div>
                <h1>🧑‍💻 Setup configuration</h1>
                <p>This blog is built on Gatsby.js and hosted on <br /> hostinger and skeleton designed on figma.
                </p>
            </div>
            <div className="projects">
                <h1>🛠️ Projects</h1>
                <div>Work in progress</div>
            </div>
        </Skeleton>
    )
}

export default AboutPage

export const Head: HeadFC = () => <title>Home Page</title>
