document.addEventListener('DOMContentLoaded', () => {
const player = document.querySelector('.player')
const grid = document.querySelector('.grid')
const alert= document.getElementById('alert')
let isJumping = false 
let gravity = 0.9
let isGameOver= false

//audio
let Jump = new Audio('jump.wav')


function control(e){

    if(e.keyCode === 32 )
    {
        if(!isJumping )
        {
            isJumping= true
            jump()
    
        }
     
     
    }
}

document.addEventListener('keydown',control)
;


let position = 50
function jump()
{
 let count= 0
 let timerId = setInterval(function()
 {

    //move down 
     if(count === 15)
     {
       clearInterval(timerId)
       let downTimerId = setInterval(function()
        {
            if(count === 0)
            {
                clearInterval(downTimerId)
                isJumping= false
            }
         position -= 2
         count--
         position = position * gravity
         player.style.bottom = position + 'px'
       },20)
      
     }
 //move up
 console.log('up')
 position += 40
 count++
 position = position * gravity
 player.style.bottom = position + 'px' 
 },20)
 

  

}

function generateObstacles()
{
   
    let RandomTime = Math.random() * 5000
    let obsatclePos = 1300
    const obstacle = document.createElement('div')
    obstacle.className = "addedClass"
    var ImgBall = document.createElement('img')

  if(!isGameOver)  obstacle.classList.add('obstacle')
   grid.appendChild(obstacle)
   ImgBall.setAttribute('src', 'pelotamov.gif')
   obstacle.appendChild(ImgBall)
   obstacle.style.left= obsatclePos + 'px'


   let timerId = setInterval(function()
   {
    if(obsatclePos > 0 && obsatclePos < 60 && position < 60 )
    {

        clearInterval(timerId)
        alert.innerHTML ='Game Over' 
        isGameOver = true
       //remove all children
       while(grid.firstChild)
       {
        grid.removeChild(grid.lastChild)
        
       }
      

    }

        obsatclePos -=10
        obstacle.style.left= obsatclePos + 'px'
        
      
    },30)


   if(!isGameOver ) setTimeout(generateObstacles, RandomTime)
   if(isGameOver == true)
   {
    return window.location.assign("perdiste.html")
   }
 

}
generateObstacles()

 let score= 0   

 setInterval(() => {
    score++;
    document.getElementById("score").innerText= score
    if(score == 30)
 {
    return window.location.assign("end.html")

 }
 },1000)

 

})