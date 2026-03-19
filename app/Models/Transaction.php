<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Transaction extends Model
{
    use HasFactory; // ✅ This is required for ::factory()

    protected $fillable = [
        'transaction_id',
        'feed_id',
        'feed_name',
        'feed_category',
        'raw_material_name',
        'raw_material_stock',
        'reorder_level',
        'batch_number',
        'production_date',
        'planned_production',
        'actual_production',
        'raw_material_used',
        'sales_date',
        'quantity_sold',
        'expenses',
        'customer_id',
        'distribution_date',
        'forecasted_demand',
        'predicted_raw_materials',
    ];
}