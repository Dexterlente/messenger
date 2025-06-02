import React from 'react';
import { Text } from 'react-native';
import { 
  format, isToday, isYesterday, isThisWeek, parseISO, isSameYear 
} from 'date-fns';

type Props = {
  isoDate: string;
};

const MessageTime: React.FC<Props> = ({ isoDate }) => {
  const date = parseISO(isoDate);
  const now = new Date();

  let displayTime = '';
  if (isToday(date)) {
    displayTime = format(date, 'p'); // 2:46 PM
  } else if (isYesterday(date)) {
    displayTime = 'Yesterday';
  } else if (isThisWeek(date)) {
    displayTime = format(date, 'EEEE'); // Monday, Tuesday, etc.
  } else {
    displayTime = isSameYear(date, now)
      ? format(date, 'MMM dd')        // May 18
      : format(date, 'MMM dd, yyyy'); // May 18, 2024
  }

  return <Text>{displayTime}</Text>;
};

export default MessageTime;
