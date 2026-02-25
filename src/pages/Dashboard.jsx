import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function Dashboard() {

  const navigate = useNavigate();
  const token = localStorage.getItem("token");

  const [expenses, setExpenses] = useState([]);
  const [title, setTitle] = useState("");
  const [amount, setAmount] = useState("");
  const [category, setCategory] = useState("");
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {

    if (!token) {
      navigate("/");
      return;
    }

    fetchExpenses();

  }, []);

  const fetchExpenses = async () => {

    try {
      const res = await API.get("/expenses");
      setExpenses(res.data);
    } catch (error) {
      console.log(error);
    }

  };

  const handleSubmit = async () => {

  try {

    if (editingId) {
      await API.put(`/expenses/${editingId}`, {
        title,
        amount,
        category
      });
    } else {
      await API.post("/expenses", {
        title,
        amount,
        category
      });
    }

    setTitle("");
    setAmount("");
    setCategory("");
    setEditingId(null);

    fetchExpenses();

  } catch (error) {
    console.log(error);
  }

};

  const deleteExpense = async (id) => {

    try {

      await API.delete(`/expenses/${id}`);
      fetchExpenses();

    } catch (error) {
      console.log(error);
    }

  };

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div style={{ maxWidth: "600px", margin: "auto" }}>

      <h2>Expense Dashboard</h2>

      <button onClick={logout}>Logout</button>

      <h3>Add Expense</h3>

      <input
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <br />

      <input
        type="number"
        placeholder="Amount"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />

      <br />

      <input
        placeholder="Category"
        value={category}
        onChange={(e) => setCategory(e.target.value)}
      />

      <br />

      <button onClick={handleSubmit}>
  {editingId ? "Update" : "Add"}
</button>

      <hr />

      <h3>Your Expenses</h3>

      {expenses.length === 0 ? (
        <p>No expenses yet</p>
      ) : (
        expenses.map((expense) => (
          <div
            key={expense._id}
            style={{
              border: "1px solid gray",
              padding: "10px",
              marginBottom: "10px"
            }}
          >
            <h4>{expense.title}</h4>
            <p>Amount: {expense.amount}</p>
            <p>Category: {expense.category}</p>
            <button onClick={() => deleteExpense(expense._id)}>
              Delete
            </button>

            <button onClick={() => {
              setTitle(expense.title);
              setAmount(expense.amount);
              setCategory(expense.category);
              setEditingId(expense._id);
            }}>
              Edit
            </button>
          </div>
        ))
      )}

    </div>
  );
}

export default Dashboard;