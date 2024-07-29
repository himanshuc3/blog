import React, { useEffect, useContext, useState } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { XOutlined, GithubOutlined, LinkedinOutlined, InstagramOutlined, FileOutlined, CiOutlined } from '@ant-design/icons'
// TODO: Possible relative paths
import Socials from '../components/socials'
import himanchu from '../media/himanchu.mp3'
import useSound from 'use-sound'
import Skeleton from '../components/skeleton'
import ThemeContext from '../hooks/themeContext'
import Posts from '../components/posts'
import dp from '../images/dp.png'

import './styles.scss'
import onScrollHOC from "../components/onScroll"

const IndexPage: React.FC<PageProps> = () => {
  const { darkTheme, toggleTheme } = useContext(ThemeContext)
  const [play, { stop }] = useSound(himanchu, { interrupt: true })
  useEffect(() => stop, [])


  useEffect(() => {
    document.documentElement.setAttribute("data-theme", darkTheme ? "dark" : "light")
  }, [darkTheme])

  return (
    <Skeleton className="index-wrapper" onToggleTheme={toggleTheme} darkTheme={darkTheme}>
      <div className="poster">
        <div className="text">
          <h1><span className="emoji-wave">👋</span> Hi I’m <span className="chunky-underline">Himanshu</span> <span className="emoji-sound" onClick={play}>🔊</span> </h1>
          <p className="ibm-plex-mono">Building UI interfaces🎨 and engineering <a href="https://razorpay.com/" target="_blank"><span className="working-at">@Razorpay</span></a>.
            <i> Writing</i> about my technical experiences & <i>daily infra rants.</i></p>
          <Socials />
        </div>
        <div className="dp">
          <img src={dp} alt="My profile picture" className="image" />
        </div>
      </div>
      <div className="recent-posts">
        <div className="heading">
          <h1>🕮 Recent Articles</h1>
          <p className="heading_desc ibm-plex-mono">Presenting you with articles fresh out of the oven, decide for yourself if they satiate your reading appetite 🤓 or if I 🔥overcooked (most likely).</p>
        </div>

        <Posts />

      </div>
    </Skeleton >
  )
}

export default onScrollHOC(IndexPage)

export const Head: HeadFC = () =>
  <>
    <title>Blog | Himanshu</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
    <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
  </>
