import { parseEvent } from "../src/utils/parseEvent";

export type EventList = ReturnType<typeof parseEvent>[];

type BuildRet = [userEvents: EventList[]];
