<?php

namespace App\Http\Middleware;

use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class Permit
{
    /**
     * Handle an incoming request.
     *
     * @param  \Closure(\Illuminate\Http\Request): (\Symfony\Component\HttpFoundation\Response)  $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        if (getenv('VITE_OPENWEATHER_APP_ID') == '' || getenv('VITE_FORESQUARE_API_KEY') == '') {
            return redirect('/error');
        }
        return $next($request);
    }
}
