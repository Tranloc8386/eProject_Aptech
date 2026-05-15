export default function Banner() {
    return (
        <section className="relative min-h-screen flex items-center overflow-hidden">

            {/* Background Image */}
            <div className="absolute inset-0">
                <img
                    className="w-full h-full object-cover"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBkFWyRAp83IaakBoCA7bmvMCy7znL6F1arwNQPZ9PixknucuRZFAsxKDGD5a20MxGbQeZKoxJd2J3Q-CKnoirwmPMRoSYfeKyTBPPz9ni1uf8WzxmJtVLMT_VNiXgiVyxNjC0v-ULrppWeDSya7_7E1cdgaKO1E8HD3lBHJwUoS2NR9RtaKhuyMYii6KXRgCuEbQRbshywoRjC45ZuOfA-Bu8LOS_HoN_fBSOm3J1R2XyxongJ3X6mxkGMM-oBEXLAMAj7Ul3emzE"
                    alt=""
                />

                {/* Overlay */}
                <div className="absolute inset-0 bg-black/20"></div>
            </div>

            {/* Content */}
            <div className="relative z-10 max-w-[1440px] mx-auto px-4 md:px-10">
                <div className="max-w-xl">

                    <span className="uppercase tracking-[0.2em] text-pink-300 text-xs">
                        Bộ sưu tập Thu 2024
                    </span>

                    <h2 className="text-6xl font-bold text-white mt-4 mb-6">
                        Autumn Silk Series
                    </h2>

                    <p className="text-lg text-gray-200 mb-8">
                        Khám phá sự mềm mại tuyệt đối của lụa cao cấp,
                        được dệt may thủ công trong những gam màu lãng mạn nhất.
                    </p>

                    <div className="flex gap-4">
                        <button className="bg-pink-600 hover:bg-pink-700 text-white px-8 py-4 uppercase text-xs tracking-widest">
                            Khám phá ngay
                        </button>

                        <button className="border border-white text-white px-8 py-4 uppercase text-xs tracking-widest hover:bg-white hover:text-black transition">
                            Xem Lookbook
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
}