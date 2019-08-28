import React from 'react'

class MessagePost extends React.Component {
    render() {
        return (
            <div className = "box">
            <article className="media">
                <figure className="media-left">
                    <p className="image is-64x64">
                        <img src="https://bulma.io/images/placeholders/128x128.png" alt=""/>
                    </p>
                </figure>
                <div className="media-content">
                    <div className="content">
                        <p>
                            <strong>John Smith</strong> <small>@johnsmith</small> <small>31m</small>
                        <br/>
                            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ornare magna eros, eu pellentesque tortor vestibulum ut. Maecenas non massa sem. Etiam finibus odio quis feugiat facilisis.
                        </p>
                    </div>
                </div>
                <div className="media-right">
                    <nav className="level is-mobile">
                        <div className="level-left">
                            <button className="level-item button is-white">
                                <span className="icon is-small"><i className="fas fa-reply"></i></span>
                            </button>
                        </div>
                    </nav>
                </div>
            </article> 
            </div>           
        )
    }
}

export default MessagePost;