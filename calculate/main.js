const fs = require('fs')
const data = JSON.parse(fs.readFileSync('./output.json', 'utf8'))
const speeds = [...Array(150)].map((_, i) => i)
const count1 = [...Array(100)].map((_, i) => i)
const count2 = [...Array(10000)].map((_, i) => i)

exec()

function exec() {
  data.forEach(d => {
    d.speeds = {}
    speeds.forEach(s => {
      let win_per = 0
      count1.forEach(c1 => {
        let win = 0
        count2.forEach(c2 => {
          const as = s - (s * (get_num() % 87)) / 256
          const es = d.speed - (d.speed * (get_num() % 127)) / 256
          if (Math.trunc(as) > Math.trunc(es)) {
            win++
          }
        })
        win_per = win_per + (win / count2.length) * 100
        win = 0
      })
      d.speeds[s] = Math.round((win_per / count1.length) * 10) / 10
      win_per = 0
    })
  })
  const json = JSON.stringify(data, null, ' ')
  fs.writeFileSync('output2.json', json)
}

function get_num() {
  return Math.random() * 1000000000000000
}
