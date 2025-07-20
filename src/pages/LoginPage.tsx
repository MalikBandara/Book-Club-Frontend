const LoginPage = () => {


    

    return (
        <div className="flex min-h-screen items-center justify-center bg-gray-100">
            <form className="w-full max-w-sm rounded bg-white p-8 shadow-md">
                <h2 className="mb-6 text-center text-2xl font-bold">Login</h2>

                <label
                    htmlFor="email"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Email
                </label>
                <input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    className="mb-4 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <label
                    htmlFor="password"
                    className="mb-2 block font-medium text-gray-700"
                >
                    Password
                </label>
                <input
                    id="password"
                    type="password"
                    placeholder="Enter your password"
                    className="mb-6 w-full rounded border border-gray-300 px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none"
                />

                <button
                    type="submit"
                    className="w-full rounded bg-blue-600 py-2 text-white transition hover:bg-blue-700"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default LoginPage;
