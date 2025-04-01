import "./chatPage.css";
import NewPrompt from "../../components/newPrompt/NewPrompt";
import { useQuery } from "@tanstack/react-query";
import { useLocation } from "react-router-dom";
import Markdown from "react-markdown";
import { IKImage } from "imagekitio-react";

const ChatPage = () => {
  const path = useLocation().pathname;
  const chatId = path.split("/").pop();

  const { isPending, error, data } = useQuery({
    queryKey: ["chat", chatId],
    queryFn: () =>
      fetch(`${import.meta.env.VITE_API_URL}/api/chats/${chatId}`, {
        credentials: "include",
      }).then((res) => res.json()),
  });

  return (
    <div className="chatPage">
      <div className="wrapper">
        <div className="chat">
          {isPending
            ? <div className="loading">Loading...</div>
            : error
            ? <div className="error">Something went wrong!</div>
            : data?.history?.map((message, i) => (
                <div key={i} className={message.role === "user" ? "message user" : "message bot"}>
                  {message.img && (
                    <IKImage
                      urlEndpoint={import.meta.env.VITE_IMAGE_KIT_ENDPOINT}
                      path={message.img}
                      className="uploadedImage"
                      style={{ maxWidth: "100%",
                        width: "100%",
                        height: "auto",
                        maxHeight: "500px",
                        borderRadius: "20px",
                        marginBottom: "15px",
                        objectFit: "cover", }}
                      loading="lazy"
                      lqip={{ active: true, quality: 20 }}
                    />
                  )}
                  <Markdown>{message.parts[0].text}</Markdown>
                </div>
              ))}

          {data && <NewPrompt data={data}/>}
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
