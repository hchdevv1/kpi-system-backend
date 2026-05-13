export class UserResponseDto {
  id!: number;
  usercode!: string;
  description!: string;
  usersystem_role_id!: number;
  roleDescription?: string;
  is_active?: boolean;
}

export class ListUsesrSystemResponseDto {
  items!: UserResponseDto[];
}