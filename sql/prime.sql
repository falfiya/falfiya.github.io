create view mul as select
   n * m as p,
   count(*) as count
from generate_series(0, 999) as n
cross join generate_series(0, 999) as m
group by p
order by p;

select p from mul where count < 3;
