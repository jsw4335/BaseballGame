const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

function randomNumbers() {
  let randNum = []
  console.log('난수 생성')

  while (randNum.length !== 3) {
    const r = Math.floor(Math.random() * 10)
    // 1부터 9까지 서로 다른 숫자로 이루어진 3자리의 숫자를 맞추는 게임
    if (r !== 0 && !randNum.includes(r)) {
      randNum.push(r)
    }
  }
  console.log('난수 생성 완료')
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

let flag = false
function main() {
  console.log('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')
  rl.on('line', (line) => {
    if (line === '1') {
    }
  })
}

main()
