import { useEffect } from 'react';

export default function DialogflowChatbot() {
  useEffect(() => {
    // Only run in the browser
    if (typeof window === 'undefined') return;

    // Prevent duplicates
    if (document.querySelector('df-messenger')) return;

    // Load script
    const script = document.createElement('script');
    script.src = 'https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1';
    script.async = true;
    document.body.appendChild(script);

    // Create widget
    const messenger = document.createElement('df-messenger');
    messenger.setAttribute('intent', 'WELCOME');
    messenger.setAttribute('chat-title', 'GCFR_FAQ');
    messenger.setAttribute('agent-id', '90c19923-e6c5-4ac0-94f9-6a24f64f0502');
    messenger.setAttribute('language-code', 'en');
    document.body.appendChild(messenger);
  }, []);

  return null;
}
