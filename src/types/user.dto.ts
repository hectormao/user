export class CreateUserDto {
  name: string;
  email: string;
  roles: string[];
}

export class UpdateUserDto {
  name: string;
  roles: string[];
}
