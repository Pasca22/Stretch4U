import { Colors } from "@/constants/Colors";
import {
  CHATBOT_AVATAR,
  CHATBOT_HEADER_TEXT,
  CHATBOT_INTRO_MESSAGE,
} from "@/constants/Text";
import { useLoadFonts } from "@/hooks/useLoadFonts";
import { useAuth } from "@/services/auth-context";
import {
  getMessages,
  sendMessageToChatbot,
} from "@/web-api/messages-endpoints";
import React, { useCallback, useEffect, useState } from "react";
import { StyleSheet, View, Text, TouchableOpacity } from "react-native";
import {
  Bubble,
  Composer,
  GiftedChat,
  IMessage,
  InputToolbar,
} from "react-native-gifted-chat";

const ChatBot: React.FC = () => {
  const [messages, setMessages] = useState<IMessage[]>([]);
  const { user, token } = useAuth();
  const fontsLoaded = useLoadFonts();

  if (!fontsLoaded) {
    return null;
  }

  useEffect(() => {
    const loadMessages = async () => {
      const messages = await getMessages(user?.id || 1, token || "");
      const formattedMessages = messages.flatMap((message) => {
        return [
          {
            _id: `${message.id}-response`,
            text: message.response,
            createdAt: new Date(message.createdAt),
            user: {
              _id: 0,
            },
          },
          {
            _id: `${message.id}-content`,
            text: message.content,
            createdAt: new Date(message.createdAt),
            user: {
              _id: user?.id || 1,
            },
          },
        ];
      });
      setMessages((prevMessages) =>
        GiftedChat.append(prevMessages, formattedMessages)
      );
    };
    setMessages([
      {
        _id: 1,
        text: CHATBOT_INTRO_MESSAGE,
        createdAt: new Date(),
        user: {
          _id: 0,
          name: "Chatbot",
          avatar: CHATBOT_AVATAR,
        },
      },
    ]);
    loadMessages();
  }, []);

  const onSend = useCallback(
    async (newMessages: IMessage[] = []) => {
      setMessages((previousMessages) =>
        GiftedChat.append(previousMessages, newMessages)
      );

      const userMessage = newMessages[0]?.text || "";

      try {
        const response = await sendMessageToChatbot(
          user?.id ?? 0,
          userMessage,
          token ?? ""
        );

        const botMessage: IMessage = {
          _id: new Date().getTime(),
          text: response.response,
          createdAt: new Date(),
          user: {
            _id: 0,
            name: "Chatbot",
            avatar: CHATBOT_AVATAR,
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [botMessage])
        );
      } catch (error) {
        const errorMessage: IMessage = {
          _id: new Date().getTime(),
          text: "Sorry, something went wrong. Please try again later.",
          createdAt: new Date(),
          user: {
            _id: 0,
            name: "Chatbot",
            avatar: CHATBOT_AVATAR,
          },
        };

        setMessages((previousMessages) =>
          GiftedChat.append(previousMessages, [errorMessage])
        );
      }
    },
    [user]
  );
  const renderBubble = (props: any) => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          right: {
            backgroundColor: Colors.primary,
          },
        }}
        textStyle={{
          right: {
            fontFamily: "OpenSans",
            color: "#fff",
          },
          left: {
            fontFamily: "OpenSans",
            color: "#000",
          },
        }}
      />
    );
  };

  const renderInputToolbar = (props: any) => {
    return <InputToolbar {...props} containerStyle={styles.inputToolbar} />;
  };

  const renderComposer = (props: any) => {
    return <Composer {...props} textInputStyle={styles.textInput} />;
  };

  const renderSend = (props: any) => {
    return (
      <TouchableOpacity
        style={styles.sendButton}
        onPress={() => {
          if (props.text.trim().length > 0) {
            props.onSend({ text: props.text.trim() }, true);
          }
        }}
      >
        <Text style={styles.sendText}>Send</Text>
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{CHATBOT_HEADER_TEXT}</Text>
      <GiftedChat
        messages={messages}
        onSend={(messages) => onSend(messages)}
        user={{
          _id: user?.id || 1,
        }}
        renderBubble={renderBubble}
        renderInputToolbar={renderInputToolbar}
        renderComposer={renderComposer}
        renderSend={renderSend}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    backgroundColor: Colors.background,
  },
  header: {
    padding: 10,
    textAlign: "center",
    fontSize: 20,
    fontFamily: "OpenSans_Bold",
  },
  userTextMessage: {
    backgroundColor: Colors.primary,
    color: "#fff",
  },
  inputToolbar: {
    backgroundColor: Colors.background,
    borderTopColor: "#cccccc",
    padding: 8,
  },
  textInput: {
    backgroundColor: "#fff",
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 6,
    fontSize: 16,
    color: "#000",
  },
  sendButton: {
    backgroundColor: Colors.primary,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 12,
    paddingVertical: 8,
    marginLeft: 8,
    marginBottom: 4,
  },
  sendText: {
    color: "#ffffff",
    fontSize: 16,
  },
});

export default ChatBot;
