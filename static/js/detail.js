console.log("Detail page")

const prodCards = [...document.getElementsByClassName('card-header')]
const stars = [...document.getElementsByClassName('stars')]
const url = window.location.href
console.log(url)
console.log("Star",stars)
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
    // console.log("sdj")
})


document.getElementById('back-btn').addEventListener('click',()=>{
    window.location.href = "http://localhost:8000/"
})




