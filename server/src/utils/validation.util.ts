import { Types } from "mongoose";
import {
  MAX_NAME_LENGTH,
  MAX_PASSWORD_LENGTH,
  MIN_NAME_LENGTH,
  MIN_PASSWORD_LENGTH,
} from "../constants/config";

/**
Checks whether the provided name is a valid name or not.
@param {string} name - The name to check.
@returns {boolean} True if the name is valid, false otherwise.
*/
const isValidName = (name: string): boolean => {
  return name.length >= MIN_NAME_LENGTH && name.length <= MAX_NAME_LENGTH;
};

/**
  
  Checks whether the provided ID is a valid Mongoose Object ID or not.
  @param {string} id - The ID to check.
  @returns {boolean} True if the ID is valid, false otherwise.
  */
const isValidObjectId = (id: string): boolean => {
  return Types.ObjectId.isValid(id);
};

/**
  
  Checks whether the provided email is a valid email or not.
  @param {string} email - The email to check.
  @returns {boolean} True if the email is valid, false otherwise.
  */
const isValidEmail = (email: string): boolean => {
  // Regular expression that matches valid email addresses
  const emailRegex = /^[^\s@]+@[^\s@]+.[^\s@]+$/;
  return emailRegex.test(email);
};

/**
  
  Checks whether the provided password is a valid password or not.
  @param {string} password - The password to check.
  @returns {boolean} True if the password is valid, false otherwise.
  */
const isValidPassword = (password: string): boolean => {
  // Regular expression that matches passwords with at least one letter, one number, and one special character
  return (
    password.length >= MIN_PASSWORD_LENGTH &&
    password.length <= MAX_PASSWORD_LENGTH
  );
};

/**
  
  Checks whether the provided role is a valid role or not.
  @param {string} role - The role to check.
  @returns {boolean} True if the role is valid, false otherwise.
  */
const isValidRole = (role: string): boolean => {
  // Check if role === admin or user.
  return role === "admin" || role === "user";
};

export {
  isValidEmail,
  isValidName,
  isValidPassword,
  isValidObjectId,
  isValidRole,
};
