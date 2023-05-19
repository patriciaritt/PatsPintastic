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
            //TODO====> get current user_id
            $request['user_id'] = $this->getCurrentUserId();
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

    private function getCurrentUserId():int
    {
        $userId = 1;
        //TODO user id aus session storage auslesen
        return $userId;
    }
    public function updateEntries(int $padlet_id, int $entrie_id, Request $request) : JsonResponse
    {
        DB::beginTransaction();
        try {
            $entrie = Entrie::where('id', $entrie_id)
                ->with(['comments', 'ratings'])->first();
            if ($entrie != null) {
                $entrie->update($request->all());

                // save comments
                if (isset($request['comments']) && is_array($request['comments'])) {
                    foreach ($request['comments'] as $value) {

                        $comment = Comment::firstOrNew([
                            'comment'=>$value['comment'],
                            'entrie_id'=>$entrie_id,
                            'user_id'=>$this->getCurrentUserId()
                        ]);
                        $entrie->comments()->save($comment);
                    }
                }

                // save ratings
                if (isset($request['ratings']) && is_array($request['ratings'])) {
                    foreach ($request['ratings'] as $value) {
                        $rating = Rating::firstOrNew([
                            'rating'=>$value['rating'],
                            'entrie_id'=>$entrie_id,
                            'user_id'=>$this->getCurrentUserId()
                        ]);
                        $entrie->ratings()->save($rating);
                    }
                }
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
}
