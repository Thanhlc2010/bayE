export const bigIntMiddleware = (req, res, next) => {
    const originalJson = res.json;
    res.json = (data) => {
        const dataStringified = JSON.parse(
            JSON.stringify(data, (_, value) => (typeof value === 'bigint' ? value.toString() : value))
        );
        return originalJson.call(res, dataStringified);
    };
    next();
};