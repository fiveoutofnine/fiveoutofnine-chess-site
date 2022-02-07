import {
    Heading,
} from '@chakra-ui/react'

export default function PageTitle({ children, ...props }) {
    return (
        <Heading
            w='100%'
            fontSize={{ base: 48, md: 60 }}
            textAlign='center'
            color='black'
            {...props}
        >
            {children}
        </Heading>
    )
}
