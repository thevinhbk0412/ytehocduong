declare const GEMINI_API_KEY: string;
declare const APP_URL: string;

interface Window {
  aistudio: {
    hasSelectedApiKey: () => Promise<boolean>;
    openSelectKey: () => Promise<void>;
  };
}