import React, { Component } from 'react';
import axios from '../../../axios';

import Post from '../../../components/Post/Post';

import './Posts.css';

export default class Posts extends Component {
    
    state = {
        posts: []
    }

    componentDidMount() {
        axios.get('/posts')
        //axios.get('/postss') //error one
            .then(response => {
                //console.log(response);
                const posts = response.data.slice(0, 4);
                const updatedPosts = posts.map(post => {
                    return {
                        ...post,
                        author: 'Mal'
                    }
                });
                this.setState({ posts: updatedPosts });
            })
            .catch(error => {
                console.log(error);
                //this.setState({ error: true });
            });
    }

    postClickHandler = (selectedId) => {
        this.setState({ selectedPostId: selectedId });
    }
    
    render() {       

        let posts = <p style={{ textAlign: 'center' }}>Something went wrong!</p>;
        if (!this.state.error) {
            posts = this.state.posts.map(post => {
                return <Post
                    key={post.id}
                    title={post.title}
                    author={post.author}
                    clicked={() => this.postClickHandler(post.id)}
                />;
            });
        }

        return (
            <section className="Posts">
                {posts}
            </section>
        )
    }
}
