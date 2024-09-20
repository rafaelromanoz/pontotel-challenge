import { Launch, Rocket } from '../types/Launch';

export const fetchLaunchesService = async (page: number, limit: number = 1): Promise<Launch[]> => {
  const response = await fetch(
    `https://api.spacexdata.com/v4/launches?offset=${(page - 1) * limit}&limit=${limit}`
  );
  const data: Launch[] = await response.json();
  return data;
};

export const fetchRocketDetails = async (rocketId: string): Promise<Rocket> => {
  const response = await fetch(`https://api.spacexdata.com/v4/rockets/${rocketId}`);
  const rocketData: Rocket = await response.json();
  return rocketData;
};
