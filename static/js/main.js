console.log("Hello there")

const prodCards = [...document.getElementsByClassName('product-list-card')]


prodCards.forEach((c)=>{
    const name = c.getAttribute('data-title')
    const avgRating = c.getAttribute('data-rating')
    const id = c.getAttribute('data-id')
    
    const ratingBox = document.getElementById(name +id+'id')
    console.log("Rating",ratingBox)
 
    for(let i=1;i<6;i++){
        if(i<=avgRating){
            ratingBox.innerHTML += `<span><i style="color:orange" class ="fa fa-star"></i></span>`
        }else{
            ratingBox.innerHTML += `<span id="5" ><i  class ="fa fa-star-o"></i></span>`
        }
    }
    
})
