import axios from "axios";

const instance = axios.create({
  /* baseURL: "http://localhost:5000"*/
  baseURL: "https://amazon-react-app.herokuapp.com/",
});

export default instance;
