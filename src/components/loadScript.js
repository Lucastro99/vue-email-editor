const scriptUrl = 'https://gist.githubusercontent.com/Lucastro99/420705a44c6ce488e1629ee008d4fc06/raw/4b52844743cd0f30d5ef1b2238e864f7310c2062/embed.js';
const callbacks = [];
let loaded = false;

const isScriptInjected = () => {
  const scripts = document.querySelectorAll('script');
  let injected = false;

  scripts.forEach((script) => {
    if (script.src.includes(scriptUrl)) {
      injected = true;
    }
  });

  return injected;
};

const addCallback = (callback) => {
  callbacks.push(callback);
};

const runCallbacks = () => {
  if (loaded) {
    let callback;

    while ((callback = callbacks.shift())) {
      callback();
    }
  }
};

export const loadScript = (callback) => {
  addCallback(callback);

  if (!isScriptInjected()) {
    const embedScript = document.createElement('script');
    embedScript.setAttribute('src', scriptUrl);
    embedScript.onload = () => {
      loaded = true;
      runCallbacks();
    };
    document.head.appendChild(embedScript);
  } else {
    runCallbacks();
  }
};
