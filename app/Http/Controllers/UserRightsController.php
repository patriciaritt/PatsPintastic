<?php

namespace App\Http\Controllers;

use App\Models\Userright;
use Illuminate\Http\JsonResponse;

class UserRightsController extends Controller
{
    public function getCurrentUserRights(int $user_id) : JsonResponse
    {
        $rights = Userright::where('user_id', $user_id)
            ->get();
        return $rights != null ? response()->json($rights, 200) : response()->json(null, 200);
    }
}
