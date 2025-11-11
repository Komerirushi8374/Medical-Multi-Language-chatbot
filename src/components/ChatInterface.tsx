import { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { ChatMessage } from "./ChatMessage";
import { Send, Loader2 } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

interface Message {
  text: string;
  isBot: boolean;
}

interface ChatInterfaceProps {
  language: string;
  conversationId: string | null;
  onConversationCreated: (id: string) => void;
}

export interface ChatInterfaceRef {
  sendSymptoms: (symptoms: string[]) => void;
  loadConversation: (conversationId: string) => void;
  clearMessages: () => void;
}

export const ChatInterface = forwardRef<ChatInterfaceRef, ChatInterfaceProps>(
  ({ language, conversationId, onConversationCreated }, ref) => {
    const [messages, setMessages] = useState<Message[]>([
      {
        text: "Hello! I'm your medical assistant. How can I help you today? Please remember that I provide general information only, and you should always consult healthcare professionals for medical advice.",
        isBot: true,
      },
    ]);
    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [currentConversationId, setCurrentConversationId] = useState<string | null>(conversationId);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    setCurrentConversationId(conversationId);
  }, [conversationId]);

  const loadConversation = async (convId: string) => {
    try {
      const { data, error } = await supabase
        .from("messages")
        .select("*")
        .eq("conversation_id", convId)
        .order("created_at", { ascending: true });

      if (error) throw error;

      if (data && data.length > 0) {
        const loadedMessages = data.map((msg) => ({
          text: msg.content,
          isBot: msg.is_bot,
        }));
        setMessages(loadedMessages);
      }
    } catch (error) {
      console.error("Error loading conversation:", error);
    }
  };

  const clearMessages = () => {
    setMessages([
      {
        text: "Hello! I'm your medical assistant. How can I help you today? Please remember that I provide general information only, and you should always consult healthcare professionals for medical advice.",
        isBot: true,
      },
    ]);
    setCurrentConversationId(null);
  };

  useImperativeHandle(ref, () => ({
    sendSymptoms: (symptoms: string[]) => {
      if (symptoms.length > 0) {
        sendMessage(symptoms[0]);
      }
    },
    loadConversation,
    clearMessages,
  }));

  const createOrUpdateConversation = async (userMessage: string, botReply: string) => {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return;

      let convId = currentConversationId;

      if (!convId) {
        const { data: conversation, error: convError } = await supabase
          .from("conversations")
          .insert({
            user_id: user.id,
            title: userMessage.substring(0, 50) + "...",
            language: language,
          })
          .select()
          .single();

        if (convError) throw convError;
        convId = conversation.id;
        setCurrentConversationId(convId);
        onConversationCreated(convId);
      }

      await supabase.from("messages").insert([
        {
          conversation_id: convId,
          content: userMessage,
          is_bot: false,
        },
        {
          conversation_id: convId,
          content: botReply,
          is_bot: true,
        },
      ]);
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  const sendMessage = async (messageText: string) => {
    if (!messageText.trim() || isLoading) return;

    setMessages((prev) => [...prev, { text: messageText, isBot: false }]);
    setIsLoading(true);

    try {
      const { data, error } = await supabase.functions.invoke("medical-chat", {
        body: { message: messageText, language },
      });

      if (error) throw error;

      setMessages((prev) => [...prev, { text: data.reply, isBot: true }]);

      await createOrUpdateConversation(messageText, data.reply);
    } catch (error) {
      console.error("Error sending message:", error);
      toast({
        title: "Error",
        description: "Failed to get response. Please try again.",
        variant: "destructive",
      });
      const errorMessage =
        "I apologize, but I'm having trouble connecting right now. Please try again in a moment.";
      setMessages((prev) => [
        ...prev,
        {
          text: errorMessage,
          isBot: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput("");
    await sendMessage(userMessage);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

    return (
      <Card className="flex flex-col h-[600px] bg-card border-border shadow-lg">
        <div className="flex-1 overflow-y-auto p-4 space-y-2">
          {messages.map((msg, idx) => (
            <ChatMessage key={idx} message={msg.text} isBot={msg.isBot} />
          ))}
          {isLoading && (
            <div className="flex gap-3 mb-4">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
                <Loader2 className="w-5 h-5 text-primary-foreground animate-spin" />
              </div>
              <div className="bg-card text-card-foreground rounded-2xl rounded-tl-none px-4 py-3 shadow-sm">
                <p className="text-sm text-muted-foreground">Thinking...</p>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>
        <div className="border-t border-border p-4 bg-muted/30">
          <div className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me about your health concerns..."
              disabled={isLoading}
              className="flex-1 bg-background"
            />
            <Button onClick={handleSend} disabled={isLoading || !input.trim()} className="px-6">
              {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Send className="w-4 h-4" />}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            This AI provides general information only. Always consult healthcare professionals.
          </p>
        </div>
      </Card>
    );
  }
);
