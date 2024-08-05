import useSound from "use-sound"
import himanchu from '../media/himanchu.mp3'

const useMyVoice = () => {
    const [play, { stop }] = useSound(himanchu, { interrupt: true })

    return { play, stop }
}

export default useMyVoice