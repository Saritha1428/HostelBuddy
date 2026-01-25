// backend/middleware/authorize.js

/**
 * @param {string[]} allowedRoles - An array of roles permitted to access the route (e.g., ['warden', 'admin'])
 */
module.exports = (allowedRoles) => (req, res, next) => {
    // req.user is guaranteed to be set if this middleware follows 'auth'
    const userRole = req.user.role;

    // Check if the user's role is in the array of allowed roles
    if (allowedRoles.includes(userRole)) {
        // Role is authorized, proceed
        next();
    } else {
        // Role is not authorized
        return res.status(403).json({ 
            msg: 'Access denied. You do not have the required permissions.' 
        });
    }
};