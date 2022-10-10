import "./onlinechat.css";

const Onlinechat = () => {
  return (
    <div className="online_chat">
      <div className="online__chat__chatheads">
        <div className="online__chat__chathead">
          <img src="/assets/person/1.jpeg" alt="profile" />
          <div className="online__chat__indicator"></div>
        </div>
        <h4>John Doe</h4>
      </div>
      <div className="online__chat__chatheads">
        <div className="online__chat__chathead">
          <img src="/assets/person/1.jpeg" alt="profile" />
          <div className="online__chat__indicator"></div>
        </div>
        <h4>John Doe</h4>
      </div>
      <div className="online__chat__chatheads">
        <div className="online__chat__chathead">
          <img src="/assets/person/1.jpeg" alt="profile" />
          <div className="online__chat__indicator"></div>
        </div>
        <h4>John Doe</h4>
      </div>
    </div>
  );
};

export default Onlinechat;
