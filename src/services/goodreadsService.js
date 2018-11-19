const axios = require('axios')
const xml2js = require('xml2js')

const KEY = 'GXAmSfgUSPbjodFr6DPV3w'
const SECRET = 'PXWRbxloBqu3kXqSNrojcfl9gbjZ1Oo5PbtewiDWWA'
const parser = xml2js.Parser({ explicitArray: false })

function getBookById(id) {
    return new Promise((resolve, reject) => {
        axios.get(`https://www.goodreads.com/book/show/${id}.xml?key=${KEY}`)
            .then(response => {
                parser.parseString(response.data, (err, result) => {
                    if (err) console.error(err)
                    resolve(result.GoodreadsResponse.book)
                })
            })
            .catch(error => {
                console.error('GoodReadsService error: ', error)
                reject(error)
            })
    })
}

module.exports = { getBookById }