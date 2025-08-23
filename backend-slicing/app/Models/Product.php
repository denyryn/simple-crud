<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'description',
        'image_url',
        'price',
    ];

    protected static function boot(): void
    {
        parent::boot();

        static::saving(function (Product $product) {
            $product->name = \Str::title($product->name);
            $product->slug = \Str::slug($product->name);
        });
    }
}
