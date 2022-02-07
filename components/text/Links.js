import {
    Box,
    HStack,
    Link,
} from '@chakra-ui/react'

export default function Links({ links }) {
    return (
        <HStack w='100%' mb={4} justifyContent='space-evenly'>
            {links.map((item, index) => {
                return (
                    <Box key={index}>
                        <Link
                            textAlign='center'
                            fontSize={{ base: 16, md: 20 }}
                            textDecoration='underline'
                            _hover={{
                                color: 'blue.600',
                                transition: '0s linear',
                            }}
                            href={item.href !== '' ? item.href : ''}
                            target={item.href !== '' && item.href[0] === '/' ? '' : '_blank'}
                            rel={item.href !== '' && item.href[0] === '/'
                                ? ''
                                : 'noreferrer noopener'}
                        >
                            {item.label}
                        </Link>
                    </Box>
                )
            })}
        </HStack>
    )
}
