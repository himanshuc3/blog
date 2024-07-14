import React, { useEffect, useContext } from "react"
import type { HeadFC, PageProps } from "gatsby"
import { XOutlined, GithubOutlined, LinkedinOutlined, InstagramOutlined, FileOutlined, CiOutlined } from '@ant-design/icons'
// TODO: Possible relative paths
import Socials from '../components/socials'
import himanchu from '../media/himanchu.mp3'
import useSound from 'use-sound'
import Skeleton from '../components/skeleton'
import ThemeContext from '../hooks/themeContext'
import dp from '../images/dp.png'

import './styles.scss'
import PostListing from "../components/postListing"


// TODO: Fetch from recent markdowns
const RECENT_POSTS = [
  {
    title: 'Everyone gets picture-in-picture mode',
    date: `29 Sept 2024`,
    tags: ['javascript', 'column']
  },
  {
    title: 'Physics based gaming in p5.js',
    date: `12 Oct 2023`,
    tags: ['p5.js', 'canvas']
  },

]

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
          <h1>Hi<span className="emoji-wave">👋</span> I’m <span className="chunky-underline">Himanshu</span> <span className="emoji-sound" onClick={play}>🔊</span> </h1>
          <p>Building UI interfaces🎨 and engineering <span className="working-at">@Razorpay</span>.<br />
            <i>Writing</i> about my technical experiences & <i>daily infra <br /> rants.</i></p>
          <Socials />
        </div>
        <div className="dp">
          <img src={dp} alt="My profile picture" className="image" />
        </div>
      </div>
      <div className="recent-posts">
        <h1 className="heading"><span>Recently Posted</span></h1>

        <div className="posts">
          {RECENT_POSTS.map((post: any) => (
            <PostListing {...post} />))}
        </div>
      </div>
    </Skeleton>
  )
}

export default IndexPage

export const Head: HeadFC = () =>
  <>
    <title>Blog | Himanshu</title>
    <link rel="icon" type="image/x-icon" href="/images/favicon.ico"></link>
    <meta name="description" content="Himanshu Chhabra's blog/portfolio" />
  </>
