const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let records = []
let session = {
  start: null,
  end: null,
  total: 0,
}
let recordMessageList = []

function inputQuery(query) {
  return new Promise((resolve) => {
    rl.question(query, resolve)
  })
}

function randomNumbers() {
  let randNum = []

  while (randNum.length !== 3) {
    const r = Math.floor(Math.random() * 10)
    // 1부터 9까지 서로 다른 숫자로 이루어진 3자리의 숫자를 맞추는 게임
    if (r !== 0 && !randNum.includes(r)) {
      randNum.push(r)
    }
  }
  console.log('\n컴퓨터가 숫자를 뽑았습니다.\n')
  console.log(randNum) // 테스트 목적으로 남겨둠...!
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

function printResult(strike, ball) {
  if (ball > 0 && strike === 0) {
    console.log(`${ball}볼\n`)
    return `${ball}볼\n`
  } else if (ball === 0 && strike > 0) {
    console.log(`${strike}스트라이크\n`)
    return `${strike}스트라이크\n`
  } else if (ball > 0 && strike > 0) {
    console.log(`${ball}볼 ${strike}스트라이크\n`)
    return `${ball}볼 ${strike}스트라이크\n`
  } else {
    console.log('낫싱\n')
    return '낫싱\n'
  }
}

function getCurrentTime() {
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const hours = ('0' + today.getHours()).slice(-2)
  const minutes = ('0' + today.getMinutes()).slice(-2)
  const seconds = ('0' + today.getSeconds()).slice(-2)
  return `${year}.${month}.${day} ${hours}:${minutes}:${seconds}`
}

async function yourNumber(value) {
  let playing = false
  let count = 0
  try {
    playing = true
    session.start = getCurrentTime()
    let str = ''
    while (playing) {
      const numbers = await inputQuery('숫자를 입력해주세요 : ')
      if (numbers.length !== 3) {
        console.log('잘못된 입력입니다.')
        continue
      }
      str += `숫자를 입력해주세요 : ${numbers}\n`
      const [strike, ball] = compare(value, numbers)
      str += printResult(strike, ball)
      count++
      if (strike === 3) {
        console.log('3개의 숫자를 모두 맞히셨습니다.')
        console.log('-------게임 종료-------\n')
        playing = false
        console.log(
          '게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9을 입력하세요.'
        )
        session.total = count
        session.end = getCurrentTime()
        const copy = JSON.parse(JSON.stringify(session))
        count = 0
        records.push(copy)
        recordMessageList.push(str)
      }
    }
  } catch (error) {
    console.error(error)
  }
}

async function checkResult() {
  let checkRecord = true
  try {
    while (checkRecord) {
      const gameNumber = await inputQuery(
        '확인할 게임 번호를 입력하세요 (종료하려면 0을 입력): '
      )
      if (gameNumber === '0') {
        checkRecord = false
        console.log(
          '게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9을 입력하세요.'
        )
      } else if (records.length < gameNumber) {
        console.log('\n확인할 게임 번호에 해당 기록이 없습니다.\n')
      } else {
        console.log(`\n${gameNumber}번 게임결과`)
        console.log(recordMessageList[gameNumber - 1])
        console.log('3개의 숫자를 모두 맞히셨습니다.')
        console.log('-------기록 종료-------\n')
      }
    }
  } catch (error) {
    console.error(error)
  }
}

async function start() {
  const answer = randomNumbers()
  await yourNumber(answer)
}

function main() {
  console.log(
    '게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9을 입력하세요.'
  )
  rl.on('line', (line) => {
    switch (line) {
      case '1':
        start()
        break
      case '2':
        if (records.length === 0) {
          console.log('저장된 게임 기록이 없습니다.')
        } else {
          console.log('\n게임 기록')
          records.map(({ start, end, total }, index) => {
            console.log(
              `[${
                index + 1
              }] / 시작시간: ${start} / 종료시간: ${end} / 횟수: ${total}`
            )
          })
          console.log()
          checkResult()
        }
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
