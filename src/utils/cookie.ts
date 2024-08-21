import { Cookies } from "react-cookie";

const cookies = new Cookies();

export const getCookie = (name: string) => cookies.get(name);
