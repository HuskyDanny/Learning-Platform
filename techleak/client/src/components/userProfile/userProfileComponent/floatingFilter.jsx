import React from 'react'
import { connect } from "react-redux";
import "./profilePanel.css";

const boxStyle = {
    height: "100%",
    width: "85%",
    alignItems: "center",
    justifyContent: "center"
}

const containerStyle = {
    height: "60%",
    position: "fixed",
    width: "29%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

class FloatingFilter extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            postType: this.props.postType,
            searchKeyWords: ""
        }
        this.handleFilterInputChange = this.handleFilterInputChange.bind(this);
        this.componentDidUpdate = this.componentDidUpdate.bind(this);
    }

    componentDidUpdate(prevProps) {
        if (prevProps.postType !== this.props.postType) {
            this.setState({ postType: this.props.postType });
            this.setState({ searchKeyWords: "" })
        }
    }

    handleFilterInputChange = async (keywords) => {
        await this.setState({ searchKeyWords: keywords })
        let unfilteredPostsDetail = [];
        if (this.state.postType === "MyLikes") {
            unfilteredPostsDetail = this.props.likedPostsDetail;
        } else if (this.state.postType === "MyPosts") {
            unfilteredPostsDetail = this.props.myPostsDetail;
        }
        let filteredPostsDetail = unfilteredPostsDetail.filter((post) => {
            let title = post.title.toLowerCase();
            return title.indexOf(this.state.searchKeyWords.toLowerCase()) != -1;
        })
        console.log(this.state.searchKeyWords)
        this.props.handleFilter(filteredPostsDetail)
    }

    render() {
        return (
            <div className="column" style={{ flex: "30%" }}>
                <div className="container" style={containerStyle}>
                    <div className="box content" style={boxStyle}>
                        <div className="boxwrapper" style={{ padding: "10px" }}>
                            <section style={{ paddingBottom: "30px" }}>
                                <h4>Posts Filter:</h4>
                                <div className="field is-grouped">
                                    <p className="control is-expanded">
                                        <input
                                            className="input is-primary"
                                            type="text"
                                            placeholder="Find a post"
                                            value={this.state.searchKeyWords}
                                            onChange={e => this.handleFilterInputChange(e.target.value)} />
                                    </p>
                                    <p className="control">
                                        <a className="button is-success">
                                            Search
                                  </a>
                                    </p>
                                </div>
                            </section>

                            <section style={{ paddingBottom: "30px" }}>
                                <h4>Tags:</h4>
                                <div className="field">
                                    <div className="form-group" style={{ marginBottom: "5px" }}>
                                        <input
                                            className="contact-input"
                                            placeholder="Enter tags here"
                                            type="text"
                                        ></input>
                                    </div>
                                    <p>suggested:
                                    <div style={{ margin: "5px", display: "inline-block" }}></div>
                                        <a className="button is-primary is-small">
                                            <span>Java</span>
                                        </a>
                                        <div style={{ margin: "5px", display: "inline-block" }}></div>
                                        <a className="button is-primary is-small">
                                            <span>Python</span>
                                        </a>
                                    </p>
                                </div>
                            </section>

                            <section style={{ paddingBottom: "30px" }}>
                                <h4>Sorted by:</h4>
                                <div className="control">
                                    <section style={{ alignItems: "center" }}>
                                        <label className="radio">
                                            <input type="radio" name="foobar" />
                                            time (from oldest to newest)
                                </label>
                                    </section>
                                    <section>
                                        <label className="radio">
                                            <input type="radio" name="foobar" />
                                            time (from newest to oldest)
                                </label>
                                    </section>
                                    <section>
                                        <label className="radio">
                                            <input type="radio" name="foobar" />
                                            views
                                </label>
                                    </section>
                                    <section>
                                        <label className="radio">
                                            <input type="radio" name="foobar" />
                                            answers
                                </label>
                                    </section>
                                </div>
                            </section>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        likedPostsDetail: state.persistedReducer.likedPostsDetail,
        myPostsDetail: state.persistedReducer.myPostsDetail,
        postType: state.persistedReducer.postType
    };
};

const mapDispatchToProps = dispatch => {
    return {
        handleFilter: (filteredPostsDetail) =>
            dispatch({
                type: "FILTERCHANGE",
                filteredPostsDetail: filteredPostsDetail,
            })
    };
};

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(FloatingFilter);