<?php

use App\Http\Controllers\AuthController;
use App\Http\Controllers\EntrieController;
use App\Http\Controllers\PadletController;
use App\Http\Controllers\UserController;
use App\Http\Controllers\UserRightsController;
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
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});

Route::post('auth/login', [AuthController::class,'login']);

Route::get('padlets', [PadletController::class,'index']);
Route::get('padlets/padlet/{id}', [PadletController::class,'getPadlet']);
Route::get('padlets/{id}',[EntrieController::class, 'getAllEntries']);
Route::get('padlets/{id}/{entrie_id}',[EntrieController::class, 'getEntrie']);
Route::get('users',[UserController::class, 'index']);

//todo baustelle =============
//Route::get('commentusers/{padlet_id}',[PadletController::class, 'getUserNamesOfComments']);

//todo baustelle =============
//Route::get('userrights/{user_id}',[UserRightsController::class, 'getCurrentUserRights']);

Route::post('padlets', [PadletController::class,'savePadlets']);
Route::post('padlets/{id}', [EntrieController::class,'saveEntries']);

Route::put('padlets/{id}', [PadletController::class,'updatePadlets']);
Route::put('padlets/{id}/{entrie_id}', [EntrieController::class,'updateEntries']);
Route::put('comments/{id}/{entrie_id}', [EntrieController::class, 'likeEntrie']);
//Route::put('comments/{id}/{entrie_id}', [EntrieController::class, 'commentEntrie']);

Route::delete('padlets/{id}', [PadletController::class,'deletePadlet']);
Route::delete('padlets/{id}/{entrie_id}', [EntrieController::class,'deleteEntrie']);

Route::post('auth/logout', [AuthController::class,'logout']);



