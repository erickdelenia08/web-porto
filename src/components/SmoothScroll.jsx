import { useEffect } from 'react'
import Lenis from 'lenis'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'

gsap.registerPlugin(ScrollTrigger)

const SmoothScroll = ({ children }) => {

    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.4,
            smoothWheel: true,
        })

        lenis.on('scroll', ScrollTrigger.update)

        // 1. Simpan fungsi ticker ke dalam variabel
        const updateLenis = (time) => {
            lenis.raf(time * 1000)
        }

        gsap.ticker.add(updateLenis)
        gsap.ticker.lagSmoothing(0)

        return () => {
            // 2. Bersihkan ticker GSAP agar tidak berjalan terus-menerus
            gsap.ticker.remove(updateLenis)

            // 3. Hancurkan instance Lenis
            lenis.destroy()
        }
    }, [])

    return <>{children}</>
}

export default SmoothScroll
