<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Userright;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use DateTime;


class UsersTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $user = new User();
        $user->firstName = 'Patricia';
        $user->lastName = 'Ritt';
        $user->email = "patriciaritt15@gmail.com";
        $user->password = bcrypt("secret");
        $user->image = "https://images.unsplash.com/photo-1683480678001-d2b60353b0fb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=726&q=80";
        $user->save();
    }
}
