export default function Contact() {
    return (
        <main className="w-full min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-50 px-6 py-16">
            <div className="max-w-xl w-full bg-white shadow-lg rounded-lg p-10 text-center">
                <h1 className="text-4xl font-bold text-emerald-700 mb-6">Contact Us</h1>
                <p className="text-gray-600 mb-8">
                    We'd love to hear from you. Reach out to us through any of the methods below:
                </p>

                <div className="space-y-6 text-gray-700 text-lg">
                    <div>
                        <h2 className="font-semibold text-emerald-600">Phone</h2>
                        <p>+94 11 220 1010</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-emerald-600">Fax</h2>
                        <p>+94 11 220 1011</p>
                    </div>

                    <div>
                        <h2 className="font-semibold text-emerald-600">Email</h2>
                        <p>cbcbat6@gmail.com</p>
                    </div>
                </div>
            </div>
        </main>
    );
}
