import Feeds from "../../components/Feeds/Feeds";
import Rightbar from "../../components/rightbar/Rightbar";
import Sidebar from "../../components/sidebar/Sidebar";
import "./home.css";

const Home = () => {
  return (
    <>
      <div className="home-container">
        <Sidebar />
        <Feeds />
        <Rightbar />
      </div>
    </>
  );
};

export default Home;
