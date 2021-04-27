import { useEffect, useState } from 'react'

export type WindowSize = {
    width: number,
    height: number
}

export default function useWindowSize() {
    const [windowSize, setWindowSize] = useState<WindowSize>({
        width: 0,
        height: 0,
    })
    useEffect(() => {
        function resizeEvent() {
            setWindowSize({
                width: window.innerWidth,
                height: window.innerHeight,
            })
        }
        window.addEventListener('resize', resizeEvent)
        resizeEvent()
        return () => window.removeEventListener('resize', resizeEvent)
    }, [])
    return windowSize
}