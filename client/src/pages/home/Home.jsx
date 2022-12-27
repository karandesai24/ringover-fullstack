import "./home.scss";
import { Link } from "react-router-dom";
import shoe from "../../static/assets/home.jpg";
const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <div className="left">
          <div className="wrapper">
            <div className="about">
              <pre>
                <h1>
                  Check &nbsp;out <br />
                  🥶 &nbsp;feats..
                </h1>
              </pre>
            </div>
            <div className="links">
              <Link className="link" to="/store">
                Go to store
              </Link>
            </div>
          </div>
        </div>
        <div className="right">
          <img src={shoe} alt="shoe" />
        </div>
      </div>
    </div>
  );
};

export default Home;
