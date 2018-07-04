window.useConfig = {
  tracker: {},
  prefixSource: '',
  suffixSource: '',
};
function use(location) {
  const useConfig = window.useConfig;
  const useTracker = window.useConfig.tracker;
  const url = useConfig.prefixSource || useConfig.suffixSource ? useConfig.prefixSource + location + useConfig.suffixSource : location;
  if (useTracker[url] !== 'loaded') {
    useTracker[url] = 'working';
    fetch(url).then((response) => {
      if (response.ok && response.status === 200) {
        return response.text();
      }
      throw 0;
    }).then((text) => {
      const script = document.createElement('script');
      script.innerHTML = text;
      document.head.appendChild(script);
      useTracker[url] = 'loaded';
    }).catch((error) => {
      useTracker[url] = 'error';
    });
  }
}
