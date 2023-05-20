<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Relations\HasMany;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;
use PHPOpenSourceSaver\JWTAuth\Contracts\JWTSubject;


class User extends Authenticatable implements JWTSubject
{
    use HasApiTokens, HasFactory, Notifiable;

    /**
     * The attributes that are mass assignable.
     *
     * @var array<int, string>
     */
    protected $fillable = [
        'firstName',
        'lastName',
        'email',
        'password',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var array<int, string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * The attributes that should be cast.
     *
     * @var array<string, string>
     */
    protected $casts = [
        'email_verified_at' => 'datetime',
    ];

    /**
     * user has many padlets (1:n)
     */
    public function padlets() : HasMany
    {
        return $this->hasMany(Padlet::class);
    }

    /**
     * user has userrights to many padlets
     */
    public function userrights(): HasMany
    {
        return $this->hasMany(Userright::class);
    }

    public function ratings() : HasMany {
        return $this->hasMany(Rating::class);
    }

    public function comments() : HasMany {
        return $this->hasMany(Comment::class);
    }

    /* ---- auth JWT ---- */
    /**
     * @return mixed
     */
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }
    /**
     * @return array
     */
    public function getJWTCustomClaims()
    {
        //username oder rolle hier mitgeben
        return ['user' => ['id' => $this->id]];
    }
}
