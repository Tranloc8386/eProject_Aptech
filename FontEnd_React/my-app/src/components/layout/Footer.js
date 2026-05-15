export default function Footer() {
    return (
        <footer className="bg-surface-container mt-20 w-full">
            <div className="grid grid-cols-1 md:grid-cols-12 gap-6 px-4 md:px-10 py-16 max-w-[1440px] mx-auto">

                {/* Brand */}
                <div className="md:col-span-4">
                    <h3 className="text-3xl font-bold text-primary uppercase tracking-widest mb-6">
                        MAISON ÉLÉGANT
                    </h3>

                    <p className="text-on-surface-variant max-w-xs leading-relaxed">
                        Đưa nghệ thuật vào trang phục hàng ngày với tiêu chuẩn cao cấp nhất.
                    </p>
                </div>

                {/* Explore */}
                <div className="md:col-span-2">
                    <h4 className="text-primary font-semibold mb-6 uppercase text-xs tracking-widest">
                        Khám phá
                    </h4>

                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="hover:text-primary">
                                Journal
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-primary">
                                Sustainability
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-primary">
                                Care Guide
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Services */}
                <div className="md:col-span-2">
                    <h4 className="text-primary font-semibold mb-6 uppercase text-xs tracking-widest">
                        Dịch vụ
                    </h4>

                    <ul className="space-y-4">
                        <li>
                            <a href="#" className="hover:text-primary">
                                Boutiques
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-primary">
                                Support
                            </a>
                        </li>

                        <li>
                            <a href="#" className="hover:text-primary">
                                Shipping
                            </a>
                        </li>
                    </ul>
                </div>

                {/* Social */}
                <div className="md:col-span-4">
                    <h4 className="text-primary font-semibold mb-6 uppercase text-xs tracking-widest">
                        Kết nối
                    </h4>

                    <div className="flex gap-4 mb-8">
                        <span className="material-symbols-outlined cursor-pointer">
                            public
                        </span>

                        <span className="material-symbols-outlined cursor-pointer">
                            share
                        </span>

                        <span className="material-symbols-outlined cursor-pointer">
                            mail
                        </span>
                    </div>

                    <p className="text-sm text-on-surface-variant">
                        © 2024 MAISON ÉLÉGANT. All rights reserved.
                    </p>
                </div>
            </div>
        </footer>
    );
}