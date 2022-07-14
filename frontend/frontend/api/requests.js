const URL = `http://localhost:3000/api`;

export const apiGetVehicleTypes = (rows, page, query) => {
  let searchParams = new URLSearchParams({
    rows,
    page,
    query,
  });
  return new Promise((resolve, reject) => {
    fetch(`${URL}/vehicleTypes?${searchParams}`)
      .then((response) => resolve(response))
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiDeleteVehicleType = (vehicleTypeID) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/vehicleTypes/${vehicleTypeID}`, { method: "DELETE" })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export const apiCreateVehicleType = (payload) => {
  return new Promise((resolve, reject) => {
    fetch(`${URL}/vehicleTypes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    })
      .then((response) => {
        resolve(response);
      })
      .catch((error) => {
        reject(error);
      });
  });
};
