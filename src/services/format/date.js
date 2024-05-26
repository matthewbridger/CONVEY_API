class FormatDate {
    constructor() {};

    static get(fieldName) {
        return function () {
            const rawValue = this.getDataValue(fieldName);

            const dateObject = new Date(rawValue);

            return rawValue ? dateObject.toISOString().slice(0, 23).replace('T', ' ') : null;
        }
    };

    static set(fieldName) {
        return function (value) {
            const isoDate = value;

            this.setDataValue(fieldName, isoDate ? new Date(isoDate) : null)
        }
    };
};

module.exports = FormatDate;