import React from 'react'
import StarRating from 'react-star-ratings'

const Star = ({starClick, numberOfStars}) => {
    return (
        <StarRating 
            changeRating={() => starClick(numberOfStars)}
            numberOfStars={numberOfStars}
            startDimension="20px"
            starSpacing="2px"
            starHoverColor="red"
            starEmptyColor="red"
        />
    )
}

export default Star
