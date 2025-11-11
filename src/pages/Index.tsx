import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { LanguageSelector } from "@/components/LanguageSelector";
import { ChatInterface, ChatInterfaceRef } from "@/components/ChatInterface";
import { SymptomsChecker } from "@/components/SymptomsChecker";
import { ChatHistory } from "@/components/ChatHistory";
import { Button } from "@/components/ui/button";
import { Activity, LogOut } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Session } from "@supabase/supabase-js";

const Index = () => {
  const [selectedLanguage, setSelectedLanguage] = useState("english");
  const [session, setSession] = useState<Session | null>(null);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const chatInterfaceRef = useRef<ChatInterfaceRef>(null);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleSymptomsSubmit = (symptoms: string[]) => {
    const symptomsMessage = `I have the following symptoms: ${symptoms.join(", ")}. Can you provide relevant health information and advice?`;
    chatInterfaceRef.current?.sendSymptoms([symptomsMessage]);
  };

  const handleConversationSelect = (conversationId: string) => {
    setCurrentConversationId(conversationId);
    chatInterfaceRef.current?.loadConversation(conversationId);
  };

  const handleNewChat = () => {
    setCurrentConversationId(null);
    chatInterfaceRef.current?.clearMessages();
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/auth");
  };

  if (!session) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8 max-w-5xl">
        <header className="text-center mb-8 animate-in fade-in slide-in-from-top duration-500">
          <div className="flex items-center justify-center gap-3 mb-3">
            <Activity className="w-10 h-10 text-primary" />
            <h1 className="text-4xl md:text-5xl font-bold text-foreground">Health Assistant</h1>
          </div>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Check your symptoms and get health information in your preferred language
          </p>
          <div className="mt-4">
            <Button onClick={handleSignOut} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </header>

        <div className="space-y-6 animate-in fade-in slide-in-from-bottom duration-700">
          <LanguageSelector selectedLanguage={selectedLanguage} onLanguageChange={setSelectedLanguage} />
          <ChatHistory
            onConversationSelect={handleConversationSelect}
            onNewChat={handleNewChat}
            currentConversationId={currentConversationId}
          />
          <SymptomsChecker onSymptomsSubmit={handleSymptomsSubmit} language={selectedLanguage} />
          <ChatInterface
            ref={chatInterfaceRef}
            language={selectedLanguage}
            conversationId={currentConversationId}
            onConversationCreated={setCurrentConversationId}
          />
        </div>

        <footer className="text-center mt-8 text-sm text-muted-foreground">
          <p className="font-semibold mb-1">⚕️ Important Medical Disclaimer</p>
          <p className="max-w-2xl mx-auto">
            This AI assistant provides general health information for educational purposes only. 
            It is not a substitute for professional medical advice, diagnosis, or treatment. 
            Always seek the advice of your physician or qualified healthcare provider with any questions 
            you may have regarding a medical condition. Never disregard professional medical advice or 
            delay in seeking it because of something you have read here. In case of emergency, 
            call your local emergency services immediately.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default Index;
