<?php

namespace App\Http\Controllers;

use App\Models\Comment;
use App\Models\Entrie;
use App\Models\Rating;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Database\Eloquent;
use Illuminate\Support\Facades\DB;

class EntrieController extends Controller
{
    public function index(): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $padlets = Entrie::with(['rating', 'comment'])
            ->get();
        return response()->json($padlets, 200);
    }
    public function getAllEntries(int $padlet_id): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $entries = Entrie::where('padlet_id', $padlet_id)
            ->with(['comments', 'ratings'])
            ->get();
        return $entries != null ? response()->json($entries, 200) : response()->json(null, 200);
    }

    public function getAllRatings(): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $ratings = Rating::where('rating', 1)
            ->get();
        return $ratings != null ? response()->json($ratings, 200) : response()->json(null, 200);
    }

    public function getEntrie(int $padlet_id, int $entrie_id): JsonResponse {
        /* load all books and relations with eager loading,
        which means "load all related objects" */
        $entrie = Entrie::where('id', $entrie_id)
            ->with(['comments', 'ratings'])
            ->first();
        return $entrie != null ? response()->json($entrie, 200) : response()->json(null, 200);
    }
    public function saveEntries(int $padlet_id, Request $request) : JsonResponse {
        DB::beginTransaction();
        try {
            $request['padlet_id'] = $padlet_id;
            $entry = Entrie::create($request->all());
            DB::commit();
            // return a vaild http response
            return response()->json($entry, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving entry failed: " . $e->getMessage(), 420);
        }
    }

    public function updateEntries(int $padlet_id, int $entrie_id, Request $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $entrie = Entrie::where('id', $entrie_id)
                ->with(['comments', 'ratings'])->first();
            if ($entrie != null) {
                $entrie->update($request->all());
                $entrie->save();

                DB::commit();
                return response()->json($entrie, 201);
            }
            return response()->json("Entrie not found", 420);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("updating entrie failed: " . $e->getMessage(), 420);
        }
    }

    public function deleteEntrie(int $padlet_id, int $entrie_id) : JsonResponse {
        $entrie = Entrie::where('id', $entrie_id)->first();
        if ($entrie != null) {
            $title = $entrie['title'];
            $entrie->delete();
            return response()->json('entrie (' . $title . ') successfully deleted', 200);
        }
        else
            return response()->json('entrie could not be deleted - it does not exist', 422);
    }

    public function commentEntrie(Request $request): JsonResponse {
        DB::beginTransaction();
        try {
            $comment = Comment::create($request->all());
            DB::commit();
            // return a vaild http response
            return response()->json($comment, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving comment failed: " . $e->getMessage(), 420);
        }
    }

    public function rateEntrie(Request $request): JsonResponse {
        DB::beginTransaction();
        try {
            $rating = Rating::create($request->all());
            DB::commit();
            // return a vaild http response
            return response()->json($rating, 201);
        }
        catch (\Exception $e) {
            // rollback all queries
            DB::rollBack();
            return response()->json("saving rating failed: " . $e->getMessage(), 420);
        }
    }

    public function deleteEntrieRating(int $entrie_id, int $user_id){
        $deleted = Rating::where('entrie_id', $entrie_id)
            ->where('user_id', $user_id)
            ->delete();
        if($deleted){
            return response()->json("deleting rating succeeded", 200);
        }
        else {
            return response()->json("deleting rating failed", 420);
        }
    }
}
