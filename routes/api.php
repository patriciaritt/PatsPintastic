<?php

use App\Http\Controllers\EntrieController;
use App\Http\Controllers\PadletController;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| is assigned the "api" middleware group. Enjoy building your API!
|
*/


Route::get('padlets', [PadletController::class,'index']);
Route::get('padlets/{id}',[EntrieController::class, 'getAllEntries']);
Route::get('padlets/{id}/{entrie_id}',[EntrieController::class, 'getEntrie']);
Route::post('padlets', [PadletController::class,'savePadlets']);
Route::post('padlets/{id}', [EntrieController::class,'saveEntries']);
Route::put('padlets/{id}', [PadletController::class,'updatePadlets']);
Route::put('padlets/{id}/{entrie_id}', [EntrieController::class,'updateEntries']);
Route::delete('padlets/{id}', [PadletController::class,'deletePadlet']);
Route::delete('padlets/{id}/{entrie_id}', [EntrieController::class,'deleteEntrie']);



