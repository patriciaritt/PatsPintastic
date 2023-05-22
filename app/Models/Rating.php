<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Rating extends Model
{
    use HasFactory;

    protected $fillable = ['rating'];

    /**
     * rating belongs to one entry
     */

    public function entrie(): BelongsTo
    {
        return $this->belongsTo(Entrie::class);
    }
}
