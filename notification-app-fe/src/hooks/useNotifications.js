import { useEffect, useState } from "react";
import { getNotifications } from "../api/notifications";

export function useNotifications(page = 1, filter = "All") {
  const [notifications, setNotifications] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const fetchNotifications = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await getNotifications(
        page,
        10,
        filter
      );

      // If API returns an object
      if (response.notifications) {
        setNotifications(response.notifications);
        setTotalPages(response.totalPages || 1);
      }
      // If API returns an array
      else if (Array.isArray(response)) {
        setNotifications(response);
        setTotalPages(1);
      }
      // Fallback
      else {
        setNotifications([]);
        setTotalPages(1);
      }
    } catch (err) {
      setError(err.message || "Something went wrong");
      setNotifications([]);
      setTotalPages(1);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, [page, filter]);

  return {
    notifications,
    totalPages,
    loading,
    error,
    refresh: fetchNotifications,
  };
}