const nodeHtmlToImage = require('node-html-to-image')

export default async function handler(req, res) {
    const { id } = req.query
    let tokenURI = await (await fetch(`https://fiveoutofnine.com/api/tokenURI/${id}`)).json()
    const image = await nodeHtmlToImage({
        output: './public/test.png',
        html: `<html>
            <style>
                body{width:980px;height:980}
            </style>
            ${Buffer.from(tokenURI['animation_url'].substr(22), 'base64').toString()}
        </html>`
    })

    res.writeHead(200, {
        'Content-Type': 'image/png',
    })
    res.end(image, 'binary')
}
