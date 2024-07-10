import * as React from "react"
import type { HeadFC, PageProps } from "gatsby"
import { XOutlined, GithubOutlined, LinkedinOutlined, InstagramOutlined, FileOutlined, CiOutlined } from '@ant-design/icons'
// TODO: Possible relative paths
import Skeleton from '../components/skeleton'
import dp from '../images/dp.png'
import './styles.scss'

const SOCIALS = [
  {
    component: XOutlined,
    to: 'x.com/himanshuc3'
  },
  {
    component: GithubOutlined,
    to: 'github.com/himanshuc3'
  },
  {
    component: LinkedinOutlined,
    to: 'linkedin.com/himanshuc3'
  },
  {
    component: InstagramOutlined,
    to: 'instagram.com/himanshuc3'
  },
  {
    component: FileOutlined,
    to: 'rssfeed'
  },
  {
    component: CiOutlined,
    to: 'cioutlined'
  },
]

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
  return (
    <Skeleton className="index-wrapper">
      <div className="poster">
        <div className="text">
          <h1>Hi 👋 I’m Himanshu🔊 </h1>
          <p>Building UI interfaces🎨 and engineering @Razorpay. <br />
            Writing about my technical experiences & daily infra <br /> rants.</p>
          <div className="socials">
            {SOCIALS.map(({ component: Component, to }) => (
              <Component style={{ fontSize: '18px' }} />
            ))}
          </div>
        </div>
        <div className="dp">
          <img src={dp} alt="My profile picture" className="image" />
        </div>
      </div>
      <div className="recent-posts">
        <h1>Recently Posted</h1>

        <div className="posts">
          {RECENT_POSTS.map((post: any) => (
            <div className="post">
              <h1>{post.title}</h1>
              <div><span className="date">
                {post.date}
              </span>
                <div className="tags">{post.tags.map((tag) => (<span>{tag}</span>))}</div>
              </div>
            </div>))}
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
