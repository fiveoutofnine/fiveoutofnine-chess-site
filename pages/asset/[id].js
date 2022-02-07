import { useEffect, useState } from 'react'
import { Box } from '@chakra-ui/react'

import useWindowDimensions from '../../components/other/useDimension'

export async function getServerSideProps(context) {
    const { id } = context.query
    const tokenURI = await (
        await fetch(`https://fiveoutofnine.com/api/tokenURI/${id}`)
    ).json()
    const image = tokenURI['animation_url']
    return { props: { image } }
}

export default function Asset({ image }) {
    const [isLoaded, setIsLoaded] = useState(false)
    const { width, height } = useWindowDimensions()

    useEffect(() => {
        if (!isLoaded && typeof image !== undefined) {
            setIsLoaded(true)
        }
    }, [image])

    return (
        isLoaded
            ? <Box
                width={width}
                height={height}
                dangerouslySetInnerHTML={
                    { __html: Buffer.from(image.substr(22), 'base64').toString() }
            }
                style={{
                    transform: `scale(${width / 1000})`,
                    transformOrigin: '0 0',
                }}
            />
            : <Box />
    )
}
