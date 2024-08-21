import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";

function useFetchUsers() {
  const [user, setUser] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { userId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/getUser/${userId}`
        );
        setUser(response.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [userId]);

  return { user, loading, error };
}

export default useFetchUsers;
