"use server";

type statsType = {
  stats: {
    claims: string;
    subscriptions: string;
    payments: string;
  };
};

// Admin Actions

export const getUsers = async (): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/users/all/`, {
      next: {
        revalidate: 0,
      },
    });
    if (!response) {
      return "Couldnt find users";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getUsersByType = async (userType: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/users/userByType/?user=${userType}`
    );
    if (!response) {
      return "Couldnt find users";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const deleteUser = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/users/delete/?user=${id}`,
      {
        method: "DELETE",
      }
    );
    if (!response) {
      return "Couldnt delete the user";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
