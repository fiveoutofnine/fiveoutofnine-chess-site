import {
    Heading,
} from '@chakra-ui/react'

export default function SectionTitle({ children, ...props }) {
    return (
        <Heading
            w='100%'
            fontSize={{ base: 24, md: 36 }}
            textAlign='left'
            color='black'
            mt={8}
            {...props}
        >
            {children}
        </Heading>
    )
}
