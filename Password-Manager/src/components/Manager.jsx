import { useEffect, useState } from "react";

function Manager({ user }) {
  const [form, setForm] = useState({
    website: "",
    username: "",
    password: "",
  });

  const [data, setData] = useState([]);
  const [visible, setVisible] = useState({});

  // FETCH PASSWORDS
  const fetchPasswords = async () => {
    const res = await fetch(
      "https://jxgdug5t2h.execute-api.us-east-1.amazonaws.com/dev/get-password?userId=" + user.username
    );
    const result = await res.json();
    setData(result);
  };

  useEffect(() => {
    if (user?.username) {
      fetchPasswords();
    }
  }, [user]);

  console.log(user);

  // SAVE PASSWORD
  const handleSubmit = async () => {
    console.log("Saving data:", { userId: user.username, ...form });

    const res = await fetch("https://jxgdug5t2h.execute-api.us-east-1.amazonaws.com/dev/save-password", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userId: user.username, ...form }),
    });

    const result = await res.json();
    console.log("Save response:", result);

    setForm({ website: "", username: "", password: "" });
    fetchPasswords();
  };

  const toggle = (id) => {
    setVisible({ ...visible, [id]: !visible[id] });
  };

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">

      {/* FORM */}
      <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow">
        <h2 className="text-lg font-bold mb-4">Add Password</h2>

        <input
          className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          placeholder="Website"
          value={form.website}
          onChange={(e) => setForm({ ...form, website: e.target.value })}
        />

        <input
          className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          placeholder="Username"
          value={form.username}
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />

        <input
          className="w-full p-2 mb-2 rounded bg-gray-100 dark:bg-gray-700"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />

        <button
          onClick={handleSubmit}
          className="w-full bg-blue-600 text-white py-2 rounded"
        >
          Save Password
        </button>
      </div>

      {/* LIST */}
      <div>
        <h2 className="text-lg font-bold mb-4">Saved Passwords</h2>

        {data.map((item) => (
          <div
            key={item.id}
            className="bg-white dark:bg-gray-800 p-4 mb-3 rounded-xl shadow hover:scale-[1.02] transition"
          >
            <p className="font-semibold">{item.website}</p>
            <p className="text-sm text-gray-500">{item.username}</p>

            <p>
              {visible[item.id] ? item.password : "********"}
            </p>

            <div className="flex gap-3 mt-2">
              <button
                onClick={() => toggle(item.id)}
                className="text-blue-500"
              >
                Show
              </button>

              <button
                onClick={() =>
                  navigator.clipboard.writeText(item.password)
                }
                className="text-green-500"
              >
                Copy
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Manager;