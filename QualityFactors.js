function parseQualityFactors(header) {
    const defaultQualityFactor = 1.0;
    const qualityFactors = {};

    if (header) {
        header.split(',').forEach((type) => {
            const [mediaType, qValue] = type.split(';').map(s => s.trim());
            const qFactor = qValue ? parseFloat(qValue.split('=')[1]) : defaultQualityFactor;
            qualityFactors[mediaType] = qFactor;
        });
    }
    // Set default quality factors if not present
    if (!qualityFactors['application/json']) qualityFactors['application/json'] = defaultQualityFactor;
    if (!qualityFactors['text/html']) qualityFactors['text/html'] = defaultQualityFactor;

    return qualityFactors;
}

module.exports = {parseQualityFactors}