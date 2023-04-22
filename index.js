
let chosenCategories = [];
const categoryCheckboxes = document.querySelectorAll(".input--check");
const startBtn = document.querySelector('.btn--start');
let chosenOption;
let selected = false;
let quesIndex = 0;
let analysisArr = [];
let score = 0;

categoryCheckboxes.forEach((btn)=> btn.addEventListener('change', function(e)
{
    e.preventDefault();
    if(!chosenCategories.includes(this.value) )
    {
        chosenCategories.push(this.value)
        btn.checked = true
    }

    else
    {
        const index = chosenCategories.indexOf(this.value)
        chosenCategories.splice(index,1)
        btn.checked = false

    }
}))



startBtn.addEventListener('click',()=> { 

    // e.preventDefault();
    if(chosenCategories.length !== 0)
    {
        executionPartTwo()
    }

    else
    {
        alert("choose atleast 1 category.")
    }
})
// Part -2 
// export default chosenCategories;

let answers;
let currentQuestion;

// const timer = ()=>
// {

// }

const createAnalysis = ()=> {

    const [q1,q2,q3,q4,q5,q6,q7,q8,q9,q10] = analysisArr;
    const html = `
        <div id="myModal" class="modal">
    
    <div class="modal-content">
        <h1> Analysis : </h1>

        <div class = 'analysis--container'> 

            <div class = '${q1}'>
                <p >Q1 : ${q1}</p> <br>
            </div>

            <div class = '${q2}'>
                <p >Q2 : ${q2}</p> <br>
            </div>

        </div>

        <div class = 'analysis--container'> 

            <div class = '${q3}'>
                <p >Q3 : ${q3}</p> <br>
            </div>

            <div class = '${q4}'>
                <p >Q4 : ${q4}</p> <br>
            </div>

        </div>

        <div class = 'analysis--container'> 

            <div class = '${q5}'>
                <p >Q5 : ${q5}</p> <br>
            </div>

            <div class = '${q6}'>
                <p >Q6 : ${q6}</p> <br>
                
            </div>
        </div>

        <div class = 'analysis--container'> 

            <div class = '${q7}'>
                <p >Q7 : ${q7}</p> <br>
            </div>

            <div class = '${q8}'>
                <p >Q8 : ${q8}</p> <br>
            </div>

        </div>

        <div class = 'analysis--container'> 
        
            <div class = '${q9}'>
                <p >Q9 : ${q9}</p> <br>
            </div>

            <div class = '${q10}'>
                <p >Q10 : ${q10}</p> <br>
            </div> 

        </div>
        <h2>SCORE : ${score} </h2>

        <div class = 'btn--div'>
            <button class = 'btn--retry'> R E T R Y </button>
        </div>
    </div>

    </div>
    `
    document.querySelector("body").innerHTML += html
    document.querySelector(".modal").style.display = 'block'
    
    document.querySelector(".btn--retry").addEventListener('click', (e) => {
        e.preventDefault();
        window.location.href = 'index.html'
    })
}

const fetchQuestions = (params)=> {

    fetch(`https://the-trivia-api.com/api/questions?limit=10&${params}`)
    .then((response) => response.json())
    .then((data) => renderData(data, quesIndex))
}
    

const renderData = (data, quesIndex) => 
{  
    if(quesIndex < 10) {
        answers = [ data[quesIndex].correctAnswer, ...data[quesIndex].incorrectAnswers]
        currentQues = data[quesIndex].question
        gameRender(currentQues, answers, data)
    }

    else
    {
        document.querySelector(".game--container").classList.add("blur")
        createAnalysis()
    }
}

const gameRender = (ques, opt, questionnaire) =>{

    const options = optionsRandomizer(opt)

    document.querySelector("body").innerHTML = ''
    const html = 
    `    <div class = "game--container">
    
    <div class = 'question child--div'>
        <h2>Q: ${ques}</h2>
    </div>

    <div class = 'options child--div'>
        <div class = 'options--arr'>
                <div class = "option opt--one">
                        <input class = "input--quiz" type = "checkbox" id = "--opt-1" name = "optionOne" value = '${options[0]}'>
                        <label for="--opt-1">${options[0]}</label><br>
                </div>

                <div class = "option opt--two">
                        <input class = "input--quiz" type = "checkbox" id = "--opt-2" name = "optionTwo" value = '${options[1]}'>
                        <label for="--opt-2">${options[1]}</label><br>
                </div>

        </div>

        <div class = 'options--arr' >

                <div class = 'option opt--three'>
                        <input class = "input--quiz" type = "checkbox" id = "--opt-3" name = "optionThree" value = '${options[2]}'>
                        <label for="--opt-3">${options[2]}</label><br>
                </div>

                <div class = 'option opt--four'>
                        <input class = "input--quiz" type = "checkbox" id = "--opt-4" name = "optionFour" value = '${options[3]}'>
                        <label for="--opt-4">${options[3]}</label><br>
                    </div>

        </div>

       <div>
            <div class = 'btn--div'>
                 <button class = 'btn--submit'> S U B M I T</button>
            </div>
       </div>
    </div>

</div>`
    document.querySelector("body").insertAdjacentHTML("beforeend",html)
    console.log(opt[0]);
    const arr = document.querySelectorAll(".input--quiz")
    arr.forEach((input) => {
        input.addEventListener("change", (e)=>{
            arr.forEach((item) =>{
                if(item.checked == true && item != input)
                {
                    chosenOption = input.value
                    item.checked = false;
                }

                else
                {
                    chosenOption = input.value
                }
            })
    })
    })
    

    document.querySelector(".btn--submit").addEventListener('click', (e) =>{
        e.preventDefault();
        if(quesIndex < 10)
        {
            if(chosenOption == opt[0])
            {
                analysisArr.push("correct")
                score += 10;
                quesIndex += 1;
                renderData(questionnaire, quesIndex)
            }

            else
            {
                analysisArr.push("wrong")
                quesIndex += 1;
                renderData(questionnaire, quesIndex)
            
            }
        }
        else
        {
            
        }
    })
    
}

//     `    <div class = "game--container">

//     <div class = 'timer child--div'>
//         <h1>60</h1>
//     </div>
    
//     <div class = 'question child--div'>
//         <h2>${ques}</h2>
//     </div>

//     <div class = 'options child--div'>
//        ${options[0]},${options[1]},${options[2]},$options[3]}
//     </div>

// </div>`

const executionPartTwo = ()=> {
    const level = document.querySelector("#level").value
    document.querySelector("body").innerHTML = ''

    let endpointParams = 'categories='
    chosenCategories.forEach((category) => endpointParams += (category + ',') )
    endpointParams  += `difficulties=${level}`
    fetchQuestions(endpointParams)
}


//------------------------Utility Functions----------------------------

// 1. Options Randomizers

const optionsRandomizer = (arr) => {
    currentIndex = 0
    while(currentIndex != arr.length)
        {
            const randomNum = Math.floor((Math.random() * arr.length) )
            const temp = arr[randomNum]
            arr[randomNum] = arr[currentIndex]
            arr[currentIndex] =  temp
            
            currentIndex += 1
        }
        return arr;
}

// --------------------------------------------------------------------