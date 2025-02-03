import axios from "axios";

export const request = async () => {
  const response = await axios.get(
    "https://jsonplaceholder.typicode.com/users/1"
  );

  return response.data.name;
};
