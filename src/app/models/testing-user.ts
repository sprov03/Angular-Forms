export class TestingUser {
  firstName: string;
  userType: UserType;
  aliases: string[];
  cats: Cat[];
}

export class Cat {
  name: string;
  color: string;
}

export enum UserType {
  Tester,
  Admin,
}
