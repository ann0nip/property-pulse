'use server';

import dbConnect from '@/config/database';
import User from '@/models/user';
import { getSessionUser } from '@/utils/getSessionUser';

async function checkBookmarkStatus(propertyId) {
  await dbConnect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  // Find user in database
  const user = await User.findById(userId);

  // Check if property is bookmarked
  let isBookmarked = user.bookmarks.includes(propertyId);

  return { isBookmarked };
}

export default checkBookmarkStatus;
