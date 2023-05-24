<?php

namespace App\Http\Controllers;

use App\Models\Padlet;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Http\JsonResponse;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;


class PadletController extends Controller
{
    public function index(): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $padlets = Padlet::with(['user', 'entries'])
            ->get();
        return response()->json($padlets, 200);
    }

    public function getPadlet(int $padlet_id): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $padlet = Padlet::where('id', $padlet_id)
            ->with(['user', 'entries'])
            ->first();
        return $padlet != null ? response()->json($padlet, 200) : response()->json(null, 200);
    }

    public function savePadlets(Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $padlet = Padlet::create($request->all());
            DB::commit();
            // return a vaild http response
            return response()->json($padlet, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving padlet failed: " . $e->getMessage(), 420);
        }
    }
    public function updatePadlets(Request $request, int $padlet_id) : JsonResponse {
        DB::beginTransaction();
        try {
            $padlet = Padlet::where('id', $padlet_id)->first();
            if ($padlet != null) {
                $padlet->update($request->all());
                $padlet->save();
                DB::commit();
                return response()->json($padlet, 201);
            }
            return response()->json("Entrie not found", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving padlet failed: " . $e->getMessage(), 420);
        }
    }

    public function deletePadlet(int $id) : JsonResponse {
        $padlet = Padlet::where('id', $id)->first();
        if ($padlet != null) {
            $title = $padlet['name'];
            $padlet->delete();
            return response()->json('padlet (' . $title . ') successfully deleted', 200);
        }
        else {
            return response()->json('padlet could not be deleted - it does not exist', 422);
        }
    }

    public function getUserNamesOfComments()
    {
        $user = User::select('id', 'firstName', 'lastName')
            ->get();
        return $user != null ? response()->json($user, 200) : response()->json(null, 200);
    }
}
