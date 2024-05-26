class Log {
    constructor() {};

    static console(tag, value) {
        console.log(`[${tag}] ${value}`)
    }
};

module.exports = Log;