export const onElementHeightChange = (elm, callback) => {
    let lastHeight = elm.scrollHeight;
    let newHeight;

    (function run() {
        newHeight = elm.scrollHeight;
        if (lastHeight !== newHeight) {
            callback();
        }

        lastHeight = newHeight;

        if (elm.onElementHeightChangeTimer) {
            clearTimeout(elm.onElementHeightChangeTimer);
        }

        elm.onElementHeightChangeTimer = setTimeout(run, 200);
    })();
};