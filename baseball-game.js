const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function start() {
  // rl.question('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')
  console.log('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')

  rl.on('line', (line) => {
    const randNum = Math.round(Math.random() * 1000)
    console.log()

    console.log('컴퓨터가 숫자를 뽑았습니다.')

    const test1 = parseInt(line)
    for (let index = 0; index < test1.length; index++) {
      // if (test1[0] === )
    }
  })
}

start()
