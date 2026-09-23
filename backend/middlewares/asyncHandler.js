/**
 * Async handler utility to wrap controller functions and avoid repetitive try/catch blocks.
 * Passes any uncaught errors directly to the centralized error-handling middleware.
 */
const asyncHandler = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};

module.exports = asyncHandler;
