<?php

namespace App\Http\Controllers;

use App\Http\Requests\ProductRequest;
use App\Http\Resources\ProductResource;
use App\Models\Product;
use App\Traits\ApiResponse;
use Symfony\Component\HttpFoundation\Response;

class ProductController extends Controller
{
    use ApiResponse;

    private Product $product;

    public function __construct(Product $product)
    {
        $this->product = $product;
    }

    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $products = $this->product->all();
        return $this->successResponse(
            data: ProductResource::collection($products),
            message: 'Products fetched successfully',
            code: Response::HTTP_OK
        );
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(ProductRequest $request)
    {
        $product = $this->product->create($request->validated());
        return $this->successResponse(
            data: ProductResource::make($product),
            message: 'Product created successfully',
            code: Response::HTTP_CREATED
        );
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        $product = $this->product->find($id);
        if (!$product) {
            return $this->errorResponse(
                message: 'Product not found',
                code: Response::HTTP_NOT_FOUND
            );
        }
        return $this->successResponse(
            data: ProductResource::make($product),
            message: 'Product fetched successfully',
            code: Response::HTTP_OK
        );
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(ProductRequest $request, string $id)
    {
        $product = $this->product->find($id);
        if (!$product) {
            return $this->errorResponse(
                message: 'Product not found',
                code: Response::HTTP_NOT_FOUND
            );
        }
        $product->update($request->validated());
        return $this->successResponse(
            data: ProductResource::make($product),
            message: 'Product updated successfully',
            code: Response::HTTP_OK
        );
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(string $id)
    {
        $product = $this->product->find($id);
        if (!$product) {
            return $this->errorResponse(
                message: 'Product not found',
                code: Response::HTTP_NOT_FOUND
            );
        }
        $product->delete();
        return $this->successResponse(
            message: 'Product deleted successfully',
            code: Response::HTTP_NO_CONTENT
        );
    }
}