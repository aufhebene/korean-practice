import { conversationScenarios } from "@/data/conversation";
import ConversationQuizClient from "./ConversationQuizClient";

export function generateStaticParams() {
  return conversationScenarios.map((scenario) => ({ id: scenario.id }));
}

export default function ConversationQuizPage() {
  return <ConversationQuizClient />;
}
