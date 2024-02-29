export const medic = async (event: any) => {
  const mockMedic = [{ name: "Juan", lastname: "Perez" }];
  return {
    statusCode: 200,
    body: JSON.stringify(mockMedic),
  };
};
