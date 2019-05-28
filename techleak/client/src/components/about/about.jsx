import React from "react";
import image from "../../assets/img/techleak.jpg";
import image2 from "../../assets/img/elearning.png";
import image3 from "../../assets/img/uw.png";
import image4 from "../../assets/img/play-study-hard.jpg";
const About = props => {
  return (
    <article
      class="message is-primary"
      style={{ margin: "3% auto 0 auto", width: "90%" }}
    >
      <div class="message-body">
        <p className="is-size-4 is-uppercase">About us</p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit.{" "}
        <strong>Pellentesque risus mi</strong>, tempus quis placerat ut, porta
        nec nulla. Vestibulum rhoncus ac ex sit amet fringilla. Nullam gravida
        purus diam, et dictum <a>felis venenatis</a> efficitur. Aenean ac{" "}
        <em>eleifend lacus</em>, in mollis lectus. Donec sodales, arcu et
        sollicitudin porttitor, tortor urna tempor ligula, id porttitor mi magna
        a neque. Donec dui urna, vehicula et sem eget, facilisis sodales sem.
        <img src={image} width="262" height="300" alt="logo" />
        <img src={image3} width="382" height="200" alt="logo" />
        <img src={image4} width="132" height="200" alt="logo" />
        <img src={image2} width="160" height="200" alt="logo" />
      </div>
    </article>
  );
};

export default About;
