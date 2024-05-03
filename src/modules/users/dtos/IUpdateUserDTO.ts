interface IUpdateUserDTO {
  password?: string;
  name?: string;
  image?: string;
  active?: boolean;
  score?: number;
}

export default IUpdateUserDTO;
