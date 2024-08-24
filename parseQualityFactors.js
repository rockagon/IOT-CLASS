function parseQualityFactors(acceptHeader) {
    return acceptHeader.split(',')
        .map(entry => {
            const [type, qValue] = entry.split(';q=');
            return { type: type.trim(), q: qValue ? parseFloat(qValue) : 1.0 };
        })
        .reduce((acc, { type, q }) => {
            acc[type] = q;
            return acc;
        }, {});
}

module.exports = parseQualityFactors;
