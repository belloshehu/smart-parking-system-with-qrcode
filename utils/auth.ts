import axios from "axios";
import { clearUser } from "@/app/GlobalRedux/features/auth/authSlice";

export const logout = async (dispatch: any, router: any) => {
  try {
    await axios.get("/api/logout");
    if (typeof window !== "undefined") {
      localStorage.removeItem("user");
    }
    dispatch(clearUser());
    router.push("/");
  } catch (error: any) {
    console.log(error);
  }
};
