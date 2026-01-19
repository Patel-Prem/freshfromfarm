import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { resetPassword } from "../../api/authAPI";

export default function ResetPassword() {
    const { token } = useParams(); // token from URL
    const navigate = useNavigate();

    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match!");
            return;
        }

        try {
            setLoading(true);
            const data = { newPassword }
            const res = await resetPassword(token, data)
            navigate(res.data.redirectTo);
        } catch (err) {
            console.error(err);
            setError("Token is invalid or expired.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950 px-4">
            <div className="w-full max-w-md bg-white dark:bg-gray-700 p-8 rounded-2xl shadow-md">
                <h2 className="text-2xl font-semibold text-center text-gray-900 dark:text-gray-200 mb-6">
                    Set New Password
                </h2>

                <form onSubmit={handleSubmit} className="space-y-4">
                    <div>
                        <label
                            htmlFor="new-password"
                            className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300"
                        >
                            New Password
                        </label>
                        <input
                            type="password"
                            id="new-password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-green-600 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                            placeholder="Enter new password"
                        />
                    </div>

                    <div>
                        <label
                            htmlFor="confirm-password"
                            className="block mb-1 text-sm font-medium text-gray-800 dark:text-gray-300"
                        >
                            Confirm Password
                        </label>
                        <input
                            type="password"
                            id="confirm-password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            required
                            className="w-full px-4 py-3 rounded-md border border-gray-300 focus:outline-green-600 text-gray-800 dark:text-gray-100 dark:bg-gray-800"
                            placeholder="Confirm new password"
                        />
                    </div>

                    {error && (
                        <p className="text-red-600 text-center font-semibold bg-rose-200 rounded-md ">
                            {error}
                        </p>
                    )}

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-md font-medium focus:outline-none disabled:opacity-50"
                    >
                        {loading ? "Resetting..." : "Reset Password"}
                    </button>
                </form>

                <p className="text-center text-sm text-gray-600 dark:text-gray-300 mt-4">
                    Remembered your password?{" "}
                    <a href="/signin" className="text-green-600 hover:underline">
                        Sign In
                    </a>
                </p>
            </div>
        </div>
    );
}
