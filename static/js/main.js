const prodCards = [...document.getElementsByClassName('product-list-card')]


prodCards.forEach((c)=>{
    const name = c.getAttribute('data-title')
    const avgRating = c.getAttribute('data-rating')
    const id = c.getAttribute('data-id')
    const ratingBox = document.getElementById(name +id+'id')
    const decimal = avgRating - Math.floor(avgRating)
    const integerPart = avgRating - decimal
    console.log(integerPart)
    console.log(decimal)

    for(let i=1;i<6;i++){
        if(decimal == 0){
            if(i<=avgRating){
                ratingBox.innerHTML += `<span><i style="color:orange" class ="fa fa-star fa-lg"></i></span>`
            }else{
                ratingBox.innerHTML += `<span id="5" ><i  class ="fa fa-star-o fa-lg" style="color:orange"></i></span>`
            }

        }else if(decimal != 0){
            if(i<=integerPart){
                ratingBox.innerHTML += `<span><i style="color:orange" class ="fa fa-star fa-lg"></i></span>`
            }else if(i == integerPart+1){
                ratingBox.innerHTML += `<span><i style="color:orange" class ="fa fa-star-half-o fa-lg" ></i></span>`
            }else{
                ratingBox.innerHTML += `<span id="5" ><i style="color:orange" class ="fa fa-star-o fa-lg"></i></span>`
            }
        }
    }  
})

