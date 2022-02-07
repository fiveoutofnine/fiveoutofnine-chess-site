import { PrismaClient } from '@prisma/client'

import { ethersContract } from '../../../utils/contract'

const prisma = new PrismaClient()

export default async function handler(req, res) {
    const { id } = req.query
    const queryTokenUri = await prisma.tokenURI.findUnique({
        where: {
            tokenId: parseInt(id),
        }
    })
    console.log(queryTokenUri)
    
    if (queryTokenUri === null) {
        const tokenURI = Buffer.from(
            (await ethersContract._tokenURI(id)).substr(29), 'base64'
        ).toString()
        console.log(tokenURI)
        await prisma.tokenURI.create({
            data: {
                tokenId: parseInt(id),
                decodedJSON: tokenURI,
            },
        })
        res.status(200).json(JSON.parse(tokenURI))
    } else {
        res.status(200).json(queryTokenUri['decodedJSON'])
    }
}
