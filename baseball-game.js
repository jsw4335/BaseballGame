const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function randomNumbers() {
  const randNum = Math.round(Math.random() * 1000)
  console.log()
  console.log('컴퓨터가 숫자를 뽑았습니다.')
  return randNum
}

function compare(answer, yourAnswer) {
  console.log(answer, yourAnswer)

  for (let i = 0; i < answer.length; i++) {
    for (let j = 0; j < yourAnswer.length; j++) {
      if (answer[i] === yourAnswer[j]) {
        console.log('비교')
      }
    }
  }
}

function start() {
  // rl.question('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')
  console.log('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')

  rl.on('line', (line) => {
    if (line === '1') {
      const answer = randomNumbers()
      let strike = 0
      let ball = 0
      rl.on('line', (input) => {
        // const test1 = parseInt(line)
        compare(answer, input)
      })
    } else if (line === '9') {
      console.log('애플리케이션이 종료되었습니다.')
      process.exit()
    }
  })
}

start()
