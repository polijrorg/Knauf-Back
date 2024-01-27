interface ICreateUserDTO {
  email: string;
  password: string;
  language: string;
  name: string;
  image: string;
  active: boolean;
  score: number;
}

export default ICreateUserDTO;
