const API_BASE_URL = 'https://your-api.com';

export const fetchEquipments = async () => {
  const response = await fetch(`${API_BASE_URL}/equipments`);
  return response.json();
};

export const createEquipment = async (data: any) => {
  const response = await fetch(`${API_BASE_URL}/equipments`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(data),
  });
  return response.json();
};
