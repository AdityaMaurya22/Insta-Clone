import React, { useEffect } from 'react'
import '../style/feed.scss'
import Post from '../components/Post'
import { usePost } from '../hooks/usePost'
import Nav from '../../shared/components/Navbar'

const Feed = () => {

    const { feed, handleGetFeed, loading , handleLike, handleUnlike} = usePost()

    useEffect(() => {
        handleGetFeed()
    }, [])

    if (loading || !feed) {
        return (<main><h1>Feed is Loading...</h1></main>)
    }

    return (
        <main>
            <div className="feed-page">
                <Nav />
                <div className="feed">
                    <div className="posts">
                        {feed.filter(post => post && post.user).map(post => {
                            return <Post key={post._id} user={post.user} post={post} handleLike={handleLike} handleUnlike={handleUnlike}/>
                        })}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Feed
