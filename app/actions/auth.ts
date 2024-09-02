"use server";

export const signUp = async (formData: {}): Promise<
  | {
      message: string;
      status: string;
    }
  | any
> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/signup`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      cache: "no-store",
      body: JSON.stringify(formData),
    });
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const signIn = async (formData: {}): Promise<any> => {
  const response = await fetch(`${process.env.ROOT_LINK}/api/signin`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    cache: "no-store",
    body: JSON.stringify(formData),
  });
  if (!response.ok) {
    throw Error("Invalid credentials");
  }
  const res = await response.json();
  return await res.user;
};
