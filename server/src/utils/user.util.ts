import { Permission } from "../types/user.type";

/**
 * Generate permissions based on the user role
 * @param {string} role - The role of the user
 * @returns {array} - The permissions array for the user role
 */
const generateUserPermissions = (role: string): Permission[] => {
  if (role === "admin") {
    return [
      Permission.READ,
      Permission.CREATE,
      Permission.DELETE_ALL,
      Permission.UPDATE_ALL,
    ];
  } else {
    return [
      Permission.READ,
      Permission.CREATE,
      Permission.DELETE_OWN,
      Permission.UPDATE_OWN,
    ];
  }
};

export { generateUserPermissions };
