import {
    Box,
    Container,
} from '@chakra-ui/react'

import B from '../text/B'
import Links from '../text/Links'
import InlineLink from '../text/InlineLink'
import PageTitle from '../text/PageTitle'
import Paragraph from '../text/Paragraph'

export default function Intro() {
    return (
        <Box bg='white'>
            <Container pt={12} pb={{ base: 8, md: 12 }} maxW='container.md'>
                <PageTitle>fiveoutofnine</PageTitle>
                <Links
                    links={[
                        { label: 'Contract/Code', href: '/contract', },
                        { label: 'Gallery', href: '/gallery' },
                        { label: 'Twitter', href: 'https://twitter.com/fiveoutofnine' },
                        { label: 'OpenSea', href: 'https://opensea.io/collection/fiveoutofnine' },
                    ]}
                />
                <Paragraph>
                    <B>fiveoutofnine</B> is the first <B>100% on-chain</B> chess engine, where
                    minters <B>play against the smart contract</B>. Each move is minted as an NFT,
                    and accompanied by a generative art piece. The majority of the project's
                    development and beauty is in its{' '}
                    <B><InlineLink href='/contract'>algorithms and code</InlineLink></B> that enable
                    such complex computing, so the art highlights its design and implementation.
                </Paragraph>
            </Container>
        </Box>
    )
}
