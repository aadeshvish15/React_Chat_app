import { useState } from "react";
import { useUserStore } from "../../../utils/UserStore";
import "./userInfo.css";
import { auth } from "../../../utils/FirebaseConfig";
import { toast } from "react-toastify";

const UserInfo = () => {
  const { currentUser } = useUserStore();
  const [showPopover, setShowPopover] = useState(false);

  return (
    <div className="userInfo">
      <div className="user">
        <img src={currentUser.avatar || "./avatar.png"} alt="" />
        <h2>{currentUser.username}</h2>
      </div>
      
      <div className="icons">
        <img src="./edit.png" alt="" />
        <img src="./video.png" alt="" />
        <div className="more" style={{ position: "relative" }}>
          <img
            src="./more.png"
            alt=""
            onClick={() => setShowPopover((prev) => !prev)}
          />
          {showPopover && (
            <button
              onClick={() => {
                auth.signOut();
                toast.success("You've been logged out");
              }}
            >
              Log Out
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserInfo;
