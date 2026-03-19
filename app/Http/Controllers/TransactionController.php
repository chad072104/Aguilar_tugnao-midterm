<?php

namespace App\Http\Controllers;

use App\Models\Transaction;
use Illuminate\Http\Request;
Route::apiResource('transactions', TransactionController::class);
class TransactionController extends Controller
{
    // GET all data
    public function index()
    {
        return response()->json(Transaction::all());
    }

    // STORE data
    public function store(Request $request)
    {
        $transaction = Transaction::create($request->all());
        return response()->json($transaction);
    }

    // SHOW single
    public function show($id)
    {
        return Transaction::findOrFail($id);
    }

    // UPDATE
    public function update(Request $request, $id)
    {
        $transaction = Transaction::findOrFail($id);
        $transaction->update($request->all());

        return response()->json($transaction);
    }

    // DELETE
    public function destroy($id)
    {
        Transaction::destroy($id);
        return response()->json(['message' => 'Deleted']);
    }
    
}
