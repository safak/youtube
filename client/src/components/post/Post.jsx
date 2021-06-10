import React from 'react'
import "./post.css"

const Post = ({video}) => {
    return (
        <div className="post">
            <div className="postImgContainer">
                <img src={video.img} alt="" className="postImg" />
                <span className="postDuration">{video.duration}</span>
            </div>
            <div className="postInfoContainer">
                <img className="postAvatar" src={video.channel.avatar} alt="" />
                <div className="postInfo">
                    <span className="postTitle">{video.title}</span>
                    <span className="postChannel">{video.channel.name}</span>
                    <span className="postDetail">{video.views} views • {video.date}</span>
                </div>
            </div>
        </div>
    )
}

export default Post
