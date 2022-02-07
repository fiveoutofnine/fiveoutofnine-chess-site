import {
    Link,
} from '@chakra-ui/react'

import PageTitle from "../components/text/PageTitle";

export default function Gallery() {
    return (
        <>
            <PageTitle pt='50vh'>Coming soon.</PageTitle>
            <Link
                href='/'
                w='100%'
                d='block'
                textAlign='center'
                fontSize={{ base: 20, md: 28 }}
                fontFamily='Circular Std Light'
            >
                Return Home.
            </Link>
        </>
    )
}
