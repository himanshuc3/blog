import React from 'react'


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
            if ((!sticky && window.scrollY >= 100) || (sticky && window.scrollY < 100)) {
                // TODO: Fetch one time
                document.getElementById('navbar')?.classList.toggle('sticky')
                this.setState({
                    sticky: !sticky
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