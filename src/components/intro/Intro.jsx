import React from 'react'
import "./intro.css"

const Intro = () => {
    return (
        <div className='i'>
            <div className="i-left">
                <div className="i-left-wrapper">
                    <h2 className='i-intro'>Hello, My Name Is</h2>
                    <h1 className='i-name'>Aniket</h1>
                    <div className="i-title">
                        <div className="i-title-wrapper">
                            <div className="i-title-item">Student</div>
                            <div className="i-title-item">Job Seeker</div>
                            <div className="i-title-item">Technoorbition</div>
                            <div className="i-title-item">Web Developer</div>
                        </div>
                    </div>
                    <div className="i-desc">
                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Quo corporis cumque accusamus quidem id et itaque a iusto numquam rem laborum dicta, qui quae molestias dolore maiores aspernatur error sapiente.
                    </div>
                </div>
            </div>
            <div className="i-right">
                <div className="i-img">
                    <img src="../../images/logo.png" alt="" />
                </div>
            </div>
        </div>
    )
}

export default Intro
