export default async function handler(req, res) {
    const { id } = req.query
    let tokenURI = await (await fetch(`https://fiveoutofnine.com/api/tokenURI/${id}`)).json()
    tokenURI['animation_url'] = `https://fiveoutofnine.com/asset/${id}`
    tokenURI['image'] = `https://fiveoutofnine.com/api/image/${id}`
    res.status(200).json(tokenURI)
}
