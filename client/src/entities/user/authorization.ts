export const authorization = async (data: {
  login: string;
  password: string;
}) => {
  const response = await fetch('');
  console.log(data, response);
};
