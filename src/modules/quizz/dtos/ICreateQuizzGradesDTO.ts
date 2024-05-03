interface ICreateQuizzGradesDTO {
  userId: string;
  quizzId: string;
  record: number;
  seen: boolean;
}

export default ICreateQuizzGradesDTO;
