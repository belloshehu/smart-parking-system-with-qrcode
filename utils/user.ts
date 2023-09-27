import User from "@/app/api/models/user";

export const getUser = async (email: string) => {
  const user = await User.find({ email });
  return user;
};
