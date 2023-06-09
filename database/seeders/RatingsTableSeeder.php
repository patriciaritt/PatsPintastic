<?php

namespace Database\Seeders;

use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class RatingsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $rating1 = new Rating();
        $rating1->entrie_id = 1;
        $rating1->rating = 4;
        $rating1->save();

        $rating2 = new Rating();
        $rating2->entrie_id = 2;
        $rating2->rating = 6;
        $rating2->save();
    }
}
