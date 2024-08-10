import * as React from "react"
import { Link, HeadFC, PageProps } from "gatsby"
import './styles.scss'

const NotFoundPage: React.FC<PageProps> = () => {
  return (
    <main className="not-found">

      <h2>404. Page Not found :(</h2>
      <p>Weary traveler, you've reached a dead end. <br /><Link to="/" className="chunky-underline">Go home</Link> and get some sleep.
      </p>
    </main>
  )
}

export default NotFoundPage

export const Head: HeadFC = () => <title>Not found</title>
