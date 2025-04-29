<?php

namespace App\Models;

// use Illuminate\Contracts\Auth\MustVerifyEmail;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    /** @use HasFactory<\Database\Factories\UserFactory> */
    use HasFactory, Notifiable, HasApiTokens;

    /**
     * The attributes that are mass assignable.
     *
     * @var list<string>
     */
    protected $fillable = [
        'name',
        'email',
        'password',
        'role',
        'details',
        'guru_id',
    ];

    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }

    public function hasRole($role)
    {
        return $this->role === $role;
    }

    public function hasAnyRole(array $roles)
    {
        return in_array($this->role, $roles);
    }

    public function mahasiswaPamong()
    {
        return $this->belongsTo(User::class, 'guru_id');
    }

    /**
     * The users that were referred by this user.
     */
    public function guruPamong()
    {
        return $this->hasMany(User::class, 'guru_id');
    }

    public function dosenPembimbing()
    {
        return $this->hasMany(User::class, 'dosen_id');
    }

    public function logbooksToApprove()
    {
        return $this->belongsToMany(Logbook::class, 'logbook_approvers', 'approver_id', 'logbook_id')
            ->withPivot('status')
            ->withTimestamps();
    }
}
