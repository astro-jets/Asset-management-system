"use server";

// Admin Actions
export const getAdminStats = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/adminStats/`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getExpiryReports = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/expiry`
    );
    if (!response) {
      return "Couldnt find reports";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getReports = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/assets`
    );
    if (!response) {
      return "Couldnt find reports";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getMaintenaceReports = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/charts/maintenances`
    );
    if (!response) {
      return "Couldnt find reports";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getCustomerStats = async (id: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/customerStats/?id=${id}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const searchService = async (query: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/services/search/?query=${query}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const getNotifications = async (user: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/notifications/?user=${user}`
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const generateNotifications = async (): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/admin/notifications/`
    );
    if (!response) {
      return "Couldnt find notifications";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};

export const readNotifications = async (user: string): Promise<any> => {
  try {
    const response = await fetch(
      `${process.env.ROOT_LINK}/api/actions/readNotification/?notification=${user}`,
      {
        method: "PATCH",
        next: { revalidate: 0 },
      }
    );
    if (!response) {
      return "Couldnt find stats";
    }
    const res = await response.json();
    return res;
  } catch (e) {
    console.error(e);
  }
};
