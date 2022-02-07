import {
    useEffect,
    useState,
} from 'react'

import {
    Box,
    Button,
    Container,
    Flex,
    Grid,
    GridItem,
    Heading,
    HStack,
    Image,
    Input,
    useNumberInput,
} from '@chakra-ui/react'

import {
    applyMove,
    generateMovesForPiece,
    isCapture,
} from '../chess/chessLogic.js'

import DepthTooltip from '../other/DepthTooltip'
import { ethersContract, mintMove, loadWeb3Contract } from '../../utils/contract'
import { getUserAddress, getMetaMaskInstalled, connectMetamask } from '../../utils/wallet'
import Paragraph from '../text/Paragraph.js'
import InlineLink from '../text/InlineLink.js'
import B from '../text/B.js'

export default function Mint() {
    const [startingIndex, setStartingIndex] = useState(-1)
    const [endingIndex, setEndingIndex] = useState(-1)
    const [allowedToIndices, setAllowedToIndices] = useState([])
    const [boardBeforeMove, setBoardBeforeMove] = useState([])
    const [board, setBoard] = useState([
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
        0, 0, 0, 0, 0, 0, 0, 0,
    ])
    const [userAddress, setUserAddress] = useState('')

    async function getBoard() {
        const currentBoard = (await ethersContract.board())._hex
        let tempBoard = []
        for (let i = 0; i < 64; ++i) {
            let piece = Number(`0x${currentBoard[currentBoard.length - i - 1]}`)
            if (Number.isNaN(piece)) piece = 0
            tempBoard.push(piece)
        }
        setBoard(tempBoard.reverse())
    }

    let fetchDynamicContent = async () => {
        if (getMetaMaskInstalled() && getUserAddress() !== "") {
            await loadWeb3Contract()
            setUserAddress(await getUserAddress());
        }
    }

    useEffect(() => {
        if (board.reduce((a, b) => a + b, 0) === 0) getBoard()
        setInterval(fetchDynamicContent, 1000)
    })

    const { getInputProps, getIncrementButtonProps, getDecrementButtonProps } = useNumberInput({
        step: 1,
        defaultValue: 3,
        min: 3,
        max: 10,
        precision: 0,
    })
    const inc = getIncrementButtonProps()
    const dec = getDecrementButtonProps()
    const input = getInputProps()

    const handleClick = (index) => {
        if (endingIndex !== -1) return
        const piece = board[index]

        if (startingIndex !== -1 && allowedToIndices.indexOf(index) !== -1) {
            setAllowedToIndices([])
            setEndingIndex(index)
            setBoardBeforeMove([...board])
            setBoard(applyMove(board, startingIndex, index))
        } else if (piece !== 0 && (piece >> 3) !== 0) {
            if (index === startingIndex) {
                setStartingIndex(-1)
                setAllowedToIndices([])
            } else {
                setStartingIndex(index)
                setAllowedToIndices(generateMovesForPiece(board, index, true))
            }
        } else {
            setStartingIndex(-1)
            setAllowedToIndices([])
        }
    }

    const undoMove = () => {
        if (endingIndex !== -1) {
            setStartingIndex(-1)
            setEndingIndex(-1)
            setBoard(boardBeforeMove)
        }
    }

    return (
        <Box bg='gray.100'>
            <Container pt={{ base: 8, md: 12 }} pb={{ base: 8, md: 12 }} maxW='container.sm'>
                <Paragraph>
                    If a king is missing, that is a non-fatal bug. You can continue minting without
                    issues. I will address this on my <B><InlineLink>Twitter</InlineLink></B>.
                </Paragraph>
                <InstructionHeading>Select Move</InstructionHeading>
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
                                validMove={index !== -1 && allowedToIndices.indexOf(index) !== -1}
                                isCapture={isCapture(board, index)}
                                bg={
                                    index === startingIndex || index === endingIndex
                                        ? 'yellow.400'
                                        : squareIsColorOne ? 'gray.200' : 'gray.600'
                                }
                                borderTopLeftRadius={index === 9 ? 8 : 0}
                                borderTopRightRadius={index === 14 ? 8 : 0}
                                onClick={() => handleClick(index)}
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
                    <GridItem
                        as='button'
                        d='flex'
                        justifyContent='center'
                        alignItems='center'
                        padding={2}
                        bg='gray.200'
                        fontSize={{ base: 20, md: 24 }}
                        borderTop='3px solid black'
                        borderBottomLeftRadius={8}
                        borderBottomRightRadius={8}
                        colSpan={6}
                        onClick={undoMove}
                        _hover={endingIndex === -1 ? { cursor: 'not-allowed' } : { bg: 'gray.300' }}
                    >
                        Undo Move
                    </GridItem>
                </Grid>
                <HStack
                    alignItems='stretch'
                    mt={{ base: 2, md: 4 }}
                    mb={2}
                    spacing={{ base: 2, md: 4}}
                >
                    <Box
                        w='50%'
                        bg='gray.200'
                        padding={2}
                        borderRadius={12}
                        border='3px solid black'
                    >
                        <InstructionHeading>
                            Select{' '}
                            <DepthTooltip>Depth</DepthTooltip>
                        </InstructionHeading>
                        <HStack>
                            <Button
                                {...dec}
                                fontSize={{ base: 20, md: 24 }}
                                bg='gray.400'
                                border='1px solid black'
                                _hover={{
                                    bg: 'gray.500',
                                }}
                            >
                                -
                            </Button>
                            <Input
                                {...input}
                                fontSize={{ base: 20, md: 24 }}
                                bg='white'
                                textAlign='center'
                                borderColor='gray.300'
                                _hover={{
                                    borderColor: 'black',
                                }}
                            />
                            <Button
                                {...inc}
                                fontSize={{ base: 20, md: 24 }}
                                bg='gray.400'
                                border='1px solid black'
                                _hover={{
                                    bg: 'gray.500',
                                }}
                            >
                                +
                            </Button>
                        </HStack>
                    </Box>
                    <Box w='50%'>
                        <Button
                            w='100%'
                            h='100%'
                            bg='gray.900'
                            color='white'
                            fontSize={{ base: 28, md: 32}}
                            padding={2}
                            borderRadius={12}
                            border='3px solid black'
                            opacity={endingIndex === -1 ? 0.5 : 1}
                            onClick={endingIndex === -1
                                ? () => {}
                                : getMetaMaskInstalled()
                                    ? userAddress === ''
                                        ? connectMetamask
                                        : () => mintMove(
                                            userAddress,
                                            ((63 - startingIndex) << 6) | (63 - endingIndex),
                                            input.value
                                        )
                                    : () => {}}
                            _hover={endingIndex === -1
                                ? { cursor: 'not-allowed' }
                                : {
                                    bg: 'gray.700',
                                    transform: 'scale(0.98)',
                                }}
                            _active={endingIndex === -1
                                ? { cursor: 'not-alowed' }
                                : {
                                    bg: 'gray.600',
                                    transform: 'scale(0.96)',
                                }}
                        >
                            {endingIndex === -1
                                ? 'Play Move'
                                : getMetaMaskInstalled()
                                    ? userAddress === ''
                                        ? 'Connect Wallet'
                                        : 'Confirm Mint'
                                    : 'Install MetaMask'}
                        </Button>
                    </Box>
                </HStack>
            </Container>
        </Box>
    )
}

function Square({ piece, validMove, isCapture, ...props }) {
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
            {validMove
                ? isCapture
                    ? <Box
                        w='100%'
                        h='100%'
                        position='absolute'
                        top='50%'
                        bg='rgba(0, 0, 0, 0)'
                        borderRadius='50%'
                        boxSizing='border-box'
                        border='9px solid'
                        borderColor='gray.400'
                        transform='translateY(-50%)'
                    />
                    : <Box
                        w='25%'
                        h='25%'
                        position='absolute'
                        top='50%'
                        bg='gray.400'
                        borderRadius='50%'
                        transform='translateY(-50%)'
                    />
                : <></>
            }
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

function InstructionHeading({ children }) {
    return (
        <Heading
            fontSize={{ base: 28, md: 32}}
            textAlign='center'
            verticalAlign='baseline'
        >
            {children}
        </Heading>
    )
}

