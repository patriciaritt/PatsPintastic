<?php

namespace Database\Seeders;

use App\Models\Userright;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserrightsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $userrights = new Userright();
        $userrights->user_id = 1;
        $userrights->padlet_id = 1;
        $userrights->read = true;
        $userrights->write = true;
        $userrights->edit = true;
        $userrights->delete = true;
        $userrights->save();

        $userrights1 = new Userright();
        $userrights1->user_id = 1;
        $userrights1->padlet_id = 2;
        $userrights1->read = true;
        $userrights1->write = true;
        $userrights1->edit = false;
        $userrights1->delete = false;
        $userrights1->save();
    }
}
