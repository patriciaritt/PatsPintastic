<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class CommentsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $comment1 = new Rating();
        $comment1->user_id = 1;
        $comment1->entrie_id = 1;
        $comment1->comment = 'Ein lustiges erstes Kommentar';
        $comment1->save();
    }
}
