import React from 'react'
import gsap from 'gsap'
import ScrollTrigger from 'gsap/ScrollTrigger.js'
import { useEffect } from 'react'
import { useState } from 'react'
import { useRef } from 'react'

gsap.registerPlugin(ScrollTrigger)

const Character = ({ ref, className }) => {

    const pupilRightRef = useRef(null);
    const pupilLeftRef = useRef(null);

    const [expression, setExpression] = useState("smile");

    useEffect(() => {
        // 1. Buat fungsi quickTo untuk animasi yang super smooth & cepat
        const xToLeft = gsap.quickTo(pupilLeftRef.current, "x", { duration: 1, ease: "power3.out" });
        const yToLeft = gsap.quickTo(pupilLeftRef.current, "y", { duration: 1, ease: "power3.out" });

        const xToRight = gsap.quickTo(pupilRightRef.current, "x", { duration: 1, ease: "power3.out" });
        const yToRight = gsap.quickTo(pupilRightRef.current, "y", { duration: 1, ease: "power3.out" });

        const handleMouseMove = (e) => {
            [
                { ref: pupilLeftRef.current, xTo: xToLeft, yTo: yToLeft },
                { ref: pupilRightRef.current, xTo: xToRight, yTo: yToRight }
            ].forEach(({ ref, xTo, yTo }) => {
                if (!ref) return;

                // 2. Hitung titik tengah dari masing-masing pupil
                const rect = ref.getBoundingClientRect();
                const pupilCenterX = rect.left + rect.width / 2;
                const pupilCenterY = rect.top + rect.height / 2;

                // 3. Hitung jarak antara kursor mouse dan pusat mata
                const deltaX = e.clientX - pupilCenterX;
                const deltaY = e.clientY - pupilCenterY;

                // 4. Hitung sudut (angle) arah mouse
                const angle = Math.atan2(deltaY, deltaX);

                // 5. Tentukan batas maksimal pupil boleh bergeser (dalam pixel)
                const maxDistance = 8;
                const moveX = Math.cos(angle) * maxDistance;
                const moveY = Math.sin(angle) * maxDistance;

                // 6. Jalankan animasi quickTo
                xTo(moveX);
                yTo(moveY);
            });
        };

        const handleClick = () => {
            setExpression("surprised");
        };

        const handleScroll = () => {
            setExpression("smile");
        };

        window.addEventListener("mousemove", handleMouseMove);
        window.addEventListener("click", handleClick);
        window.addEventListener("scroll", handleScroll);

        return () => {
            window.removeEventListener("mousemove", handleMouseMove);
            window.removeEventListener("click", handleClick);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);
    return (
        <svg className={className} viewBox="0 0 300 400" xmlns="http://www.w3.org/2000/svg" ref={ref}>
            <g id="head">
                {/* Kepala/Wajah */}
                <circle cx="150" cy="110" r="60" fill="#666666" />


                {expression === "smile" && (
                    <path
                        d="M140 135 Q150 145 160 135"
                        stroke="#1d2d44"
                        strokeWidth="4"
                        strokeLinecap="round"
                        fill="none"
                    />
                )}

                {expression === "surprised" && (
                    <circle
                        cx="150"
                        cy="140"
                        r="6"
                        fill="#1d2d44"
                    />
                )}

                <g id="left-eye">
                    {/* Lingkaran Putih Mata Kiri */}
                    <circle cx="135" cy="105" r="14" fill="#1d2d44" />
                    {/* Pupil Hitam Kiri yang bakal gerak (dikasih Ref) */}
                    <circle ref={pupilLeftRef} cx="135" cy="105" r="6" fill="#ffffff" />
                </g>

                <g id="right-eye">
                    {/* Lingkaran Putih Mata Kanan */}
                    <circle cx="165" cy="105" r="14" fill="#1d2d44" />
                    {/* Pupil Hitam Kanan yang bakal gerak (dikasih Ref) */}
                    <circle ref={pupilRightRef} cx="165" cy="105" r="6" fill="#ffffff" />
                </g>
            </g>
            {/* Badan */}
            <g id="body" >
                <path d="M50 300 C50 220 100 180 150 180 C200 180 250 220 250 300 C250 350 220 380 150 380 C80 380 50 350 50 300Z" fill="#666666" />
            </g>
        </svg>
    )
}

export default Character
