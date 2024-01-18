interface ICreateUserDTO {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  language: string;
  image: string;
  active: boolean;
  score: number;
}

export default ICreateUserDTO;
