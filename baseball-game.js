const readline=require('readline')

const rl=readline.createInterface({
    input:process.stdin,
    output:process.stdout
});

function start(){
    rl.question('게임을 새로 시작하려면 1, 종료하려면 9를 입력하세요.')
    rl.on('line',(line)=>{
        console.log(line)
    })
    
}

start()