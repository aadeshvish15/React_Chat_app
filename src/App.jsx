import { useEffect } from "react";
import Chat from "./components/chat/Chat";
import Details from "./components/details/Details";
import List from "./components/list/List";
import Login from "./components/login/Login";
import Notifications from "./notifications/Notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./utils/FirebaseConfig";
import { useUserStore } from "./utils/UserStore";
import { useChatStore } from "./utils/ChatStore";


const App = () => {

  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
    const { chatId } = useChatStore();
  


  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid)
    });
    return () => {
      unSub();
    }
  }, [fetchUserInfo]);

  if (isLoading) {
    return <div className="loading">Loading...</div>
  }

  // console.log(currentUser);
  

  return (
    <div className="container">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {chatId && <Details />}
        </>
      ) : (
        <Login />
      )}

      <Notifications />
    </div>
  );
};

export default App;
