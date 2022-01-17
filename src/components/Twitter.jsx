import React, {useState} from 'react'
import './twitter.css'

const Twitter = (props) => {
    const [like,setLike]  = useState(0)
    const [up,setUp] = useState(false);
    const increment = () =>{
        setLike(like+1);
        setUp(true);
    }
    const decrement = () =>{
        setLike(like-1);
        setUp(false);
    }
    return (
        <div>
            <div className="comment-wrapper">
                <div className={up ? 'name' : '' }>
                    <h2>Name:{props.name}</h2>
                </div>
                <div className="comment">
                    <b>message </b><p id='para'>:{props.message}</p>
                </div>
                <div className="likes">
                    <button onClick={increment}>Like</button>
                    <button onClick={decrement}>Dislike</button>
                </div>
                <h1>{like}</h1>
            </div>
        </div>
    )
}

export default Twitter
