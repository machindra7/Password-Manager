function Navbar({ toggleDark, signOut, user }) {
  return (
    <div className="flex justify-between items-center p-4 shadow bg-white dark:bg-gray-800">
      <h1 className="text-xl font-bold">🔐 VaultX</h1>

      <div className="flex gap-3 items-center">
        <span className="text-sm">{user.username}</span>

        <button
          onClick={toggleDark}
          className="px-3 py-1 rounded bg-gray-200 dark:bg-gray-700"
        >
          🌙
        </button>

        <button
          onClick={signOut}
          className="px-3 py-1 bg-red-500 text-white rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
}

export default Navbar;