import {
    Tooltip,
} from '@chakra-ui/react'

import B from '../text/B'

export default function DepthTooltip({ children }) {
    return (
        <Tooltip
            label={<span>
                <B>Depth</B> is the number of moves the engine looks ahead. Higher depth requires
                {' '}<B>more gas</B>, but the engine will play a <B>better</B> move.
            </span>}
            placement='top'
            fontFamily='Circular Std Light'
            borderRadius={4}
            border='1px solid white'
            hasArrow
        >
            <span style={{ textDecoration: 'underline' }}>{children}</span>
        </Tooltip>
    )
}
