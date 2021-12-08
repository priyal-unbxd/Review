const prodCards = [...document.getElementsByClassName('card-header')]
const stars = [...document.getElementsByClassName('stars')]
const url = window.location.href

prodCards.forEach((c)=>{
    const rating = c.getAttribute('data-rating')

    for(let i=1;i<6;i++){
        if(i<=rating){
            c.innerHTML += `
                <span><i style="color:orange" class ="fa fa-star"></i></span>
            `
        }else{
            c.innerHTML += `<span id="5" ><i  class ="fa fa-star-o"></i></span>`
        }
    }
    
})


stars.forEach((c,idx)=> c.addEventListener('click',()=>{
        
        stars.forEach((otherStar,otherIndx)=>{
            if(otherIndx <idx){
                otherStar.classList.replace('fa-star-o','fa-star')
            }else if(otherIndx == idx){
                otherStar.classList.replace('fa-star-o','fa-star')
                otherStar.classList.add('checked')
            }else{
                otherStar.classList.add('fa-star-o')
            }
        })
    
}))



const sendData = ()=>{
    const stars = [...document.getElementsByClassName('stars')]
    const comment = document.getElementById('comment').value
    const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
    const data = {}
    let rating = 0
    stars.forEach((star)=>{
        if(star.classList.contains('checked')){
            rating = star.id
        }
    })

    $.ajax({
        type: 'POST',
        url: `${url}save/`,
        data: {'csrfmiddlewaretoken':csrf,'rating': rating, 'comment': comment},
        success: function(response){
            window.location.href = url
        },
        error: function(response){
            console.log('error')
        }
    })
 
}

const reviewForm = document.getElementById('review-form')


reviewForm.addEventListener('submit',e=>{
    e.preventDefault()
    sendData()
})


document.getElementById('back-btn').addEventListener('click',()=>{
    window.location.href = ".."
})


function progessbar(){
    let ratings = []
    let totalRatings = 0
    let fiveStarRatings = 0
    let fourStarRatings = 0
    let threeStarRatings = 0
    let twoStarRatings = 0
    let oneStarRatings = 0
    prodCards.forEach((i)=>{
        let rating = i.getAttribute('data-rating')
        if(rating == '5'){
            fiveStarRatings +=1
        }else if(rating == '4'){
            fourStarRatings +=1
        }else if(rating == '3'){
            threeStarRatings +=1
        }else if(rating == '2'){
            twoStarRatings +=1
        }else if(rating=='1'){
            oneStarRatings +=1
        }
        ratings.push(rating)
    })
    totalRatings = ratings.length
    fiveStarRatings = ((fiveStarRatings) / (totalRatings)) *100
    fourStarRatings = ((fourStarRatings) / (totalRatings)) *100
    threeStarRatings = ((threeStarRatings) / (totalRatings)) *100
    twoStarRatings = ((twoStarRatings) / (totalRatings)) *100
    oneStarRatings = ((oneStarRatings) / (totalRatings)) *100

    allProgressBars = [...document.getElementsByClassName('progress-bar')]

    allProgressBars.forEach((item)=>{
        if(item.id == '5-star'){
            item.style['width'] = fiveStarRatings + '%'
            item.innerText = Math.round(fiveStarRatings) + '%'
            console.log("Value of",item.value)
            console.log(item)
        }
        else if(item.id == '4-star'){
            item.style['width'] = fourStarRatings + '%'
            item.innerText = Math.round(fourStarRatings) + "%"
        }
        else if(item.id == '3-star'){
            item.style['width'] = threeStarRatings + '%'
            item.innerText = Math.round(threeStarRatings) + '%'
        }
        else if(item.id == '2-star'){
            item.style['width'] = twoStarRatings + '%'
            item.innerText = Math.round(twoStarRatings) + '%'
        }
        else if(item.id == '1-star'){
            item.style['width'] = oneStarRatings + '%'
            item.innerText = Math.round(oneStarRatings) + '%'
        }
    })
 
}


let helpfulBtns = [...document.getElementsByClassName('helpfulBtn')]
helpfulBtns.forEach((btn)=>btn.addEventListener('click',(e)=>{
    const csrf = document.getElementsByName('csrfmiddlewaretoken')[0].value
    const id = btn.id
    console.log(id)
    $.ajax({
        type: 'POST',
        url : `${url}${id}/update`,
        data: {'csrfmiddlewaretoken':csrf,'comment': "I am herer"},
        success: function(response){
            console.log("It works")
            console.log(response['result'])
            window.location.href = "."
            
        },
        error: function(response){
            console.log('error')
        }
    })
    
}))

progessbar()