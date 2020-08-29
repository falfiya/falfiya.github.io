# Built a technology that optimizes site speed for the global web based on 20+ years of experience (See Reddit load go from 6.42 seconds to 2.62 seconds) I

> I built this neat technology that helps optimize very slow sites with a whole slew of standards that Google and 'UX in general' desires. My experience comes from 20 years of experience in NGINX, APACHE, Varnish, Haproxy, Squid, MongoDB, and a multitude of streaming technologies / CDN etc etc. It does not require rewriting anything, it's a A-record redirect on the primary domain. (In my sample due to not having root access on your computer I'm able to route traffic through my domain and re-direct internal URLs through a few tricks).

> The technology stack is custom written, a combination of RAM access / cache / all content type optimization / as well as distributed traffic request (Servers and browsers rate limit from where the IP comes from).

Funny when *"20 years of experience in NGINX, APACHE, Varnish, Haproxy, Squid, MongoDB, and a multitude of streaming technologies / CDN etc etc."* can be boiled down to half an hour's worth of work making a horrible proxy.
