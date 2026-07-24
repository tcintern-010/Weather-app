export function debounce(fn , delay=400)
{
    let timer;

    return function() {

        clearTimeout(timer);
        timer = setTimeout(fn,delay);
    }
}