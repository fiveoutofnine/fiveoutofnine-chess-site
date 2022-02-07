import dynamic from 'next/dynamic'

import FiveoutofnineHead from '../components/FiveoutofnineHead'
const Intro = dynamic(() => import('../components/landingPage/Intro'))
const Carousel = dynamic(() => import('../components/landingPage/carousel/Carousel'))
const Mint = dynamic(() => import('../components/landingPage/Mint'))
const FAQ = dynamic(() => import('../components/landingPage/FAQ'))

export default function Home() {
    return (
        <>
            <FiveoutofnineHead />
            <Intro />
            <Carousel />
            <Mint />
            <FAQ />
        </>
    )
}
