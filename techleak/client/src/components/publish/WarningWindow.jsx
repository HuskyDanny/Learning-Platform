import React, { Component } from "react";
import { Link } from "react-router-dom";

class WarningWindow extends Component {
    render() {
        let button = (
            <button
                className="button is-link"
                onClick={this.props.onCloseModal}
                style={{
                    width: "30%",
                    alignSelf: "center"
                }}>
                Okay, I Got It
            </button>
        )

        if (this.props.buttonType === "ToFrontPage") {
            button = (
                <Link
                    className="button is-link"
                    onClick={this.handlePostCancel}
                    to="/"
                >
                    Okay, I Got It
                </Link>
            )
        }
        return (
            <section style={{ display: "flex", flexDirection: "column" }}>
                <span
                    style={{
                        fontFamily: "sans-serif",
                        fontWeight: "700",
                        fontSize: "20px",
                        textAlign: "center"
                    }}
                >
                    <i
                        class="fas fa-exclamation-triangle"
                        style={{
                            color: "#F2EC53",
                            fontWeight: "0.5rem",
                            paddingRight: "0.5rem"
                        }}
                    >
                        {" "}
                    </i>
                    Warning
                </span>
                <br />
                <div
                    style={{
                        fontSize: "1.2rem",
                        textAlign: "center",
                        fontWeight: "450"
                    }}
                >
                    {this.props.message}{" "}
                </div>
                <br />
                {button}
            </section>
        )
    }
}

export default WarningWindow;