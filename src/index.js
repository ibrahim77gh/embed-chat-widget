// index.js
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';

const root = ReactDOM.createRoot(document.getElementById('root'));

// Customization props
const defaultTitle = "Default Title";
const defaultSubtitle = "Default Subtitle";

// Function to merge default and custom props
const mergeProps = (defaultProps, customProps) => {
  return { ...defaultProps, ...customProps };
};

// Function to extract customization options from global variable
const extractCustomizationOptions = () => {
  if (window.MyChatWidget && typeof window.MyChatWidget === 'object') {
    return {
      title: window.MyChatWidget.title,
      subtitle: window.MyChatWidget.subtitle,
      // Add other customization options here
    };
  }
  return {};
};

const renderApp = () => {
  const customProps = extractCustomizationOptions();
  const mergedProps = mergeProps({ title: defaultTitle, subtitle: defaultSubtitle }, customProps);
  root.render(
    <App {...mergedProps} />
  );
};

renderApp();

reportWebVitals();
