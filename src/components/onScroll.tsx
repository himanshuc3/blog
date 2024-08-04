import React from 'react'
import { isBrowser } from '../utils/helpers';


type MyProps = {

}

type MyState = {
    sticky: boolean;
}

const onScrollHOC = (WrappedComponent: React.FC<any>) => {


    class NewComponent extends React.Component<MyProps, MyState> {
        constructor(props: {}) {
            super(props)
            this.state = {
                sticky: false
            }
        }

        handleScroll = (e: any) => {
            const { sticky } = this.state
            if ((!sticky && isBrowser() && window.scrollY >= 100) || (sticky && isBrowser() && window.scrollY < 100)) {
                // TODO: Fetch one time
                document.getElementById('navbar')?.classList.toggle('sticky')
                // document.getElementById('alternate_logo_img')?.classList.toggle('hiden')
                document.querySelector('.emojis-container')?.classList.toggle('hiden')
                Array.from(document.getElementsByClassName('backshadow')).forEach(el => el.classList.toggle('hiden'))
                this.setState({
                    sticky: window.scrollY >= 100
                })
            }
        }

        componentDidMount(): void {
            console.log('mounting')
            document.addEventListener('scroll', this.handleScroll)

        }

        render() {
            return <WrappedComponent />
        }


    }
    return NewComponent
}

export default onScrollHOC