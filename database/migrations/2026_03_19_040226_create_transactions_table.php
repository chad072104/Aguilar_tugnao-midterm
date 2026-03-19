<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
  public function up(): void
{
    Schema::create('transactions', function (Blueprint $table) {
        $table->id();

        $table->string('transaction_id');
        $table->string('feed_id');
        $table->string('feed_name');
        $table->string('feed_category');

        $table->string('raw_material_name');
        $table->integer('raw_material_stock');
        $table->integer('reorder_level');

        $table->string('batch_number');
        $table->date('production_date');
        $table->integer('planned_production');
        $table->integer('actual_production');
        $table->integer('raw_material_used');

        $table->date('sales_date');
        $table->integer('quantity_sold');
        $table->decimal('expenses', 10, 2);

        $table->string('customer_id');
        $table->date('distribution_date');

        $table->integer('forecasted_demand');
        $table->integer('predicted_raw_materials');

        $table->timestamps();
    });
}
    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('transactions');
    }
};
