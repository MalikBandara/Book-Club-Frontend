const DashboardHome = () => {
    return (
        <div className="space-y-6 p-6">
            {/* Welcome Section */}
            <div className="rounded-xl bg-white p-6 shadow-md">
                <h1 className="text-3xl font-bold text-gray-800">📚 Welcome, Admin!</h1>
                <p className="mt-2 text-gray-600">Here’s a quick overview of what's happening in your Book Club system today.</p>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                <div className="rounded-xl bg-indigo-500 p-4 text-white shadow-md">
                    <h2 className="text-lg">Total Readers</h2>
                    <p className="text-2xl font-bold">128</p>
                </div>
                <div className="rounded-xl bg-green-500 p-4 text-white shadow-md">
                    <h2 className="text-lg">Books Available</h2>
                    <p className="text-2xl font-bold">342</p>
                </div>
                <div className="rounded-xl bg-yellow-500 p-4 text-white shadow-md">
                    <h2 className="text-lg">Books Issued</h2>
                    <p className="text-2xl font-bold">78</p>
                </div>
                <div className="rounded-xl bg-red-500 p-4 text-white shadow-md">
                    <h2 className="text-lg">Overdue Returns</h2>
                    <p className="text-2xl font-bold">5</p>
                </div>
            </div>

            {/* Optional section */}
            <div className="rounded-xl bg-white p-6 shadow-md">
                <h3 className="mb-2 text-xl font-semibold">📆 Today's Summary</h3>
                <ul className="list-inside list-disc space-y-1 text-gray-700">
                    <li>3 new readers registered</li>
                    <li>15 books issued</li>
                    <li>2 readers returned books</li>
                    <li>1 overdue reminder sent</li>
                </ul>
            </div>
        </div>
    );
};

export default DashboardHome;
