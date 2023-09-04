import { useContext, useRef, useState } from "react";
import axios from "axios";
import PhotoLibraryIcon from "@mui/icons-material/PhotoLibrary";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";
import "./share.css";
import { AuthContext } from "../../context/AuthContext";

const Share = () => {
  const { user } = useContext(AuthContext);
  const desc = useRef();
  const [baseImage, setBaseImage] = useState("");

  const sharePost = async (e) => {
    e.preventDefault();

    const postData = {
      userId: user._id,
      desc: desc.current.value,
      img: baseImage,
    };

    try {
      if (!postData.desc && !postData.img)
        alert("Either enter desc or upload image, plz!!!");
      else {
        await axios.post(`${process.env.REACT_APP_API_URL}/posts`, postData);
        window.location.reload(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  // upload Image
  const uploadImage = async (e) => {
    const file = e.target.files[0];
    const base64 = await convertBase64(file);
    setBaseImage(base64);
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);

      fileReader.onload = () => {
        resolve(fileReader.result);
      };

      fileReader.onerror = (error) => {
        reject(error);
      };
    });
  };
  // End of upload

  return (
    <div className="share-container">
      <div className="share-input-container">
        <div>
          <img
            src={
              user.profilePicture ? user.profilePicture : "/assets/download.png"
            }
            alt=""
          />
        </div>
        <input
          type="text"
          placeholder={`What's in your mind ${user.username}?`}
          ref={desc}
        />
      </div>
      <hr />
      {baseImage && (
        <div
          style={{
            position: "relative",
            width: "30rem",
            margin: "0 auto",
          }}
        >
          <img
            src={baseImage}
            alt="uploaded img"
            style={{ maxWidth: "30rem" }}
          />
          <button
            style={{
              position: "absolute",
              top: "0",
              right: "0",
              padding: "1rem",
            }}
            onClick={() => setBaseImage("")}
          >
            Close
          </button>
        </div>
      )}
      <form className="share-upload">
        <div className="share-upload_extra">
          <label htmlFor="file">
            <PhotoLibraryIcon style={{ color: "#FF6246", fontSize: "3rem" }} />
            <p>Photo or Video</p>
            <input
              id="file"
              style={{ display: "none" }}
              type="file"
              onChange={(e) => {
                uploadImage(e);
              }}
            />
          </label>
          <div>
            <LocalOfferIcon style={{ color: "#0300FF", fontSize: "3rem" }} />
            <p>Tag</p>
          </div>
          <div>
            <LocationOnIcon style={{ color: "#028200", fontSize: "3rem" }} />
            <p>Location</p>
          </div>
          <div>
            <EmojiEmotionsIcon style={{ color: "#D7A328", fontSize: "3rem" }} />
            <p>Feelings</p>
          </div>
        </div>
        <button type="submit" onClick={sharePost}>
          Share
        </button>
      </form>
    </div>
  );
};

export default Share;
