let reformatTime = (total) => {
    let ms = total % 1000;
    total = (total - ms) / 1000;
    let s = total % 60;
    total = (total-s) / 60;
    let m = total % 60;
    return `${m}m : ${s}s : ${ms}ms`
}

let goodbye = (index) => {
    let arr = [`Goodbye`, `Shutting down`, `This worker has been terminated.`, `Mr. Stark, I don't feel so good...`]
    return `worker #${index}: ${arr[index]}`;
}

module.exports.reformatTime = reformatTime;
module.exports.goodbye = goodbye;
