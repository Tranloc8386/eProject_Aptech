<h2>My Profile</h2>

@if(session('success'))
    <p style="color:green">{{ session('success') }}</p>
@endif

{{-- AVATAR --}}
<div>
    @if($user->avatar)
        <img src="{{ asset('users/'.$user->avatar) }}"
             width="120"
             height="120"
             style="border-radius:50%">
    @else
        <img src="https://via.placeholder.com/120">
    @endif
</div>

<hr>

{{-- UPLOAD --}}
<form action="{{ route('profile.avatar') }}"
      method="POST"
      enctype="multipart/form-data">

    @csrf

    <input type="file" name="avatar" required>

    <button type="submit">Upload Avatar</button>
</form>

<hr>

{{-- INFO --}}
<p><b>Name:</b> {{ $user->name }}</p>
<p><b>Email:</b> {{ $user->email }}</p>
<p><b>Role:</b> {{ $user->role }}</p>
