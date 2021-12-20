document.addEventListener('DOMContentLoaded' , () => {
    // get flappy, ground, sky, and container and make them variables
    const flappy = document.querySelector('.flappy');
    const container = document.querySelector('.game-container');
    const ground = document.querySelector('.ground');
    const sky = document.querySelector('.sky');

    // set initial values of flappy's left and bottom properties as variables
    let flappyLeft = 220;
    let flappyBottom = 100;
    let gravity = 2;
    let gameIsOver = false;
    let gap = 430;
    

    // start game function
    function startGame() {
        flappyBottom -= gravity;
        // set initial left and bottom properties of flappy wen gam3 startes
        flappy.style.bottom = flappyBottom + 'px';
        flappy.style.left = flappyLeft + 'px';
    }
    //refresh every 20 milliseconds with gravity effect on floppy
    let gameTimer = setInterval(startGame, 20);

    function controller(e){
        if (e.keyCode === 32){
            booted();
        }
    }

    function booted() {
        if (flappyBottom < 500) flappyBottom += 50;
        flappy.style.bottom = flappyBottom + 'px';

        console.log(flappyBottom);
    }

    document.addEventListener('keyup', controller);

    function greenThings(){
        let greenThingLeft = 500;
        let randomHeight = Math.random() * 60;
        let greenThingBottom = randomHeight;
        const greenThing = document.createElement('div');
        const topGreenThing = document.createElement('div');
        if (!gameIsOver) {
            greenThing.classList.add('greenThing');
            topGreenThing.classList.add('topGreenThing');
        }
        container.appendChild(greenThing);
        container.appendChild(topGreenThing);
        greenThing.style.left = greenThingLeft + 'px';
        greenThing.style.bottom = greenThingBottom + 'px';
        topGreenThing.style.left = greenThingLeft + 'px';
        topGreenThing.style.bottom = greenThingBottom + gap + 'px';
        


        function moveGreen() {
            greenThingLeft -= 2;
            greenThing.style.left = greenThingLeft + 'px';
            topGreenThing.style.left = greenThingLeft + 'px';

            if(greenThingLeft === -60){
                clearInterval(timer);
                container.removeChild(greenThing);
                container.removeChild(topGreenThing);
            }
            if(
                greenThingLeft > 200 && greenThingLeft < 280 && flappyLeft === 220 && (flappyBottom < greenThingBottom + 153 || flappyBottom > greenThingBottom + gap - 200) ||
                flappyBottom === 0
                ){
                    gameOver();
                    clearInterval(timer);
            }
        }
        let timer = setInterval(moveGreen, 20);
        if (!gameIsOver) setTimeout(greenThings, 3000);
    }
    greenThings();

    function gameOver(){
        clearInterval(gameTimer);
        console.log('Game Over');
        gameIsOver = true;
        document.removeEventListener('keyup', controller);
        
        
    }
})