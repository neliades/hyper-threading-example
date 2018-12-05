let reformatTime = (total) => {
    let ms = total % 1000;
    total = (total - ms) / 1000;
    let s = total % 60;
    total = (total-s) / 60;
    let m = total % 60;
    return `${m}m : ${s}s : ${ms}ms`
}

module.exports.reformatTime = reformatTime;
