import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
export default function ProfilePage() {
  const { email, token } = useAuth();

 
  const [todoStats, setTodoStats] = useState({
    total: 0,
    completed: 0,
    active: 0,
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    async function fetchTodoStats() {
      if (!token) return;

      try {
        
        setLoading(true);
        setError("");

       
        const response = await fetch("/api/tasks", {
          method: "GET",
          headers: {
            "X-CSRF-TOKEN": token,
          },
          credentials: "include",
        });

        
        if (response.status === 401) {
          throw new Error("Unauthorized");
        }

        if (!response.ok) {
          throw new Error("Failed to fetch todos");
        }

       
        const data = await response.json();

      
        const todos = data.tasks || data;

        
        const total = todos.length;

        const completed = todos.filter(
          (todo) => todo.isCompleted
        ).length;

        const active = total - completed;

        setTodoStats({
          total,
          completed,
          active,
        });
      } catch (err) {
        
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchTodoStats();
  }, [token]);

  return (
    <div>
      
      <h1>User: {name}</h1>

      <p>
        Status: {token ? "Authenticated" : "Not Authenticated"}
      </p>

      {loading && <p>Loading stats...</p>}

      {error && <p style={{ color: "red" }}>{error}</p>}

      {!loading && !error && (
        <>
          <h3>Todo Stats</h3>

          <p>Total Todos: {todoStats.total}</p>
          <p>Completed: {todoStats.completed}</p>
          <p>Active: {todoStats.active}</p>

         
          {todoStats.total > 0 && (
            <p>
              Completion:{" "}
              {Math.round(
                (todoStats.completed / todoStats.total) * 100
              )}
              %
            </p>
          )}
        </>
      )}
    </div>
  );
}