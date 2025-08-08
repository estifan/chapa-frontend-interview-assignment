'use client';

export default function SuperAdminDashboard() {
  return (
    <div className="p-6">
        <h1 className="text-2xl font-bold mb-6">Super Admin Dashboard</h1>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Total Active Users</h3>
            <p className="text-3xl font-bold text-primary">5,678</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Total payments</h3>
            <p className="text-3xl font-bold text-purple-600">ETB 126,554,345</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Active Transactions</h3>
            <p className="text-3xl font-bold text-green-600">1,234</p>
          </div>
          <div className="bg-white p-6 rounded-xl shadow">
            <h3 className="text-lg font-semibold mb-2">Total Revenue</h3>
            <p className="text-3xl font-bold text-blue-600">ETB 5,678,901</p>
          </div>
        </div>
      </div>
  );
}
