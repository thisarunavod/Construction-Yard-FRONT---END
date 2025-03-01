export function HomePage() {
    return (
        <div className="bg-slate-100 min-h-screen">
            {/* Hero Section */}
            <div className="bg-blue-400 text-white py-20">
                <div className="container mx-auto text-center">
                    <h1 className="text-5xl font-bold mb-4">Welcome to YARD System</h1>
                    <p className="text-xl mb-8">
                        Manage your projects, materials, and suppliers efficiently with our powerful tools.
                    </p>
                    <button
                        className="bg-white text-blue-600 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-all duration-300"
                    >
                        Get Started
                    </button>
                </div>
            </div>

            {/* Features Section */}
            <div className="container mx-auto py-16">
                <h2 className="text-3xl font-bold text-center mb-12">Key Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {/* Feature 1 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">Project Management</h3>
                        <p className="text-gray-600">
                            Easily manage all your projects, track progress, and assign tasks.
                        </p>
                    </div>

                    {/* Feature 2 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">Material Tracking</h3>
                        <p className="text-gray-600">
                            Keep track of materials received and sent, ensuring smooth operations.
                        </p>
                    </div>

                    {/* Feature 3 */}
                    <div className="bg-white p-8 rounded-lg shadow-lg text-center">
                        <h3 className="text-2xl font-bold mb-4">Supplier Management</h3>
                        <p className="text-gray-600">
                            Manage supplier details and maintain strong relationships.
                        </p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="bg-blue-600 text-white py-8">
                <div className="container mx-auto text-center">
                    <p className="mb-4">© 2023 thisaru construction. All rights reserved.</p>
                    <div className="flex justify-center space-x-6">
                        <a href="#" className="hover:text-blue-200">Privacy Policy</a>
                        <a href="#" className="hover:text-blue-200">Terms of Service</a>
                        <a href="#" className="hover:text-blue-200">Contact Us</a>
                    </div>
                </div>
            </footer>
        </div>
    );
}