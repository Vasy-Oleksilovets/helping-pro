class NumberUtil {
    /**
     * Method used to validate float value
     *
     */
    static validFloat(value) {
        if (
            typeof value === 'undefined' ||
            value === null ||
            value === '' ||
            isNaN(value)
        ) {
            return false;
        }
        return true;
    }
    /**
     * Method used to parse US number ex "23,234,234.234" parsed as 23234234.234
     *
     */
    static parseCommaFloat(value) {
        if (typeof value === 'number') {
            return value;
        }
        return parseFloat(value.replace(/,/g, ''));
    }
    /**
     * Method used to parse US number ex "23,234,234" parsed as 23234234
     *
     */
    static parseCommaInt(value) {
        if (typeof value === 'number') {
            return value;
        }
        return parseInt(value.replace(/,/g, ''));
    }
    /**
     * Method used to format number as currency
     *
     */
    static currencyFormatter(value) {
        const formatter = new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'USD',
            minimumFractionDigits: 2,
        });

        return formatter.format(value);
    }
    /**
     * Method used to fix floating point
     *
     */
    static fixPoint(value) {
        return parseFloat(value).toFixed(2);
    }
    /**
     * Method used to format number
     *
     */
    static numberFormat(value) {
        const formatter = new Intl.NumberFormat('en-US');
        return formatter.format(value);
    }
}

export default NumberUtil;
