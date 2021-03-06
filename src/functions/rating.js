import React from 'react'
import StarRating from 'react-star-ratings'

export const showAverage = (p) => {
   if(p && p.ratings) {
       let ratingArray = p && p.ratings
       let total = []
       let length = ratingArray.length
        console.log(length)
       ratingArray.map( r => total.push(r.star))

       let totalReduced = total.reduce( (p,n) => p + n, 0)

       console.log(totalReduced)

       let highest = length * 5; 

       let result = (totalReduced * 5) / highest; 

       console.log(result)

       return (
            <div className="text-center pt-1 pb-3">
                <span>
                    <StarRating  starDimension="20px" starSpacing="2px" startRatedColor="red" editing={false} rating={result} />{" "} ({p.ratings.length})
                </span>
            </div>
       )
   }
}


