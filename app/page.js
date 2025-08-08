export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Chapa Payment Integration Dashboard</h1>
          <p className="text-xl text-gray-600">
            A Next.js-based dashboard application that integrates with Chapa Payment API to handle payment transactions with role-based access control.
          </p>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-gray-900">Features</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-0">
            <ul className="divide-y divide-gray-200">
              {[
                'User authentication with role-based access (User, Admin, Super Admin)',
                'Secure payment initialization using Chapa API',
                'Transaction history tracking',
                'Responsive design with mobile support',
                'Role-specific dashboards'
              ].map((feature, index) => (
                <li key={index} className="py-4 sm:py-5">
                  <div className="flex items-center">
                    <div className="min-w-0 flex-1 flex items-center">
                      <div className="text-sm font-medium text-gray-900">
                        {feature}
                      </div>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-gray-900">Chapa API Integration</h2>
          </div>
          <div className="border-t border-gray-200 px-4 py-5 sm:p-6">
            <h3 className="text-lg font-medium text-gray-900 mb-4">Endpoints Used</h3>
            <div className="bg-gray-50 p-4 rounded-md mb-4">
              <p className="font-mono text-sm">
                <span className="font-bold">Initialize Payment</span>
                <br />
                <span className="text-primary">POST</span> https://api.chapa.co/v1/transaction/initialize
              </p>
            </div>
          </div>
        </div>

        <div className="bg-white shadow overflow-hidden sm:rounded-lg mb-12">
          <div className="px-4 py-5 sm:px-6">
            <h2 className="text-2xl font-semibold text-gray-900">Test Accounts</h2>
          </div>
          <div className="border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 p-6">
              {[
                { role: 'Regular User', email: 'user@chapa.com', password: 'password' },
                { role: 'Admin', email: 'admin@chapa.com', password: 'password' },
                { role: 'Super Admin', email: 'superadmin@chapa.com', password: 'password' }
              ].map((account, index) => (
                <div key={index} className="border rounded-lg p-4">
                  <h3 className="font-medium text-lg mb-2">{account.role}</h3>
                  <p className="text-sm text-gray-600">Email: {account.email}</p>
                  <p className="text-sm text-gray-600">Password: {account.password}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="text-center">
          <a
            href="/login"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-primary hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Get Started
          </a>
        </div>
      </div>
    </div>
  );
}