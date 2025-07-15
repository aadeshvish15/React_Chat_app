import "./addUser.css"
import { arrayUnion, collection, doc, getDocs, query, serverTimestamp, setDoc, updateDoc, where } from "firebase/firestore";
import { db } from "../../utils/FirebaseConfig";
import { useState } from "react";
import { useUserStore } from "../../utils/UserStore";


const AddUser = () => {
  const [user, setUser] = useState();
    const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const username =formData.get("username");

    try {
      const userRef = collection(db, "Users");
      const q = query(userRef, where("username", "==", username));

      const querySnapShot = await getDocs(q);
      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data())
      }

    } catch (err) {
      console.error(err);
    }
}

  const handleAdd = async() => {
    const chatRef = collection(db, "chats");
    const userChatsRef = collection(db, "userChats");


    try {
      const newChatRef = doc(chatRef); // Create a new document reference with a unique ID in "chats" collection
      
        await setDoc(newChatRef, {
        createdAt: serverTimestamp(),// Set the creation time to the current server time
        messages: [],// Initialize with an empty messages arrays
      });

      await updateDoc(doc(userChatsRef, user.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now()
        })
      });

      await updateDoc(doc(userChatsRef, currentUser.id), {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now()
        })
      });


    } catch (err) {
      console.error(err);
    }
  }
  
  
  return (
    <div className="addUser">
      <form onSubmit={handleSearch}>
        <input type="text" placeholder="Username" name="username" />
        <button>Search</button>
      </form>
      
      {user && <div className="newUser">
        <div className="detail">
          <img src={user.avatar || "./avatar.png"} alt="" />
          <span>{user.username}</span>
        </div>
        <button onClick={handleAdd}>Add User</button>
      </div>}
    </div>
  )
}

export default AddUser;