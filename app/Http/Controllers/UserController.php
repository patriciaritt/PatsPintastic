<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;

class UserController extends Controller
{
    public function index(): JsonResponse {
        $users = User::with(['padlets', 'userrights', 'comments'])->get();
        return $users != null ? response()->json($users, 200) : response()->json(null, 200);
    }
}
