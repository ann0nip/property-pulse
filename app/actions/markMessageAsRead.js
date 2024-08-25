'use server';

import dbConnect from '@/config/database';
import Message from '@/models/message';
import { getSessionUser } from '@/utils/getSessionUser';

async function markMessageAsRead(messageId) {
  await dbConnect();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.user) {
    throw new Error('User ID is required');
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);

  if (!message) throw new Error('Message not found');

  // Verify ownership
  if (message.recipient.toString() !== userId) {
    throw new Error('Unauthorized');
  }

  // Update message to read/unread depending on the current status
  message.read = !message.read;

  // revalidate cache
  revalidatePath('/messages', 'page');
  await message.save();
  return message.read;
}

export default markMessageAsRead;
