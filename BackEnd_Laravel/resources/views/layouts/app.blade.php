<!DOCTYPE html>
<html lang="vi">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>@yield('title', 'Laravel App')</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0/css/all.min.css">
</head>
<body class="bg-gray-50 text-gray-800">

    <nav class="bg-white shadow-sm mb-8">
        <div class="container mx-auto px-6 py-4 flex justify-between items-center">
            <a href="/" class="text-xl font-bold text-indigo-600">My Project</a>
            <div class="space-x-6 text-gray-600">
                <a href="{{ route('users.index') }}" class="hover:text-indigo-600">Người dùng</a>
                <a href="#" class="hover:text-indigo-600">Sản phẩm</a>
            </div>
        </div>
    </nav>

    <main class="container mx-auto px-6">
        @yield('content')
    </main>

    <footer class="mt-12 py-6 border-t border-gray-200 text-center text-gray-500 text-sm">
        &copy; 2026 Developed for Maverick Dresses
    </footer>

</body>
</html>
