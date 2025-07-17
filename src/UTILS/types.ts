export type Auth = {
  firstName?: string;
  lastName?: string;
  email: string;
  password: string;
  gdprAccepted?: boolean;
};

export enum Role {
  ADMIN = 'Admin',
  USER = 'User',
}
export type User = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  isVerified: boolean;
  isBlocked: boolean;
  gdprAcceptedAt: string;
  role: Role;
  createdAt: string;
};

export enum Type {
  LOST = 'Lost',
  FOUND = 'Found',
}

export enum Status {
  PENDING = 'Pending',
  RETRIEVED = 'Retrieved',
  NO_RESPONSE = 'No response',
}

export type Listing = {
  title: string;
  description: string;
  photo: string;
  localization: string;
  eventDate: string;
  isArchived: boolean;
  type: Type;
  status: Status;
  user: User;
};
