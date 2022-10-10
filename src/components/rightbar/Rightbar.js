import "./rightbar.css";
import { Users } from "../../dummyData";

const Rightbar = () => {
  return (
    <div className="rightbar">
      <div className="rightbar__gifts">
        <img src="assets/gift.png" alt="" />
        <p>
          <strong>Pola Foster</strong> and <strong>3 other friends</strong> have
          a birthday today.
        </p>
      </div>
      <img src="assets/ad.png" alt="" className="ad-image" />
      <h3>Online Friends</h3>
      <div className="rightbar__online">
        {Users.map((user) => {
          return (
            <div key={user.id} className="rightbar__online__single">
              <div className="rightbar__online__single__image">
                <img src={user.profilePicture} alt="" />
              </div>
              <div className="rightbar__online__person">
                <div></div>
                <p>{user.username}</p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Rightbar;
