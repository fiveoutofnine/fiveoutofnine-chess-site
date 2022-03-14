import { ethersContract } from '../../../utils/contract'

export default async function handler(req, res) {
    const { id } = req.query

    const tokenURI = Buffer.from(
        (await ethersContract._tokenURI(id)).substr(29), 'base64'
    ).toString()
    console.log(tokenURI)
    res.status(200).json(JSON.parse(tokenURI))
}
