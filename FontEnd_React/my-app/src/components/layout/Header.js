export default function Header() {
    return (
        <header className="bg-surface/90 backdrop-blur-md border-b border-outline-variant/20 shadow-sm fixed w-full top-0 z-50">
            <div className="flex justify-between items-center w-full px-4 md:px-10 h-24 max-w-[1440px] mx-auto">

                {/* Left Menu */}
                <div className="flex-1 hidden md:flex items-center gap-8">
                    <nav className="flex gap-6">
                        <a
                            className="text-primary border-b border-primary pb-1 text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Danh mục sản phẩm
                        </a>

                        <a
                            className="text-secondary hover:text-primary text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Tất cả sản phẩm
                        </a>

                        <a
                            className="text-secondary hover:text-primary text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Sản phẩm mới
                        </a>
                    </nav>
                </div>

                {/* Logo */}
                <div className="flex-none text-center">
                    <h1 className="text-4xl font-bold text-primary uppercase tracking-wider">
                        MAISON ÉLÉGANT
                    </h1>
                </div>

                {/* Right Menu */}
                <div className="flex-1 flex justify-end items-center gap-6">

                    <nav className="hidden md:flex gap-6 mr-8">
                        <a
                            className="text-secondary hover:text-primary text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Sản phẩm nổi bật
                        </a>

                        <a
                            className="text-secondary hover:text-primary text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Giới thiệu
                        </a>

                        <a
                            className="text-secondary hover:text-primary text-xs uppercase tracking-widest"
                            href="#"
                        >
                            Liên hệ
                        </a>
                    </nav>

                    <div className="flex items-center gap-4">
                        <span className="material-symbols-outlined text-primary cursor-pointer">
                            shopping_bag
                        </span>

                        <span className="material-symbols-outlined text-primary cursor-pointer">
                            person
                        </span>
                    </div>
                </div>
            </div>
        </header>
    );
}