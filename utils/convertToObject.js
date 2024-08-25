import mongoose from 'mongoose';

const { ObjectId } = mongoose.Types;

/**
 * Converts a Mongoose document to a plain JavaScript object that is
 * serializable, ensuring that ObjectId instances are converted to strings.
 *
 * @param {Object} doc - The Mongoose document to convert.
 * @returns {Object|null} - The converted plain JavaScript object, or null if the input was null/undefined.
 */
export const convertToSerializableObject = (doc) => {
  if (!doc) return null;

  return JSON.parse(
    JSON.stringify(doc, (key, value) =>
      value instanceof ObjectId ? value.toString() : value
    )
  );
};
