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
        $user->email = "p.ritt@gmail.com";
        $user->password = bcrypt("secret");
        $user->image = "https://www.br.de/kinder/murmeltier-im-gebirge-100~_v-img__16__9__xl_-d31c35f8186ebeb80b0cd843a7c267a0e0c81647.jpg?version=c2390";
        $user->save();

        $user2 = new User();
        $user2->firstName = 'Lisa';
        $user2->lastName = 'Zeitlhofer';
        $user2->email = "l.zeitlhofer@gmail.com";
        $user2->password = bcrypt("secret");
        $user2->image = "https://img.br.de/cac7cdc1-f545-485d-9e2d-bb9836e8757d.jpeg?width=525&q=85";
        $user2->save();

        $user2 = new User();
        $user2->firstName = 'Hanna';
        $user2->lastName = 'Haider';
        $user2->email = "h.haider@gmail.com";
        $user2->password = bcrypt("secret");
        $user2->image = "https://res.cloudinary.com/dewist/image/upload/f_auto,q_70,fl_lossy,w_1200,h_750,c_fill,e_unsharp_mask:90,fl_keep_iptc/v1567757998/content/6-aktuelles/1-im-spaetsommer-kommt-der-rehbock-in-die-pubertt/reh0259.jpg";
        $user2->save();

        $user3 = new User();
        $user3->firstName = 'Johannes';
        $user3->lastName = 'Schönböck';
        $user3->email = "j.schoenboeck@gmail.com";
        $user3->password = bcrypt("secret");
        $user3->image = "https://thumbs.dreamstime.com/b/portrait-friendly-man-raising-thumbs-up-excited-supportive-green-shirt-smiling-broadly-liking-idea-cheering-150902244.jpg";
        $user3->save();

        $user4 = new User();
        $user4->firstName = 'Florian';
        $user4->lastName = 'Bürbaumer';
        $user4->email = "f.buerbaumer@gmail.com";
        $user4->password = bcrypt("secret");
        $user4->image = "https://cdn.prod.www.spiegel.de/images/0d0b8f14-0001-0004-0000-000001203570_w1200_r1.77_fpx34.82_fpy54.98.jpg";
        $user4->save();
    }
}
