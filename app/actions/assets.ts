"use server";

export const getAssets = async (): Promise<any> => {
  try {
    const response = await fetch(`${process.env.ROOT_LINK}/api/assets/all/`);
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
export const getAsset = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/assets/single/?id=${id}`,
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

export const getAssetByUser = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/assets/byUser/?id=${id}`
    );
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
