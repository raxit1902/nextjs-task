import React from 'react'
import "../../styles/Card.css"

type CardProps = {
    title?: string;
    discription?: string;
}

const Card: React.FC<CardProps> = ({ title, discription }) => {
    return (
        <div className='card' >
            <span>{title}</span>
            <p>{discription}</p>
        </div>
    )
}

export default Card