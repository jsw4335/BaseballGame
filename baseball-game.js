const readline = require('readline')

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

let records=[]

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
  console.log(randNum)
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

function printResult(strike,ball){
  if (ball>0 && strike===0){
    console.log(`${ball}볼\n`)
  }else if(ball===0 && strike>0){
    console.log(`${strike}스트라이크\n`)
  }else if (ball>0 && strike>0){
    console.log(`${ball}볼 ${strike}스트라이크\n`)
  }else{
    console.log('낫싱\n')
  }
}

async function yourNumber(value) {
  let playing=false
  try {
    playing=true
    while(playing){
      const numbers = await inputNumber('숫자를 입력해주세요 : ')
      if (numbers.length!==3){
        console.log('잘못된 입력입니다.')
        continue
      }
      const [strike,ball]=compare(value,numbers)
      printResult(strike,ball)
      if (strike ===3){

        console.log('3개의 숫자를 모두 맞히셨습니다.\n')
        console.log('-------게임 종료-------\n')
        playing=false
        console.log('게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9을 입력하세요.')
      }
    }
  //  return numbers 
  } catch (error) {
    console.error(error)
  }
}

async function start() {

  const answer = randomNumbers()
  await yourNumber(answer)

}

function getCurrentTime(){
  const today = new Date()
  const year = today.getFullYear()
  const month = ('0' + (today.getMonth() + 1)).slice(-2)
  const day = ('0' + today.getDate()).slice(-2)
  const hours = ('0' + today.getHours()).slice(-2)
  const minutes = ('0' + today.getMinutes()).slice(-2)
  return `${year}.${month}.${day} ${hours}:${minutes}`
}

function main() {
  console.log('게임을 새로 시작하려면 1, 기록을 보려면 2, 종료하려면 9을 입력하세요.')
  rl.on('line', (line) => {  
    switch (line) {
      case '1':
        start()
        break
      case '2':


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

