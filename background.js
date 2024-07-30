chrome.runtime.onMessage.addListener((data) => {
	const { event, prefs } = data;
	switch (event) {
		case "onStop":
			handleOnStop();
			break;
		case "onStart":
			handleOnStart(prefs);
			break;
		default:
			break;
	}
});

function handleOnStop() {
    console.log("Extension stopped");
}

function handleOnStart(prefs) {
    console.log("Extension started with preferences:", prefs);
}