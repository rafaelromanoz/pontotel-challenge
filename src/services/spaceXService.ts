import { Launch, Rocket } from '../types/Launch';

export const fetchLaunchesService = async (page: number, limit: number = 10): Promise<Launch[]> => {
  const offset = (page - 1) * limit;
  const response = await fetch(`https://api.spacexdata.com/v4/launches/query`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      options: {
        limit,
        offset,
      },
    }),
  });

  const data = await response.json();
  return data.docs;
};

export const fetchRocketDetails = async (rocketId: string): Promise<Rocket> => {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
  const rocketData: Rocket = await response.json();
  return rocketData;
};
