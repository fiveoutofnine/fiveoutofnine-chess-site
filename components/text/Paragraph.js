import {
    Text,
} from '@chakra-ui/react'

export default function Paragraph({ children, ...props }) {
    return (
        <Text
            textAlign='center'
            fontSize={{ base: 16, md: 20 }}
            fontFamily='Circular Std Light'
            {...props}
        >
            {children}
        </Text>
    )
}
