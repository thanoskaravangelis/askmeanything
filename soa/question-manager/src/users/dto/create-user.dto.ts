export class CreateUserDto {
  username: string;
  password: string;
  first_name: string;
  last_name: string;
  email: string;
  date_of_birth: Date;
  link1: string;
  link2: string;
  short_descr: string;
  prof_image: Blob;
  country: string;
}
