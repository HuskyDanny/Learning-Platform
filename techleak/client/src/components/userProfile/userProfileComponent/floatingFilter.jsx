import React from 'react'
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
                                        <input className="input is-primary" type="text" placeholder="Find a post" />
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

export default FloatingFilter;