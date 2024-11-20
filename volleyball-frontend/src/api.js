const API_URL = "http://127.0.0.1:8000/api/";

export const fetchUpcomingGames = async () => {
  try {
    const response = await fetch(`${API_URL}scheduling/games/upcoming/`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`, // Adjust based on authentication
      },
    });
    return await response.json();
  } catch (error) {
    console.error("Error fetching upcoming games:", error);
    throw error;
  }
};
