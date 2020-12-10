var arr = [[], [], [], [], [], [], [], [], []]
var temp = [[], [], [], [], [], [], [], [], []]

var board = [[], [], [], [], [], [], [], [], []]
let button=document.getElementById('generate-sudoku')
let solve=document.getElementById('solve')

var level=''

const dropdown_button=document.getElementById('dropdownMenu2')

document.getElementById('easy').onclick=()=>{
    dropdown_button.innerHTML='easy'
    level='easy'
}

document.getElementById('medium').onclick=()=>{
    dropdown_button.innerHTML='medium'
    level='medium'
}

document.getElementById('hard').onclick=()=>{
    dropdown_button.innerHTML='hard'
    level='hard'
}



for(var i=0;i<9;i++){
    for(var j=0;j<9;j++){
        arr[i][j]=document.getElementById(i*9+j)
    }
}

const initializeTemp=(temp)=>{
    
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            temp[i][j]=false
        }
    }

}

const setTemp=()=>{
    for(var i=0;i<9;i++){
        for(var j=0;j<9;j++){
            if(board[i][j]!=0){
                temp[i][j]=true
            }
            
        }
    }
}
const  setColor=(temp) =>{

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (temp[i][j] == true) {
                arr[i][j].style.color = "#DC3545";
            }

        }
    }
}
const resetColor=()=> {

    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {

            arr[i][j].style.color = "green";


        }
    }
}

console.log(arr)


const changeBoard=(board)=>{
    for (var i = 0; i < 9; i++) {
        for (var j = 0; j < 9; j++) {
            if (board[i][j] != 0) {

                arr[i][j].innerText = board[i][j]
            }

            else
                arr[i][j].innerText = ''
        }
    }
}

button.onclick = function () {
    var xhrRequest = new XMLHttpRequest()
    xhrRequest.onload = function () {
        var response = JSON.parse(xhrRequest.response)
        console.log(response)
        initializeTemp(temp)
        resetColor()

        board = response.board
        setTemp(board, temp)
        setColor(temp)
        changeBoard(board)
    }
    if(level===''){
        return alert('select a level first')
    }
    const link='https://sugoku.herokuapp.com/board?difficulty=' +level
    console.log(link)
    xhrRequest.open('get', link)
    //we can change the difficulty of the puzzle the allowed values of difficulty are easy, medium, hard and random
    xhrRequest.send()
}

function isPossible(board,sr,sc,val) {
    for (var row = 0; row < 9; row++) {
        if (board[row][sc] == val) {
            return false;
        }
    }

    for (var col = 0; col < 9; col++) {
        if (board[sr][col] == val) {
            return false;
        }
    }

    let boxRow=sr - sr % 3;
    let boxCol=sc - sc % 3;

    for(let r=boxRow;r<boxRow+3;r++){
        for(let c=boxCol;c<boxCol+3;c++){
            if(board[r][c]==val)return false;
        }
        
    }
    return true;
}



const solver=(board,i,j)=>{
   
    if(i==9){
        
        changeBoard(board)
        return true
    }
    if(j==9){
        
        return solver(board,i+1,0)
    
    }
    if(board[i][j]!=0 ){
        return solver(board,i,j+1)
        
    }
    for (let val = 1; val <= 9; val++) {
        if(isPossible(board,i,j,val)){
            board[i][j]=val;
            if(solver(board,i,j+1))return true
            board[i][j]=0;
        }
    }

    return false
    
    
}


const solveSudoku=(board)=>{
    solver(board,0,0)
}

solve.onclick =()=>{
    solveSudoku(board)
}