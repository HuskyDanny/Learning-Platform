import React from "react";
import image from "../../assets/img/techleak.jpg";
import image2 from "../../assets/img/elearning.png";
import image3 from "../../assets/img/uw.png";
import image4 from "../../assets/img/play-study-hard.jpg";
const About = props => {
  return (
    <article
      className="message is-primary"
      id="about"
      style={{ margin: "3% auto 0 auto", width: "90%" }}
    >
      <div className="message-body">
        <p className="is-size-4 is-uppercase">About The Platform</p>
        This is an ALL-LEVEL learning and sharing platform intending to provide
        all sorts of knowledge related to computer science (interview
        preparation, tool tips, algorithm, industry practice ).{" "}
        <strong>Our content </strong>is tag based, and with our instant search,
        you can conveniently look for what is important for you.{" "}
        <strong>You can </strong>post your thoughts or experience on what you
        have learned recently. The feynman learning technique shows the best
        learning is teaching others in your own words, sharing will not only
        enhance your understanding but cultivating this lovely community.
        <strong> Our editor </strong> is rich text editor, you can upload image,
        insert a link or embed a video for better illustration
        <br />
        Last but not least, wish you guys all can grow your skillset and have a
        dream offer
        <br />
        <img src={image} width="262" height="300" alt="logo" />
        <img src={image3} width="382" height="200" alt="logo" />
        <img src={image4} width="132" height="200" alt="logo" />
        <img src={image2} width="160" height="200" alt="logo" />
        <br />
        <br />
        <p className="is-size-4 is-uppercase">
          Main Contributor (click name to see more)
        </p>
        <ul>
          <li>
            <a href="https://​linkedin.com/in/jcp18">Junchen Pan:</a> Software
            developer at SAP Shanghai
          </li>
          <li>
            <a href="https://www.linkedin.com/in/hantao-liu-6722b6115/">
              Hantao Liu:
            </a>
            Master in Computer Science at Northeastern University
          </li>
          <li>
            <a href="https://linkedin.com/in/garret-qihua-yang">Qihua Yang:</a>
            Master in Software Engineering at University of Texas at Austin
          </li>
        </ul>
        <p className="is-size-4 is-uppercase" style={{ marginTop: "10%" }}>
          Special Thanks
        </p>
        Special thanks to <a href="/designer">Zhuoran Deng</a>, who designed our
        logo, checkout her website if you want some UI/UX design
      </div>
    </article>
  );
};

export default About;
