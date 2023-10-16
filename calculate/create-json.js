const csvFilePath = './c3_moon.csv'
const csv = require('csvtojson')
const fs = require('fs')

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const data = JSON.stringify(jsonObj, null, ' ')
    fs.writeFileSync('c3_moon.json', data)
  })
