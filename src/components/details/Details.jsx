import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore";
import { useChatStore } from "../../utils/ChatStore";
import { useUserStore } from "../../utils/UserStore";
import "./details.css";
import { db } from "../../utils/FirebaseConfig";

const Details = () => {

  const { changeBlock, user, isCurrentUserBlocked, isReceiverBlocked } = useChatStore();
    const { currentUser } = useUserStore();
  
  const handleBlock = async() => {
    if (!user) return;
    const userDocRef = doc(db, "Users", currentUser.id);
    try {
      await updateDoc(userDocRef, {
        blocked: isReceiverBlocked ? arrayRemove(user.id) : arrayUnion(user.id)
      });
      changeBlock();

    } catch (err) {
      console.error(err);
    }
    }


  return (
    <div className="details">
      <div className="user">
        <img src={user?.avatar || "./avatar.png"} alt="" />
        <h2>{user?.username}</h2>
        <p>Lorem ipsum dolor sit amet.</p>
      </div>
      
      <div className="info">
        <div className="option">
          <div className="title">
            <span>Chat settings</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Privacy & help</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared photos</span>
            <img src="./arrowDown.png" alt="" />
          </div>
          
          <div className="photos">
            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpeg" alt="" />
                <span>Photo_2323nsdi.jpg</span>
              </div>
              <img src="./download.png" alt="" className="downloadImg"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpeg" alt="" />
                <span>Photo_2323nsdi.jpg</span>
              </div>
              <img src="./download.png" alt="" className="downloadImg"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpeg" alt="" />
                <span>Photo_2323nsdi.jpg</span>
              </div>
              <img src="./download.png" alt="" className="downloadImg"/>
            </div>

            <div className="photoItem">
              <div className="photoDetail">
                <img src="./sample.jpeg" alt="" />
                <span>Photo_2323nsdi.jpg</span>
              </div>
              <img src="./download.png" alt="" className="downloadImg"/>
            </div>
          </div>
        </div>

        <div className="option">
          <div className="title">
            <span>Shared files</span>
            <img src="./arrowUp.png" alt="" />
          </div>
        </div>

        <button onClick={handleBlock}>
          {isCurrentUserBlocked ? "You're blocked!" : isReceiverBlocked ? "Unblock User" : "Block User"}
        </button>
      </div>
    </div>
  );
};

export default Details;
