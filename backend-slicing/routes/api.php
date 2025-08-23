<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\ProductController;
use App\Http\Controllers\AuthController;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

Route::prefix('auth')->group(function () {
    Route::post('/check', [AuthController::class, 'check'])
        ->name('check');

    Route::post('/login', [AuthController::class, 'login'])
        ->name('login');

    Route::post('/register', [AuthController::class, 'register'])
        ->name('register');

    Route::get('/user', [AuthController::class, 'getUser'])
        ->name('user');
});

Route::middleware('auth.cookie')->prefix('auth')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout'])
        ->name('logout');
});

Route::middleware('auth.cookie')->group(function () {
    Route::resource('products', ProductController::class)
        ->except(['create', 'edit']);
});