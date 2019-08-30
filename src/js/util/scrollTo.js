export default function scrollTo(selector) {
  const element = document.querySelector(selector);
  if (element) {
    element.scrollIntoView({ 
      behavior: 'smooth' 
    });
    element.focus();
  }
}