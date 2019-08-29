import { IRfbEventAttendance } from 'app/shared/model/rfb-event-attendance.model';

export interface IRfbUser {
  id?: number;
  username?: string;
  homeLocationId?: number;
  rfbEventAttendances?: IRfbEventAttendance[];
}

export class RfbUser implements IRfbUser {
  constructor(
    public id?: number,
    public username?: string,
    public homeLocationId?: number,
    public rfbEventAttendances?: IRfbEventAttendance[]
  ) {}
}
