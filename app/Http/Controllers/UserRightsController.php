<?php

namespace App\Http\Controllers;

use App\Models\Userright;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class UserRightsController extends Controller
{
    public function saveUserrights(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $userright = Userright::create($request->all());
            DB::commit();
            // return a vaild http response
            return response()->json($userright, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving userrights failed: " . $e->getMessage(), 420);
        }
    }

    public function deleteUserrights(int $padlet_id, int $user_id) {
        $deleted = Userright::where('user_id', $user_id)
            ->where('padlet_id', $padlet_id)
            ->delete();

        if($deleted) {
            return response()->json('userright successfully deleted', 200);
        }
        else {
            return response()->json('userright could not be deleted', 422);
        }
    }
}
