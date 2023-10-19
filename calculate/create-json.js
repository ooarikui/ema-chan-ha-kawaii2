const csvFilePath = './dq2monregist.csv'
const csv = require('csvtojson')
const fs = require('fs')

csv()
  .fromFile(csvFilePath)
  .then(jsonObj => {
    const data = JSON.stringify(jsonObj, null, ' ')
    fs.writeFileSync('monster_regist.json', data)
  })
