<?php
namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;
use Illuminate\Database\Eloquent\Relations\HasMany;

class Padlet extends Model
{
    use HasFactory;
    protected $fillable = ['name', 'user_id', 'is_public', 'image'];

    /**
     * padlet has one creator (user)
     */
    public function user(): BelongsTo
    {
        return $this->belongsTo(User::class);
    }

    /**
     * padlet has many entries (1:n)
     */
    public function entries(): HasMany
    {
        return $this->hasMany(Entrie::class);
    }

    /**
     * padlet has many userrights
     */
    public function userrights(): HasMany
    {
        return $this->hasMany(Userright::class);
    }
}
