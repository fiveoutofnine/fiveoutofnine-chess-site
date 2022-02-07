import {
    useState,
} from 'react'

import {
    Box,
    Flex,
    Grid,
    Image,
} from '@chakra-ui/react'

import DepthTooltip from '../other/DepthTooltip'

export default function Board({ board }) {
    return (
        <Box>
            <Grid
                templateRows='repeat(6, 1fr)'
                templateColumns='repeat(6, 1fr)'
                borderRadius={12}
                border='3px solid black'
                mb={{ base: 2, md: 4 }}
            >
                {board.map((piece, index) => {
                    if ((index >> 3) === 0 || (index >> 3) === 7) return
                    if ((index & 7) === 0 || (index & 7) === 7) return

                    let squareIsColorOne = (index & 1) === 0
                    if (((index >> 3) & 1) !== 0) squareIsColorOne = !squareIsColorOne

                    return (
                        <Square
                            key={index}
                            piece={piece}
                            bg={squareIsColorOne ? 'gray.200' : 'gray.600'}
                            borderTopLeftRadius={index === 9 ? 8 : 0}
                            borderTopRightRadius={index === 14 ? 8 : 0}
                            _hover={
                            piece !== 0
                                && (piece >> 3) !== 0
                                && index !== startingIndex
                                && endingIndex === -1
                                ? { bg: 'yellow.200' }
                                : {}}
                        />
                    )
                })}
            </Grid>
        </Box>
    )
}

function Square({ piece, ...props }) {
    return (
        <Flex
            w='100%'
            pb='100%'
            position='relative'
            justifyContent='center'
            alignItems='center'
            verticalAlign='baseline'
            border='1px solid black'
            {...props}
        >
            {piece !== 0
                ? <Image
                    alt='Chess Piece'
                    src={`/pieceSvgs/${piece}.svg`}
                    w='90%'
                    position='absolute'
                    top='50%'
                    transform='translateY(-50%)'
                />
                : <></>
            }
        </Flex>
    )
}
