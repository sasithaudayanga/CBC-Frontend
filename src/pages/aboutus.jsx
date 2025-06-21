export default function AboutUspage() {
    return (
        <div className="w-full h-full">
            <section className=" bg-gradient-to-br from-emerald-100 via-white to-emerald-50 px-6 py-7 text-center">
                <h2 className="text-4xl font-extrabold text-emerald-600 mb-10 tracking-tight">
                    Who We Are
                </h2>

                <div className="max-w-4xl mx-auto text-gray-700 space-y-5">
                    <p className="text-lg leading-relaxed">
                        At <span className="font-semibold text-emerald-700">Crystal Beauty Clear</span>, we are passionate about delivering
                        high-quality, reliable, and affordable products to our customers.
                        Founded with a vision to make online shopping easy and trustworthy, we curate the best items
                        to meet everyday needs and inspire modern lifestyles.
                    </p>

                    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 border-l-4 border-emerald-500 transition duration-300 hover:shadow-lg">
                        <h3 className="text-2xl font-semibold text-emerald-600 mb-2">Our Vision</h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                            To become a leading e-commerce destination where people can discover quality products,
                            experience exceptional service, and feel confident in every purchase.
                        </p>
                    </div>

                    <div className="bg-white shadow-md rounded-lg p-6 md:p-8 border-l-4 border-emerald-500 transition duration-300 hover:shadow-lg">
                        <h3 className="text-2xl font-semibold text-emerald-600 mb-2">Our Mission</h3>
                        <p className="text-base text-gray-600 leading-relaxed">
                            Our mission is to simplify the shopping experience by offering a handpicked collection of products,
                            backed by transparency, fast delivery, and a strong commitment to customer satisfaction.
                        </p>
                    </div>
                </div>
            </section>
        </div>
    );
}
