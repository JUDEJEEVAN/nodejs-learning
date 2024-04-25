const fs = require('fs')

const requrestHandler = (req, res) => {

    const url = req.url
    const method = req.method

    if (url === '/') {
        res.setHeader('Content-Type', 'text/html')
        res.write('<h1>Type your message here</h1>')
        res.write('<form action="/message" method="POST"><input type="text" name="message"><button type="submit">Send</button></form>')
        return res.end()
    }

    if (url === '/message' && method === 'POST') {
        const body = []
        req.on('data', (chunk) => {
            console.log(chunk)
            body.push(chunk)
        })

        return req.on('end', () => {
            const parsedBody = Buffer.concat(body).toString()
            console.log(parsedBody)
            const message = parsedBody.split('=')[1]
            fs.writeFileSync('message.txt', message, (err) => {
                res.statusCode = 302
                res.setHeader('Location', '/')
                return res.end()
            })
        })
    }
    res.setHeader('Content-Type', 'text/html')
    res.write('<h1>Hello World</h1>')
    res.end()
}

module.exports = requrestHandler