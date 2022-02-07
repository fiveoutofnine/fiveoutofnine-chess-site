import {
    Link,
} from '@chakra-ui/react'

export default function InlineLink({ children, ...props }) {
    return (
        <Link
            target='_blank'
            rel='noreferrer noopener'
            color='blue.600'
            textDecoration='underline'
            _hover={{
                color: 'blue.800',
                transition: '0s linear',
            }}
            {...props}
        >
            {children}
        </Link>
    )
}
