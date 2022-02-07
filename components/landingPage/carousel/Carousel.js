import {
    Box,
} from '@chakra-ui/react'

import carouselItems from './carouselItems'

export default function Carousel() {
    return (
        <Box
            w='100%'
            h='250px'
            overflowX='scroll'
            overflowY='hidden'
            whiteSpace='nowrap'
        >
            {carouselItems.map((item, index) => {
                return (
                    <Box
                        key={index}
                        d='inline-block'
                        w='250px'
                        h='250px'
                    >
                        <iframe
                            title={`${index}`}
                            width='1000px'
                            height='1000px'
                            src={item}
                            style={{
                                transformOrigin: '0 0',
                                transform: 'scale(0.25)',
                            }}
                        />
                    </Box>
                )
            })}
        </Box>
    )
}
