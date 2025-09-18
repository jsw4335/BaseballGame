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

function compare(computer, user) {
  let strike = 0
  let ball = 0
  const yourAnswer = user.split('')
  for (let i = 0; i < computer.length; i++) {
    let d = parseInt(yourAnswer[i])
    if (computer[i] === d) {
      strike++
    } else if (computer.includes(d)) {
      ball++
    }
  }
  return [strike, ball]
}

function inputNumber(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

async function yourNumber() {
  try {
    const numbers = await inputNumber('숫자를 입력해주세요 : ')
    console.log(typeof numbers)
    return numbers
  } catch (error) {
    console.error(error)
  } finally {
    rl.close()
  }
}

async function start() {
  const answer = randomNumbers()
  const yourAnswer = await yourNumber()
  const [strike, ball] = compare(answer, yourAnswer)
}

let flag = false
function main() {
  console.log('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')

  rl.on('line', (line) => {
    switch (line) {
      case '1':
        start()
        break
      case '9':
        console.log('애플리케이션이 종료되었습니다.')
        rl.close()
        break
      default:
        console.log(`${line}\n`)
        break
    }
  })
}

main()
