import { parseEvent } from './parseEvent';

// import { EventList } from './types';
export type EventList = ReturnType<typeof parseEvent>[];
