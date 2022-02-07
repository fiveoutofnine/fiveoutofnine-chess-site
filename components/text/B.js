import {
    Text,
} from '@chakra-ui/react'

export default function B({ children }) {
    return (
        <Text
            as='span'
            fontFamily='Circular Std'
        >
            {children}
        </Text>
    )
}
