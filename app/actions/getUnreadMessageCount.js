'use server';

import dbConnect from '@/config/database';
import Message from '@/models/message';
import { getSessionUser } from '@/utils/getSessionUser';

async function getUndreadMessageCount() {
  await dbConnect();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.user) {
    return { error: 'User ID is required' };
  }

  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    read: false,
  });

  return { count };
}

export default getUndreadMessageCount;
