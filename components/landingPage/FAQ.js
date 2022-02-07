import {
    Accordion,
    AccordionButton,
    AccordionIcon,
    AccordionItem,
    AccordionPanel,
    Box,
    Code,
    Container,
    Heading,
} from '@chakra-ui/react'

import B from '../text/B'
import InlineLink from '../text/InlineLink'

export default function FAQ() {
    const questions = [
        {
            question: 'How does the art relate to the chess engine?',
            answer: <>
                It is related in 2 ways. Firstly, the bits on the top face represent how the bits
                of the chess board is actually stored in the contract. I chose to highlight this
                aspect because much of the 250+ hours spent researching and developing the project
                went into optimizing the system for storing information. Basically, it highlights
                the code that enables such complex computing, even with the [current] limitations of
                blockchain computing.
                <br></br><br></br>
                Secondly, the art's traits are determined either directly, or from the hash of the
                user's move and engine's response. See{' '}
                <B><InlineLink href='/contract'>code/explanation</InlineLink></B> for the full
                breakdown.
            </>
        }, {
            question: 'How many will be minted, and what will it cost?',
            answer: <>
                The total supply will be around 1000 NFTs, and minting is free (+ gas). The total
                supply is not definite until all have been minted because each chess game varies in
                move count. However, there are move and game count caps: each game is capped at 59
                moves, and the number of games is capped at 59. Thus, the total supply will be at
                least 118 (<Code>2 * 59</Code>; the quickest checkmates requires 2 moves) and at
                most 3481 (<Code>59 * 59</Code>).
            </>
        }, {
            question: 'What is a chess engine?',
            answer: <>
                A chess engine is a computer that plays chess.
            </>
        }, {
            question: 'What does "depth" mean?',
            answer: <>
                Depth is the number of moves the engine looks ahead. Higher depth requires more gas,
                but the engine will play a better move.
            </>
        }, {
            question: 'How customizable is the engine\'s play?',
            answer: <>
                Although the engine is set to always play black for this project, it can play as
                both black and white. The engine is also able to analyze and play on any board
                position, provided that it is legal and has no more than 7 queens per side.
            </>
        }, {
            question: 'Why the name "fiveoutofnine"?',
            answer: <>
                My [real] name has 9 letters, and 5 of them are "e". This project is the genesis
                project under my real name, hence, fiveoutofnine. It is also partially why the move
                and game cap are 59.
            </>
        }, {
            question: 'Why did you decide to do the project/why free?',
            answer: <>
                It is the first project I am releasing under my real name, so I wanted to do
                something very new to the space. Nearly every component of this project has never
                been done (or been done very few times) on-chain before: chess, some sort of
                game-playing AI, non-layered generative art.
            </>
        }, {
            question: 'How does the engine work?',
            answer: <>
                See <B><InlineLink href='/contract'>code/explanation</InlineLink></B>.
            </>
        },
    ]

    return (
        <Box>
            <Container pt={{ base: 8, md: 12 }} pb={{ base: 12, md: 24 }} maxW='container.md'>
                <Heading fontSize={{ base: 36, md: 48}}>
                    FAQ
                </Heading>
                <Accordion allowMultiple>
                    {questions.map((item, index) => {
                        return (
                            <AccordionItem key={index}>
                                <h2>
                                <AccordionButton>
                                    <Box flex='1' textAlign='left' fontSize={{ base: 16, md: 20 }}>
                                        {item.question}
                                    </Box>
                                <AccordionIcon />
                                </AccordionButton>
                                </h2>
                                <AccordionPanel
                                    pb={4}
                                    fontSize={{ base: 16, md: 20 }}
                                    fontFamily='Circular Std Light'
                                >
                                    {item.answer}
                                </AccordionPanel>
                            </AccordionItem>
                        )
                    })}
                </Accordion>
            </Container>
        </Box>
    )
}
