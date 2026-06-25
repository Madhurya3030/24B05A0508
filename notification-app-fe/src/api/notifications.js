import axios from "axios";

const TOKEN = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsImV4cCI6MTc4MjM4Mzc4MiwiaWF0IjoxNzgyMzgyODgyLCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNjJkNGQzMTQtMWU4ZS00MzJiLTkzOWItYjFkYjM1Njk3MzczIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoiZ3VudXB1ZGkgZHVyZ2EgbWFkaHVyeWEiLCJzdWIiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODcifSwiZW1haWwiOiJtYWRodXJ5YWd1bnVwdWRpQGdtYWlsLmNvbSIsIm5hbWUiOiJndW51cHVkaSBkdXJnYSBtYWRodXJ5YSIsInJvbGxObyI6IjI0YjA1YTA1MDgiLCJhY2Nlc3NDb2RlIjoiYWhYanZwIiwiY2xpZW50SUQiOiJjYTkzMjM1Ni01NmNkLTQwNDktYTk5NC1lZWZmNzJiYWFhODciLCJjbGllbnRTZWNyZXQiOiJHU1J2ZHNZR2NaR2N1aGJqIn0.jr5Ct2fCn0tKW0myRNCDa-Fw76zaO7BNbffkMGFNDK8"; // Replace with your actual token

const API = axios.create({
  baseURL: "http://4.224.186.213/evaluation-service",
  headers: {
    Authorization: `Bearer ${TOKEN}`,
    "Content-Type": "application/json",
  },
});

export const getNotifications = async (
  page = 1,
  limit = 10,
  notificationType = "All"
) => {
  try {
    let url = `/notifications?page=${page}&limit=${limit}`;

    if (
      notificationType &&
      notificationType !== "All"
    ) {
      url += `&notification_type=${notificationType}`;
    }

    const response = await API.get(url);

    return response.data;
  } catch (error) {
    console.error(error);

    return {
      notifications: [],
      totalPages: 1,
    };
  }
};