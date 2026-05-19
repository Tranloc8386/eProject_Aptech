<?php

namespace Database\Factories;

use App\Models\Admin;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Admin>
 */
class AdminFactory extends Factory
{
    protected $model = Admin::class;

    public function definition(): array
    {
        return [
            'name'          => $this->faker->name(),
            'email'         => $this->faker->unique()->safeEmail(),
            'password'      => bcrypt('password123'),
            'role'          => 'admin',
            'auth_provider' => 'local',
            'is_verified'   => $this->faker->boolean(80),
        ];
    }
}
