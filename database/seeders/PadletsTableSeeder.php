<?php

namespace Database\Seeders;

use App\Models\Comment;
use App\Models\Entrie;
use App\Models\Padlet;
use App\Models\Rating;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;


class PadletsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $padlet = new Padlet();
        $padlet->name = "WG Hagenberg - Kochideen";
        $padlet->user_id = "1";
        $padlet->is_public = true;
        $padlet->image = "https://media-cldnry.s-nbcnews.com/image/upload/newscms/2019_41/3044956/191009-cooking-vegetables-al-1422.jpg";
        $padlet->save();

        $padlet2 = new Padlet();
        $padlet2->name = "Bachelorreise Ideen";
        $padlet2->user_id = "1";
        $padlet2->is_public = true;
        $padlet2->image = "https://lp-cms-production.imgix.net/features/2019/07/CMRobinson-15-1-1-6340b14ae22b.jpg";
        $padlet2->save();

        $entrie = new Entrie();
        $entrie->user_id = '1';
        $entrie->padlet_id = '1';
        $entrie->title = 'Käseschnitzel';
        $entrie->content = '4 Schweineschnitzel (je etwa 150 g) Salz und Pfeffer nach Geschmack 2 Esslöffel Mehl 2 Esslöffel Butter 1 Zwiebel, fein gehackt 200 ml Sahne 100 g geriebener Käse (z.B. Gouda oder Emmentaler) 1 Esslöffel gehackte frische Petersilie (optional)';
        $entrie->image = 'https://images.ichkoche.at/data/image/variations/620x434/9/huehner-kaese-schnitzel-aus-dem-backrohr-img-80734.jpg';
        $entrie->save();

        $entrie1 = new Entrie();
        $entrie1->user_id = '1';
        $entrie1->padlet_id = '1';
        $entrie1->title = 'Palatschinken';
        $entrie1->content = '200 g Mehl 3 Eier 500 ml Milch 1 Prise Salz 2 Esslöffel Zucker';
        $entrie1->image = 'https://files.cleverleben.at/clever_downloads/recipes/Recipe_585.jpg';
        $entrie1->save();

        $padlet->entries()->saveMany([$entrie, $entrie1]);
        $padlet->save();

        $comment1 = new Comment();
        $comment1->user_id = 1;
        $comment1->entrie_id = 1;
        $comment1->comment = 'Ich würd voll gern mal Käseschnitzel machen!';
        $comment1->save();

        $comment2 = new Comment();
        $comment2->user_id = 2;
        $comment2->entrie_id = 1;
        $comment2->comment = 'Boaa lecker!';
        $comment2->save();

        $comment3 = new Comment();
        $comment3->user_id = 3;
        $comment3->entrie_id = 1;
        $comment3->comment = 'Hmmm ja, gute Idee. Ich kaufe die Zutaten ein!';
        $comment3->save();

        $comment4 = new Comment();
        $comment4->user_id = 4;
        $comment4->entrie_id = 1;
        $comment4->comment = 'Ich liebe Käseschnitzel! Darf ich auch kommen?';
        $comment4->save();

        $comment5 = new Comment();
        $comment5->user_id = 1;
        $comment5->entrie_id = 1;
        $comment5->comment = 'Das kommt dann ganz auf die Webklausur drauf an 😉';
        $comment5->save();

        $rating1 = new Rating();
        $rating1->entrie_id = 1;
        $rating1->rating = 4;
        $rating1->save();

        $entrie->comments()->saveMany([$comment1]);
        $entrie->ratings()->save($rating1);
        $entrie->save();
    }
}
