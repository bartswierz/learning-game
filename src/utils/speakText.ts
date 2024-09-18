/**
 * Speaks the given text using the Web Speech API.
 *
 * @param {string} text - The text to be spoken.
 * @param {string} [language="en-US"] - The language in which the text should be spoken. Defaults to "en-US".
 */
// const speakText = ({ text, language = "en-US" }: SpeakTextProps) => {
const speakText = (text: string, language: string = "en-US") => {
  // Cancel any ongoing speech
  if (window.speechSynthesis.speaking) {
    window.speechSynthesis.cancel();
  }

  const sentence = new SpeechSynthesisUtterance();
  sentence.text = text;
  sentence.lang = language;
  window.speechSynthesis.speak(sentence);
};

export default speakText;
