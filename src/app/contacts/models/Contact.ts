import {User} from '../../auth/models/User';

export class Contact{
  userId: number;
  contactId: number;
  contactName: string;
  contactEmail: string;

  constructor(contactName: string, contactEmail: string, contactId: number = null, userId: number) {
    this.contactName = contactName;
    this.contactEmail = contactEmail;
    this.contactId = contactId;
    this.userId = userId;
  }
}
