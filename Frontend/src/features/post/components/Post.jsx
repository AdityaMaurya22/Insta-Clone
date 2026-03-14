import React from 'react'


const Post = ({user, post, handleLike, handleUnlike}) => {
    return (
        <div className="post">
            <div className="user">
                <div className="image-wrapper">
                    <img src={user.profile_image} alt="" />
                </div>

                <h3>{user.username}</h3>
            </div>
            <img src={post.imgUrl} alt="" />
            <div className="description">
                <div className="icons">
                    <div className="left">
                        <i 
                        onClick={() => post.isLiked?handleUnlike(post._id):handleLike(post._id)}
                        className="ri-heart-line" id={post.isLiked?"Like":""}></i>
                        <i className="ri-chat-4-line"></i>
                        <i className="ri-share-forward-line"></i>
                    </div>
                    <div className="right">
                        <i className="ri-bookmark-line"></i>
                    </div>
                </div>
                <div className="caption">
                    <p>{post.caption}</p>
                </div>
            </div>
        </div>
    )
}

export default Post
