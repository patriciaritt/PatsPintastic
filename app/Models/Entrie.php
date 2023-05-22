<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Entrie extends Model
{
    use HasFactory;
    protected $fillable = ['user_id', 'padlet_id','title', 'content', 'image'];

    /**
     * entrie has one creator (user)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * entry has one padlet
     */
    public function padlet() : BelongsTo
    {
        return $this->belongsTo(Padlet::class);
    }

    public function ratings() : HasMany {
        return $this->hasMany(Rating::class);
    }

    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }
}
