"use server";

export const getMaintenances = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/maintenances/all/`
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getMaintenance = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/maintenances/single/?id=${id}`,
      {
        next: {
          revalidate: 0,
        },
      }
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getMaintenanceByUser = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/maintenances/byUser/?id=${id}`
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
