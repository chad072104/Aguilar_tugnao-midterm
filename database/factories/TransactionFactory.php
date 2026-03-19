<?php

namespace Database\Factories;

use App\Models\Transaction;
use Illuminate\Database\Eloquent\Factories\Factory;

class TransactionFactory extends Factory
{
    protected $model = Transaction::class;

    public function definition(): array
    {
        return [
            'transaction_id' => $this->faker->uuid,
            'feed_id' => 'F-' . $this->faker->numberBetween(1, 10),
            'feed_name' => $this->faker->randomElement(['Chicken Feed', 'Pig Feed', 'Fish Feed']),
            'feed_category' => $this->faker->randomElement(['Starter', 'Grower', 'Finisher']),
            'raw_material_name' => $this->faker->randomElement(['Corn', 'Soybean', 'Rice Bran']),
            'raw_material_stock' => $this->faker->numberBetween(100, 1000),
            'reorder_level' => 200,
            'batch_number' => 'B-' . $this->faker->numberBetween(1000, 9999),
            'production_date' => $this->faker->date(),
            'planned_production' => $this->faker->numberBetween(50, 200),
            'actual_production' => $this->faker->numberBetween(50, 200),
            'raw_material_used' => $this->faker->numberBetween(20, 100),
            'sales_date' => $this->faker->date(),
            'quantity_sold' => $this->faker->numberBetween(10, 150),
            'expenses' => $this->faker->randomFloat(2, 1000, 5000),
            'customer_id' => 'C-' . $this->faker->numberBetween(1, 50),
            'distribution_date' => $this->faker->date(),
            'forecasted_demand' => $this->faker->numberBetween(50, 200),
            'predicted_raw_materials' => $this->faker->numberBetween(50, 200),
        ];
    }
}