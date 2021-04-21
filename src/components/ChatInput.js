import React, {useState} from "react";
import styled from "styled-components";
import {Button} from "@material-ui/core"
import {auth, db} from "../firebase";
import firebase from "firebase";
import {useAuthState} from "react-firebase-hooks/auth";

const ChatInput = ({channelName, channelId, chatRef}) => {
    const [input, setInput] = useState("");
    const [user] = useAuthState(auth);

    const sendMessage = (event) => {
        event.preventDefault(); //prevents refresh
        if (!channelId) return false;

        db.collection("rooms").doc(channelId).collection("messages").add({
            message: input,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),
            user: user.displayName,
            userImage: user.photoURL
                // "https://media-exp1.licdn.com/dms/image/C4E03AQHASogutdKBxg/profile-displayphoto-shrink_200_200/" +
                // "0/1612290761396?e=1622073600&v=beta&t=vHQgtGDUHbEbBzlnxlrx1JLVXyqDUmUhQ8URgG4ec38"
        });

        chatRef.current.scrollIntoView({
            behavior: "smooth"
        });
        setInput("");
    };

    return (
        <ChatInputContainer>
            <form>
                <input
                    onChange={(event) => setInput(event.target.value)}
                    value={input}
                    placeholder={`Message #${channelName}`}/>
                <Button hidden type="submit" onClick={sendMessage}>
                    Send
                </Button>
            </form>
        </ChatInputContainer>
    )
};

const ChatInputContainer = styled.div`
  border-radius: 20px;
  
  > form {
    position: relative;
    display: flex;
    justify-content: center;
  }
  
  > form > input {
    position: fixed;
    bottom: 30px;
    width: 60%;
    border: 1px solid gray;
    border-radius: 3px;
    padding: 20px;
    outline: none;
  }
  
  >form > button {
    display: none;
  }
`;

export default ChatInput;