const loadScript = (id: string, url: string) => {
    let loadedScript = document.getElementById(id);

    if (!loadedScript) {
        let script = document.createElement('script');
        script.type = 'text/javascript';
        script.src = url;
        script.id = id;
        loadedScript = document.body.appendChild(script);
    }
};

export default loadScript;
