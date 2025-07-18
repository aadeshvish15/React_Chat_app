/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "./chatList.css";
import AddUser from "../../addUser/AddUser";
import { useUserStore } from "../../../utils/UserStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { db } from "../../../utils/FirebaseConfig";
import { useChatStore } from "../../../utils/ChatStore";


const ChatList = () => {

  const { currentUser } = useUserStore();
  const [addMode, setAddMode] = useState(false);
  const [search, setSearch] = useState("");
  const [chats, setChats] = useState([]);
  const { changeChat } = useChatStore();

  useEffect(() => {
    const unsub = onSnapshot(
      doc(db, "userChats", currentUser.id),
      async (res) => {
        const items = res.data().chats;

        const promises = items.map(async (item) => {
          const userDocRef = doc(db, "Users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);

          const user = userDocSnap.data();
          return { ...item, user };
        });

        const chatData = await Promise.all(promises); 
        setChats(chatData.sort((a,b)=>b.updatedAt-a.updatedAt));
    });
    
    return () => {
      unsub();
    }

  },[currentUser.id])

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex((item) => item.chatId === chat.chatId);
    userChats[chatIndex].isSeen = true;

    const userChatsRef = doc(db, "userChats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
    } catch (err) {
      console.error(err);
    }
  }

  const filteredChats = chats.filter((c) => (
    c.user.username.toLowerCase().includes(search.toLowerCase())
  ))

  return (
    <div className="chatList">
      <div className="search">
        <div className="searchBar">
          <img src="./search.webp" alt="" />
          <input type="text" placeholder="Search" className=""onChange={(e)=>{setSearch(e.target.value)}}/>
        </div>
        <img
          src={addMode ? "./minus.webp" : "./plus.webp"}
          alt="" className="add"
          onClick={()=>setAddMode(!addMode)}/>
      </div>
      

      {filteredChats.map((chat) => (
        <div
          className="itmes" key={chat.chatId}
          onClick={() => handleSelect(chat)}
          style={{backgroundColor: chat?.isSeen ? "transparent" : "#5183fe"}}
        >
          <img src={chat.user.blocked.includes(currentUser.id) ? "./avatar.webp" : chat.user?.avatar || "./avatar.webp"} alt="" />
        <div className="msgs">
          <h2>{chat.user.blocked.includes(currentUser.id) ? "User" : chat.user.username}</h2>
            <p>{chat.lastMessage}</p>
            {/* {console.log(chat)} */}
        </div>
      </div>
      ))}
            {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
